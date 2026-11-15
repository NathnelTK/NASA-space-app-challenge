import type { Equipment, Source } from './types';

const accessed = '2026-11-15';
const nasaMediaTerms =
	'NASA educational and informational media-use guidance applies. Preserve the stated credit; do not imply endorsement. Check the original record for third-party rights.';

export const lunarSources: Source[] = [
	{
		id: 'lunar-nssdc-apollo11',
		name: 'Apollo 11 Lunar Module | NSSDCA Master Catalog',
		url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C',
		organization: 'NASA Space Science Data Coordinated Archive',
		type: 'Mission record',
		provides:
			'Apollo 11 Lunar Module mission design, launch, landing, surface operations, and ascent chronology.',
		usage: 'Supports Eagle descent-stage dates, purpose, operation, status, and mission timeline.',
		license:
			'United States government scientific record; cite NASA/NSSDCA and preserve the original context.',
		accessed,
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'lunar-nssdc-apollo15',
		name: 'Apollo 15 Lunar Roving Vehicle | NSSDCA Master Catalog',
		url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C',
		organization: 'NASA Space Science Data Coordinated Archive',
		type: 'Mission record',
		provides:
			'Lunar Roving Vehicle design, deployment, traverses, purpose, and mission chronology.',
		usage:
			'Supports the Apollo 15 rover engineering story, operational dates, exploration role, and findings.',
		license:
			'United States government scientific record; cite NASA/NSSDCA and preserve the original context.',
		accessed,
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'lunar-sites-nssdc',
		name: 'Lunar Landing Sites Coordinates',
		url: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html',
		organization: 'NASA Space Science Data Coordinated Archive',
		type: 'Data archive',
		provides:
			'LROC-derived Apollo Lunar Module and experiment coordinates in the planetocentric Mean Earth/Polar Axis reference frame using DE421.',
		usage:
			'Positions Eagle and the Apollo 11 reflector at documented coordinates and uses the Apollo 15 LM coordinate only as an approximate mission-site marker for the rover.',
		license:
			'NASA scientific reference table; retain coordinate convention and cited LROC/Wagner context.',
		accessed,
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'lunar-nasa-reflector',
		name: 'The Apollo Experiment That Keeps on Giving',
		url: 'https://www.nasa.gov/missions/apollo/apollo-11/the-apollo-experiment-that-keeps-on-giving/',
		organization: 'NASA',
		type: 'Science & history',
		provides:
			'Plain-language history of lunar laser ranging, passive reflector operation, and continuing scientific value.',
		usage:
			'Supports the reflector purpose, no-power operation, scientific contributions, status, and learning quiz.',
		license: 'NASA informational content; cite NASA and do not imply endorsement.',
		accessed,
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'lunar-ilrs-apollo11',
		name: 'Apollo 11 Lunar Laser Ranging Retroreflector',
		url: 'https://ilrs.gsfc.nasa.gov/missions/satellite_missions/current_missions/ap11_general.html',
		organization: 'NASA Goddard / International Laser Ranging Service',
		type: 'Data archive',
		provides:
			'Current-mission listing and technical identification for the Apollo 11 passive reflector.',
		usage:
			'Supports the distinction between hardware left on the Moon and a passive instrument still useful to laser-ranging stations.',
		license:
			'Scientific mission reference; cite ILRS/NASA Goddard and preserve the current-mission context.',
		accessed,
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'image-eagle-descent-stage',
		name: 'AS11-40-5927 | Apollo 11 Lunar Module',
		url: 'https://images.nasa.gov/details/as11-40-5927',
		organization: 'NASA / Neil Armstrong',
		type: 'Image archive',
		provides:
			'Authentic Apollo 11 photograph of Buzz Aldrin unloading equipment from Eagle before its ascent stage departed.',
		usage:
			'Profile image with a caption explicitly explaining that only the lower descent stage remained after departure.',
		license: nasaMediaTerms,
		accessed,
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'image-apollo15-rover',
		name: 'AS15-85-11451 | Apollo 15 Lunar Rover',
		url: 'https://images.nasa.gov/details/as15-85-11451',
		organization: 'NASA / James Irwin',
		type: 'Image archive',
		provides:
			'Authentic surface photograph of David Scott with the Apollo 15 Lunar Roving Vehicle.',
		usage: 'Primary profile photograph for the Apollo 15 rover.',
		license: nasaMediaTerms,
		accessed,
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'image-apollo11-reflector',
		name: 'AS11-40-5952 | Apollo 11 Laser Reflector',
		url: 'https://www.nasa.gov/history/alsj/a11/a11.html',
		organization: 'NASA Apollo Lunar Surface Journal',
		type: 'Image archive',
		provides:
			'Authentic Apollo 11 surface photograph showing the deployed laser ranging retroreflector.',
		usage:
			'Primary profile photograph for the Apollo 11 reflector, downloaded from the journal archive.',
		license: nasaMediaTerms,
		accessed,
		verification: 'Verified',
		challengeResource: null
	}
];

export const lunarEquipment: Equipment[] = [
	{
		id: 'eagle-descent-stage',
		name: "Eagle's Descent Stage",
		shortName: 'Eagle descent stage',
		mission: 'Apollo 11',
		destination: 'Moon',
		equipmentType: 'Landers',
		launchDate: '1969-07-16',
		deploymentDate: '1969-07-20',
		deploymentLabel: 'Lunar landing',
		missionEndDate: '1969-07-21',
		dateNote:
			'Dates are UTC. The 21 July date marks the crewed ascent stage leaving the descent stage behind; it is not a later inspection of the remaining hardware.',
		status: 'Inactive',
		statusDetail:
			"The lower descent stage has had no operational role since Eagle's ascent stage lifted off. It remains at Tranquility Base; its present detailed physical condition is not verified here.",
		chapter: 'The landing platform that made the first Moon walk possible.',
		summary:
			'The lower half of Eagle stayed at Tranquility Base after carrying two astronauts safely to the lunar surface.',
		story:
			'Eagle was built in two halves. The descent stage absorbed the final landing, held supplies, and became the launch platform for the upper ascent stage. When Neil Armstrong and Buzz Aldrin left the Moon, only that upper half departed. The machine pictured before liftoff is the complete Lunar Module; the four-legged lower stage is the part that remains.',
		purpose:
			'Land two astronauts and their equipment safely on the Moon, support their surface stay, and provide the platform from which the ascent stage could return them to lunar orbit.',
		functionality:
			'A throttleable descent engine slowed the Lunar Module while landing radar, guidance computers, and the crew steered toward a safe site. Four legs absorbed touchdown. The descent stage then supplied power, water, oxygen, storage, and a stable base until the ascent stage departed.',
		scientificContributions: [
			{
				text: 'Enabled the first crewed exploration of the lunar surface, where the astronauts documented the site, collected samples, and deployed scientific instruments.',
				sourceIds: ['lunar-nssdc-apollo11']
			},
			{
				text: 'Established Tranquility Base as a documented reference site that can be compared with later surface and orbital observations.',
				sourceIds: ['lunar-nssdc-apollo11', 'lunar-sites-nssdc']
			}
		],
		location: {
			name: 'Tranquility Base, Mare Tranquillitatis',
			description:
				'Documented Apollo 11 Lunar Module position: 0.67416° N, 23.47314° E, planetocentric Mean Earth/Polar Axis coordinates using DE421. This is a reference coordinate, not a live condition report.',
			coordinates: { latitude: 0.67416, longitude: 23.47314 },
			locationAccuracy: 'Documented equipment location',
			sourceIds: ['lunar-sites-nssdc']
		},
		images: [
			{
				id: 'eagle-before-departure',
				src: '/media/eagle-descent-stage.jpg',
				alt: 'Buzz Aldrin beside the complete Apollo 11 Lunar Module Eagle while unloading equipment on the Moon.',
				caption:
					'Buzz Aldrin unloads Eagle on 20 July 1969. This photograph shows the complete Lunar Module before departure; only its four-legged lower descent stage remained after the ascent stage lifted off.',
				credit: 'NASA / Neil Armstrong',
				originalUrl: 'https://images.nasa.gov/details/as11-40-5927',
				sourceId: 'image-eagle-descent-stage',
				kind: 'Photograph',
				aiGenerated: false
			}
		],
		timeline: [
			{
				date: '1969-07-16',
				title: 'Apollo 11 launches',
				description: 'Eagle begins its journey inside the Saturn V-launched Apollo spacecraft.',
				type: 'Launch',
				sourceIds: ['lunar-nssdc-apollo11']
			},
			{
				date: '1969-07-20',
				title: 'Eagle lands',
				description:
					'The Lunar Module touches down in Mare Tranquillitatis, establishing Tranquility Base.',
				type: 'Deployment',
				sourceIds: ['lunar-nssdc-apollo11', 'lunar-sites-nssdc']
			},
			{
				date: '1969-07-21',
				title: 'Surface exploration concludes',
				description:
					'After the Moon walk and experiment deployment, the crew prepares to leave the surface.',
				type: 'Science',
				sourceIds: ['lunar-nssdc-apollo11']
			},
			{
				date: '1969-07-21',
				title: 'The ascent stage departs',
				description:
					"Eagle's upper stage lifts the crew to lunar orbit. The descent stage stays behind as the launch platform it was designed to be.",
				type: 'Conclusion',
				sourceIds: ['lunar-nssdc-apollo11']
			}
		],
		interestingFacts: [
			{
				text: 'The entire Lunar Module was not abandoned: its ascent stage carried the astronauts away. The descent stage is the part still at Tranquility Base.',
				sourceIds: ['lunar-nssdc-apollo11']
			},
			{
				text: 'The descent stage changed jobs after landing, becoming a supply base and the launch platform for the crew’s return to orbit.',
				sourceIds: ['lunar-nssdc-apollo11']
			}
		],
		relatedIds: ['apollo-11-reflector', 'apollo-15-rover', 'viking-1'],
		sources: ['lunar-nssdc-apollo11', 'lunar-sites-nssdc', 'image-eagle-descent-stage'],
		fieldSources: {
			dates: ['lunar-nssdc-apollo11'],
			purpose: ['lunar-nssdc-apollo11'],
			functionality: ['lunar-nssdc-apollo11'],
			status: ['lunar-nssdc-apollo11', 'lunar-sites-nssdc']
		},
		aiGeneratedMedia: false
	},
	{
		id: 'apollo-15-rover',
		name: 'Apollo 15 Lunar Roving Vehicle',
		shortName: 'Apollo 15 rover',
		mission: 'Apollo 15',
		destination: 'Moon',
		equipmentType: 'Rovers',
		launchDate: '1971-07-26',
		deploymentDate: '1971-07-31',
		deploymentLabel: 'Rover deployment',
		missionEndDate: '1971-08-02',
		dateNote:
			'Dates are UTC calendar dates. The mission-end field records the rover’s last crewed traverse and parking, not a verified later electrical shutdown date.',
		status: 'Inactive',
		statusDetail:
			'The battery-powered rover was parked after its third and final traverse on 2 August 1971. It was not designed for remote driving after the crew left; its present detailed physical condition is Unknown.',
		chapter: 'Four wheels that transformed how far astronauts could explore.',
		summary:
			'Apollo 15’s folding electric rover carried astronauts, tools, and samples across the Hadley-Apennine landscape.',
		story:
			'Folded against the Lunar Module for flight, the first operational Lunar Roving Vehicle opened into a two-seat electric field vehicle. David Scott and James Irwin used it during three excursions, extending their reach beyond what a walking-only expedition could safely cover. They parked it when their fieldwork ended, leaving a machine whose value was measured in the geology it helped them reach.',
		purpose:
			'Carry two astronauts, geology tools, cameras, and lunar samples farther from the Lunar Module while preserving time and life-support capacity for scientific fieldwork.',
		functionality:
			'Four battery-powered wheel motors drove a lightweight open vehicle. Independent steering, wire-mesh wheels, navigation instruments, and astronaut controls helped it cross uneven terrain; it folded for transport on the Lunar Module.',
		scientificContributions: [
			{
				text: 'Expanded Apollo 15’s field range so the crew could investigate a wider variety of terrain near Hadley Rille and the Apennine mountains.',
				sourceIds: ['lunar-nssdc-apollo15']
			},
			{
				text: 'Carried astronauts, instruments, and collected samples across three traverses, making the rover part of the mission’s geological field system rather than simply transportation.',
				sourceIds: ['lunar-nssdc-apollo15']
			}
		],
		location: {
			name: 'Hadley-Apennine landing region',
			description:
				'The plotted point is the documented Apollo 15 Lunar Module site at 26.13239° N, 3.63330° E in the planetocentric Mean Earth/Polar Axis frame. NASA’s coordinate table does not give the rover’s exact parked point, so this marker is approximate.',
			coordinates: { latitude: 26.13239, longitude: 3.6333 },
			locationAccuracy: 'Approximate mission site',
			sourceIds: ['lunar-sites-nssdc']
		},
		images: [
			{
				id: 'apollo15-rover-surface',
				src: '/media/apollo-15-rover.jpg',
				alt: 'David Scott working beside the Apollo 15 Lunar Roving Vehicle on the lunar surface.',
				caption:
					'David Scott and the Apollo 15 rover during lunar surface operations. AS15-85-11451.',
				credit: 'NASA / James Irwin',
				originalUrl: 'https://images.nasa.gov/details/as15-85-11451',
				sourceId: 'image-apollo15-rover',
				kind: 'Photograph',
				aiGenerated: false
			}
		],
		timeline: [
			{
				date: '1971-07-26',
				title: 'Apollo 15 launches',
				description: 'The folded rover begins its trip to the Moon attached to the Lunar Module.',
				type: 'Launch',
				sourceIds: ['lunar-nssdc-apollo15']
			},
			{
				date: '1971-07-30',
				title: 'Falcon reaches Hadley-Apennine',
				description: 'Apollo 15’s Lunar Module lands in the region the rover will help explore.',
				type: 'Arrival',
				sourceIds: ['lunar-nssdc-apollo15', 'lunar-sites-nssdc']
			},
			{
				date: '1971-07-31',
				title: 'The rover unfolds',
				description:
					'The crew deploys the Lunar Roving Vehicle and begins the first crewed drive on another world.',
				type: 'Deployment',
				sourceIds: ['lunar-nssdc-apollo15']
			},
			{
				date: '1971-08-02',
				title: 'Third traverse concludes',
				description:
					'After the final field excursion, the astronauts park the rover near the landing area.',
				type: 'Conclusion',
				sourceIds: ['lunar-nssdc-apollo15']
			}
		],
		interestingFacts: [
			{
				text: 'Apollo 15 carried the first Lunar Roving Vehicle used by astronauts on the Moon.',
				sourceIds: ['lunar-nssdc-apollo15']
			},
			{
				text: 'NASA’s published landing-site table gives the Lunar Module position, not a surveyed final coordinate for the parked rover.',
				sourceIds: ['lunar-sites-nssdc']
			}
		],
		relatedIds: ['eagle-descent-stage', 'apollo-11-reflector', 'opportunity'],
		sources: ['lunar-nssdc-apollo15', 'lunar-sites-nssdc', 'image-apollo15-rover'],
		fieldSources: {
			dates: ['lunar-nssdc-apollo15'],
			purpose: ['lunar-nssdc-apollo15'],
			functionality: ['lunar-nssdc-apollo15'],
			status: ['lunar-nssdc-apollo15', 'lunar-sites-nssdc']
		},
		aiGeneratedMedia: false
	},
	{
		id: 'apollo-11-reflector',
		name: 'Apollo 11 Laser Ranging Retroreflector',
		shortName: 'Apollo 11 reflector',
		mission: 'Apollo 11',
		destination: 'Moon',
		equipmentType: 'Scientific instruments',
		launchDate: '1969-07-16',
		deploymentDate: '1969-07-21',
		deploymentLabel: 'Instrument deployment',
		missionEndDate: null,
		dateNote:
			'Dates are UTC. No operational end date is assigned: this passive reflector has no onboard power supply to exhaust and remains listed by the laser-ranging service.',
		status: 'Passive science',
		statusDetail:
			'The reflector is not an inactive transmitter and should not be described simply as abandoned. Ground stations can still send laser pulses toward it and detect returned photons. This scientific use is not a current visual inspection of its condition.',
		chapter: 'A silent mirror that can still answer from the Moon.',
		summary:
			'A power-free array of corner-cube mirrors still returns laser light sent from observatories on Earth.',
		story:
			'Unlike a rover or lander, the Apollo 11 reflector never needed a radio, battery, or moving part. Astronauts aimed its array toward Earth, where observatories send brief laser pulses to the Moon and time the tiny fraction of light that returns. It is hardware left behind, but its story is not one of simple inactivity: the experiment works whenever researchers illuminate it from Earth.',
		purpose:
			'Provide a stable optical target for measuring the round-trip travel time of laser light between Earth and the Moon.',
		functionality:
			'Corner-cube reflectors return incoming light toward its source over a range of angles. Earth observatories fire laser pulses at the array and time returning photons. The reflector itself requires no electrical power.',
		scientificContributions: [
			{
				text: 'Lunar laser ranging lets researchers measure changes in the Earth-Moon distance with extraordinary precision.',
				sourceIds: ['lunar-nasa-reflector', 'lunar-ilrs-apollo11']
			},
			{
				text: 'Long-running ranging measurements help study lunar motion, Earth’s rotation, gravity, and tests of fundamental physics.',
				sourceIds: ['lunar-nasa-reflector']
			}
		],
		location: {
			name: 'Tranquility Base experiment site',
			description:
				'Documented Apollo 11 retroreflector position: 0.67345° N, 23.47307° E, planetocentric Mean Earth/Polar Axis coordinates using DE421. The close but distinct Eagle coordinate is preserved separately.',
			coordinates: { latitude: 0.67345, longitude: 23.47307 },
			locationAccuracy: 'Documented equipment location',
			sourceIds: ['lunar-sites-nssdc']
		},
		images: [
			{
				id: 'apollo11-reflector-deployed',
				src: '/media/apollo-11-reflector.jpg',
				alt: 'The Apollo 11 laser ranging retroreflector deployed on the lunar surface.',
				caption: 'The deployed Apollo 11 Laser Ranging Retroreflector. AS11-40-5952.',
				credit: 'NASA Apollo Lunar Surface Journal',
				originalUrl: 'https://www.nasa.gov/history/alsj/a11/a11.html',
				sourceId: 'image-apollo11-reflector',
				kind: 'Photograph',
				aiGenerated: false
			}
		],
		timeline: [
			{
				date: '1969-07-16',
				title: 'Apollo 11 launches',
				description: 'The reflector travels to the Moon with Eagle and the Apollo 11 crew.',
				type: 'Launch',
				sourceIds: ['lunar-nssdc-apollo11']
			},
			{
				date: '1969-07-20',
				title: 'The experiment reaches Tranquility Base',
				description: 'Eagle lands with the folded reflector among its surface equipment.',
				type: 'Arrival',
				sourceIds: ['lunar-nssdc-apollo11']
			},
			{
				date: '1969-07-21',
				title: 'Astronauts deploy the reflector',
				description:
					'The array is placed and aimed so observatories on Earth can use it as a laser-ranging target.',
				type: 'Deployment',
				sourceIds: ['lunar-nasa-reflector']
			},
			{
				date: '2026',
				title: 'Still a laser-ranging target',
				description:
					'The International Laser Ranging Service continues to list Apollo 11’s reflector as a current lunar ranging target.',
				type: 'Legacy',
				sourceIds: ['lunar-ilrs-apollo11']
			}
		],
		interestingFacts: [
			{
				text: 'The reflector has no onboard battery or transmitter; the light source and timing equipment stay on Earth.',
				sourceIds: ['lunar-nasa-reflector']
			},
			{
				text: 'Its coordinate is documented separately from Eagle’s descent stage even though both are very close at Tranquility Base.',
				sourceIds: ['lunar-sites-nssdc']
			}
		],
		relatedIds: ['eagle-descent-stage', 'apollo-15-rover', 'insight'],
		sources: [
			'lunar-nssdc-apollo11',
			'lunar-sites-nssdc',
			'lunar-nasa-reflector',
			'lunar-ilrs-apollo11',
			'image-apollo11-reflector'
		],
		fieldSources: {
			dates: ['lunar-nssdc-apollo11', 'lunar-nasa-reflector'],
			purpose: ['lunar-nasa-reflector'],
			functionality: ['lunar-nasa-reflector', 'lunar-ilrs-apollo11'],
			status: ['lunar-nasa-reflector', 'lunar-ilrs-apollo11']
		},
		aiGeneratedMedia: false
	}
];
