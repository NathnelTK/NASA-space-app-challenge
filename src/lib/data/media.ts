import type { Media, Source } from './types';

export const heroImage: Media = {
	id: 'apollo-17-hero',
	src: '/media/lunar-hero.jpg',
	alt: 'Harrison Schmitt collecting lunar samples at Taurus-Littrow during Apollo 17.',
	caption:
		'Harrison Schmitt collecting samples during Apollo 17, 11 December 1972. Historical mission context, not an image of the Apollo 11 site.',
	credit: 'NASA / Eugene Cernan',
	originalUrl: 'https://images.nasa.gov/details/as17-134-20425',
	sourceId: 'image-hero',
	kind: 'Photograph',
	aiGenerated: false
};

export const moonImage: Media = {
	id: 'moon',
	src: '/media/moon.jpg',
	alt: 'The Moon photographed by the Galileo spacecraft, with bright rays around Tycho crater.',
	caption: 'The Moon seen by Galileo, 7 December 1992. PIA00405.',
	credit: 'NASA / JPL / USGS',
	originalUrl: 'https://images.nasa.gov/details/PIA00405',
	sourceId: 'image-moon',
	kind: 'Photograph',
	aiGenerated: false
};

export const marsImage: Media = {
	id: 'mars',
	src: '/media/mars.jpg',
	alt: 'Global color view of Mars assembled from Viking images.',
	caption:
		'Global color view of Mars from Viking imagery. PIA00407. A photo mosaic, not a live view.',
	credit: 'NASA / JPL / USGS',
	originalUrl: 'https://images.nasa.gov/details/PIA00407',
	sourceId: 'image-mars',
	kind: 'Photo mosaic',
	aiGenerated: false
};

export const learningImage: Media = {
	id: 'apollo-17-rover',
	src: '/media/learning-rover.jpg',
	alt: 'Harrison Schmitt sitting in the Apollo 17 lunar rover beside its repaired fender.',
	caption:
		'Apollo 17 rover with a fender repaired using lunar maps and clamps, 12 December 1972. This is Apollo 17 hardware, not the Apollo 15 rover in the collection.',
	credit: 'NASA / Eugene Cernan',
	originalUrl: 'https://images.nasa.gov/details/as17-137-20979',
	sourceId: 'image-learning',
	kind: 'Photograph',
	aiGenerated: false
};

export const editorialMedia = [heroImage, moonImage, marsImage, learningImage];

export const mediaSources: Source[] = editorialMedia.map((image) => ({
	id: image.sourceId,
	name: `${image.id === 'moon' ? 'Galileo Moon image' : image.id === 'mars' ? 'Viking global Mars mosaic' : image.id === 'apollo-17-hero' ? 'Apollo 17 sample collection' : 'Apollo 17 rover fender repair'} | NASA Image and Video Library`,
	url: image.originalUrl,
	organization: image.credit,
	type: 'Image archive',
	provides: image.caption,
	usage:
		image.id === 'apollo-17-hero'
			? 'Locally stored cinematic landing-page hero with a visible archive credit.'
			: image.id === 'apollo-17-rover'
				? 'Learning section context image and an evidence-backed engineering fact.'
				: 'Locally stored destination imagery. The atlas does not use these photographs as a georeferenced basemap.',
	license:
		'NASA educational and informational media-use guidance; preserve NASA/JPL/USGS or photographer credits. No endorsement implied. Original scientific processing and editorial cropping are not AI generation.',
	accessed: '2026-11-15',
	verification: 'Verified',
	challengeResource: null
}));
