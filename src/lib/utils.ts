import type { Equipment } from './data/types';

export function formatDate(value: string | null): string {
	if (!value) return 'Not applicable';
	if (/^\d{4}$/.test(value)) return value;
	const monthOnly = /^\d{4}-\d{2}$/.test(value);
	return new Intl.DateTimeFormat('en', {
		day: monthOnly ? undefined : 'numeric',
		month: 'short',
		year: 'numeric',
		timeZone: 'UTC'
	}).format(new Date(`${value}${monthOnly ? '-01' : ''}T00:00:00Z`));
}

export function destinationSlug(destination: string): string {
	return destination.toLowerCase().replaceAll(' ', '-');
}

export type ExplorerFilters = {
	query: string;
	destination: string;
	mission: string;
	type: string;
	year: string;
	sort: string;
};

export function filterEquipment(items: Equipment[], filters: ExplorerFilters): Equipment[] {
	const query = filters.query.trim().toLowerCase();
	return items
		.filter((item) => {
			const haystack =
				`${item.name} ${item.mission} ${item.summary} ${item.destination}`.toLowerCase();
			return (
				(!query || haystack.includes(query)) &&
				(!filters.destination || item.destination === filters.destination) &&
				(!filters.mission || item.mission === filters.mission) &&
				(!filters.type || item.equipmentType === filters.type) &&
				(!filters.year || item.launchDate.startsWith(filters.year))
			);
		})
		.sort((a, b) => {
			if (filters.sort === 'name') return a.name.localeCompare(b.name);
			if (filters.sort === 'arrival') {
				return (a.deploymentDate ?? '9999').localeCompare(b.deploymentDate ?? '9999');
			}
			return filters.sort === 'newest'
				? b.launchDate.localeCompare(a.launchDate)
				: a.launchDate.localeCompare(b.launchDate);
		});
}
