export type Destination = 'Moon' | 'Mars' | 'Deep Space';
export type EquipmentType =
	| 'Rovers'
	| 'Landers'
	| 'Scientific instruments'
	| 'Spacecraft and probes'
	| 'Other mission hardware';

export type Source = {
	id: string;
	name: string;
	url: string;
	organization: string;
	type:
		| 'Mission record'
		| 'Science & history'
		| 'Image archive'
		| 'Data archive'
		| 'Software'
		| 'Font'
		| 'Policy';
	provides: string;
	usage: string;
	license: string;
	accessed: string;
	verification: 'Verified' | 'Unavailable';
	// Only set true after inspecting the exact 2026 organizer Resources tab.
	challengeResource: boolean | null;
};

export type Media = {
	id: string;
	src: string;
	alt: string;
	caption: string;
	credit: string;
	originalUrl: string;
	sourceId: string;
	kind: 'Photograph' | 'Photo mosaic' | 'Artist illustration' | 'Scientific visualization';
	aiGenerated: boolean;
};

export type Claim = { text: string; sourceIds: string[] };

export type MissionEvent = {
	date: string;
	title: string;
	description: string;
	type: 'Launch' | 'Arrival' | 'Deployment' | 'Science' | 'Conclusion' | 'Legacy';
	sourceIds: string[];
};

export type Equipment = {
	id: string;
	name: string;
	shortName: string;
	mission: string;
	destination: Destination;
	equipmentType: EquipmentType;
	launchDate: string;
	deploymentDate: string | null;
	deploymentLabel: string;
	missionEndDate: string | null;
	dateNote: string;
	status: 'Inactive' | 'Mission complete' | 'Passive science';
	statusDetail: string;
	chapter: string;
	summary: string;
	story: string;
	purpose: string;
	functionality: string;
	scientificContributions: Claim[];
	location: {
		name: string;
		description: string;
		coordinates: { latitude: number; longitude: number } | null;
		locationAccuracy:
			'Approximate mission site' | 'Documented equipment location' | 'Not applicable';
		sourceIds: string[];
	};
	images: Media[];
	timeline: MissionEvent[];
	interestingFacts: Claim[];
	relatedIds: string[];
	sources: string[];
	fieldSources: {
		dates: string[];
		purpose: string[];
		functionality: string[];
		status: string[];
	};
	aiGeneratedMedia: boolean;
};
