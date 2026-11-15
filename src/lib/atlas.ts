import { geoDistance, geoGraticule, geoOrthographic, geoPath } from 'd3-geo';
import type { Equipment } from './data/types';

export type SurfaceDestination = 'Moon' | 'Mars';
export type Coordinates = NonNullable<Equipment['location']['coordinates']>;
export type ViewPosition = 'in-view' | 'far-side' | 'outside-frame';
export type AtlasSite = {
	id: string;
	coordinates: Coordinates;
	records: Equipment[];
};

export const GLOBE_SIZE = 640;
export const MIN_ZOOM = 0.75;
export const MAX_ZOOM = 1.75;

const graticule = geoGraticule().step([15, 15])();
const equator = {
	type: 'LineString' as const,
	coordinates: Array.from({ length: 25 }, (_, index) => [-180 + index * 15, 0])
};
const primeMeridian = {
	type: 'LineString' as const,
	coordinates: Array.from({ length: 13 }, (_, index) => [0, -90 + index * 15])
};
const degrees = new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 });

export function wrapLongitude(longitude: number): number {
	if (longitude >= -180 && longitude < 180) return longitude;
	return ((((longitude + 180) % 360) + 360) % 360) - 180;
}

export function surfaceDestination(value: string | null): SurfaceDestination {
	return value?.trim().toLowerCase() === 'mars' ? 'Mars' : 'Moon';
}

export function coordinatesFor(item: Equipment): Coordinates | null {
	const coordinates = item.location.coordinates;
	if (
		!coordinates ||
		!Number.isFinite(coordinates.latitude) ||
		!Number.isFinite(coordinates.longitude) ||
		Math.abs(coordinates.latitude) > 90
	)
		return null;
	return { latitude: coordinates.latitude, longitude: wrapLongitude(coordinates.longitude) };
}

export function formatCoordinates(coordinates: Coordinates, precision = 6): string {
	const format = (value: number) => degrees.format(Number(Math.abs(value).toFixed(precision)));
	const { latitude } = coordinates;
	const longitude = wrapLongitude(coordinates.longitude);
	return `${format(latitude)}\u00b0${latitude === 0 ? '' : latitude < 0 ? ' S' : ' N'} / ${format(longitude)}\u00b0${longitude === 0 ? '' : longitude < 0 ? ' W' : ' E'}`;
}

export function groupCoordinateSites(records: Equipment[]): AtlasSite[] {
	const sites = new Map<string, AtlasSite>();
	for (const item of records) {
		const coordinates = coordinatesFor(item);
		if (!coordinates) continue;
		const id = `${coordinates.latitude},${coordinates.longitude}`;
		const site = sites.get(id);
		if (site) site.records.push(item);
		else sites.set(id, { id, coordinates, records: [item] });
	}
	return [...sites.values()];
}

export function projectAtlas(records: Equipment[], center: Coordinates, zoom: number) {
	const radius = 245 * Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom));
	const projection = geoOrthographic()
		.translate([GLOBE_SIZE / 2, GLOBE_SIZE / 2])
		.scale(radius)
		.rotate([-center.longitude, -center.latitude, 0])
		.clipAngle(90)
		.clipExtent([
			[0, 0],
			[GLOBE_SIZE, GLOBE_SIZE]
		])
		.precision(0.3);
	const path = geoPath(projection);
	const position = (coordinates: Coordinates): { point: [number, number]; state: ViewPosition } => {
		const pair: [number, number] = [coordinates.longitude, coordinates.latitude];
		const point = projection(pair) ?? [-1, -1];
		const onHemisphere =
			geoDistance([center.longitude, center.latitude], pair) <= Math.PI / 2 + 1e-10;
		const inFrame = point.every((value) => value >= 0 && value <= GLOBE_SIZE);
		return { point, state: !onHemisphere ? 'far-side' : inFrame ? 'in-view' : 'outside-frame' };
	};
	const sites = groupCoordinateSites(records).map((site) => {
		const projected = position(site.coordinates);
		return { ...site, ...projected, target: [...projected.point] as [number, number] };
	});

	// Only the button labels move. Source-coordinate dots never move or merge by proximity.
	// Spacing also fits 44px touch targets at the smallest supported (280px) canvas.
	const spacing = 112;
	const offsets = Array.from({ length: 25 }, (_, index) => [
		(index % 5) - 2,
		Math.floor(index / 5) - 2
	]).sort((a, b) => a[0] ** 2 + a[1] ** 2 - b[0] ** 2 - b[1] ** 2);
	const placed: [number, number][] = [];
	for (const site of sites.filter((site) => site.state === 'in-view')) {
		const candidates = offsets.map(([x, y]): [number, number] => [
			Math.max(72, Math.min(GLOBE_SIZE - 72, site.point[0] + x * spacing)),
			Math.max(72, Math.min(GLOBE_SIZE - 72, site.point[1] + y * spacing))
		]);
		site.target =
			candidates.find((candidate) =>
				placed.every(
					(other) => Math.hypot(candidate[0] - other[0], candidate[1] - other[1]) >= spacing - 0.01
				)
			) ?? candidates[0];
		placed.push(site.target);
	}

	const labels = [
		...[-60, -30, 30, 60].map((latitude) => ({
			coordinates: { latitude, longitude: center.longitude },
			text: `${Math.abs(latitude)}\u00b0 ${latitude < 0 ? 'S' : 'N'}`
		})),
		...[-120, -60, 0, 60, 120, 180].map((longitude) => ({
			coordinates: { latitude: 0, longitude },
			text: `${Math.abs(longitude)}\u00b0${longitude === 0 || longitude === 180 ? '' : longitude < 0 ? ' W' : ' E'}`
		}))
	].flatMap((label) => {
		const projected = position(label.coordinates);
		const [x, y] = projected.point;
		const clear = placed.every((point) => Math.hypot(x - point[0], y - point[1]) > 60);
		return projected.state === 'in-view' && x > 40 && x < 580 && y > 40 && y < 590 && clear
			? [{ text: label.text, x: x + 9, y: y - 8 }]
			: [];
	});

	return {
		radius,
		grid: path(graticule) ?? '',
		equator: path(equator) ?? '',
		meridian: path(primeMeridian) ?? '',
		sites,
		labels
	};
}

export type GlobeView = ReturnType<typeof projectAtlas>;
export type ProjectedSite = GlobeView['sites'][number];
