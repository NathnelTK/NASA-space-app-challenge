import type { Equipment, Source } from './types';

const accessed = '2026-11-15';
const nasaMediaTerms =
	'NASA educational and informational media-use guidance applies. Preserve the stated NASA/JPL or photographer credit; do not imply endorsement. Check the original record for third-party rights.';

export const marsDeepSources: Source[] = [
	{
		id: 'mars-nasa-viking1',
		name: 'Viking 1 Mission',
		url: 'https://science.nasa.gov/mission/viking-1/',
		organization: 'NASA Science',
		type: 'Science & history',
		provides: 'Viking 1 mission overview, dates, firsts, scientific goals, and results.',
		usage:
			'Supports the accessible mission story, scientific contributions, and the documented disagreement over the final-contact day.',
		license: 'NASA informational content; cite NASA and do not imply endorsement.',
		accessed,
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'mars-nssdc-viking1',
		name: 'Viking 1 Lander | NSSDCA Master Catalog',
		url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1975-075C',
		organization: 'NASA Space Science Data Coordinated Archive',
		type: 'Mission record',
		provides:
			'Lander design, instruments, launch, orbit arrival, landing, coordinates, operations, and final contact.',
		usage:
			'Drives Viking dates, planetocentric location, engineering explanation, timeline, and status note.',
		license:
			'United States government scientific record; cite NASA/NSSDCA and preserve coordinate convention.',
		accessed,
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'image-viking1',
		name: 'PIA00381 | First Picture from the Surface of Mars',
		url: 'https://photojournal.jpl.nasa.gov/catalog/PIA00381',
		organization: 'NASA / JPL',
		type: 'Image archive',
		provides:
			'Viking 1 surface image taken on 20 July 1976, including terrain and a lander footpad.',
		usage:
			'Primary Viking profile photograph, captioned as a view from the lander rather than a photograph of the full craft.',
		license: nasaMediaTerms,
		accessed,
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'mars-nasa-opportunity',
		name: 'Spirit and Opportunity Mars Exploration Rovers',
		url: 'https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/',
		organization: 'NASA Science',
		type: 'Science & history',
		provides:
			'Mars Exploration Rover goals, water-related discoveries, mission history, and legacy.',
		usage:
			'Supports Opportunity’s scientific story and the distinction between evidence of past water and a present-day ocean.',
		license: 'NASA informational content; cite NASA and do not imply endorsement.',
		accessed,
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'mars-nssdc-opportunity',
		name: 'Opportunity | NSSDCA Master Catalog',
		url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-032A',
		organization: 'NASA Space Science Data Coordinated Archive',
		type: 'Mission record',
		provides:
			'Rover design, science objectives, UTC launch and landing dates, landing coordinate, and last communication.',
		usage:
			'Drives Opportunity filters, landing-site atlas marker, operation explanation, status, and timeline.',
		license:
			'United States government scientific record; cite NASA/NSSDCA and retain the IAU coordinate note.',
		accessed,
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'mars-jpl-opportunity-end',
		name: "NASA's Opportunity Rover Mission on Mars Comes to End",
		url: 'https://www.jpl.nasa.gov/news/nasas-opportunity-rover-mission-on-mars-comes-to-end/',
		organization: 'NASA Jet Propulsion Laboratory',
		type: 'Science & history',
		provides:
			'Formal mission-completion announcement, recovery effort, traverse distance, and major accomplishments.',
		usage:
			'Separates the 2018 last communication from the 2019 mission-complete decision and supports the distance fact.',
		license: 'NASA/JPL informational content; attribution and no-endorsement conditions apply.',
		accessed,
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'image-opportunity',
		name: 'PIA18079 | Opportunity Self-Portrait',
		url: 'https://photojournal.jpl.nasa.gov/catalog/PIA18079',
		organization: 'NASA / JPL-Caltech / Cornell University / Arizona State University',
		type: 'Image archive',
		provides:
			'Approximately true-color Pancam self-portrait mosaic made from images taken 22–24 March 2014.',
		usage:
			'Primary Opportunity profile image, explicitly identified as a scientific photo mosaic rather than a third-person photograph.',
		license: nasaMediaTerms,
		accessed,
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'mars-nasa-insight',
		name: 'InSight Mission',
		url: 'https://science.nasa.gov/mission/insight/',
		organization: 'NASA Science',
		type: 'Science & history',
		provides: 'InSight mission goals, instruments, interior-science results, and mission history.',
		usage:
			'Supports InSight’s plain-language story, scientific contributions, and learning concept.',
		license: 'NASA informational content; cite NASA and do not imply endorsement.',
		accessed,
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'mars-nssdc-insight',
		name: 'InSight | NSSDCA Master Catalog',
		url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2018-042A',
		organization: 'NASA Space Science Data Coordinated Archive',
		type: 'Mission record',
		provides:
			'Lander design, science payload, launch, landing, instrument deployment, last transmission, and mission conclusion.',
		usage:
			'Drives InSight dates, engineering explanation, location description, and the last-contact versus retirement distinction.',
		license: 'United States government scientific record; cite NASA/NSSDCA.',
		accessed,
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'mars-jpl-insight-end',
		name: 'NASA Retires InSight Mars Lander Mission After Years of Science',
		url: 'https://www.jpl.nasa.gov/news/nasa-retires-insight-mars-lander-mission-after-years-of-science/',
		organization: 'NASA Jet Propulsion Laboratory',
		type: 'Science & history',
		provides:
			'Formal retirement announcement, dust and power context, marsquake count, and mission findings.',
		usage: 'Supports the mission-complete status, 1,319 marsquakes fact, and retirement timeline.',
		license: 'NASA/JPL informational content; attribution and no-endorsement conditions apply.',
		accessed,
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'image-insight',
		name: "PIA25287 | InSight's Final Selfie",
		url: 'https://images.nasa.gov/details/PIA25287',
		organization: 'NASA / JPL-Caltech',
		type: 'Image archive',
		provides:
			'Final InSight selfie mosaic assembled from robotic-arm camera views taken on 24 April 2022.',
		usage:
			'Primary InSight profile image, labeled as a mosaic and used to show documented dust accumulation before retirement.',
		license: nasaMediaTerms,
		accessed,
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'deep-nasa-pioneer10',
		name: 'Pioneer 10 Mission',
		url: 'https://science.nasa.gov/mission/pioneer-10/',
		organization: 'NASA Science',
		type: 'Science & history',
		provides:
			'Pioneer 10 mission history, Jupiter encounter, major firsts, operations, and communications chronology.',
		usage:
			'Supports the deep-space story, Jupiter findings, plaque fact, and last-contact distinctions.',
		license: 'NASA informational content; cite NASA and do not imply endorsement.',
		accessed,
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'deep-nssdc-pioneer10',
		name: 'Pioneer 10 | NSSDCA Master Catalog',
		url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-012A',
		organization: 'NASA Space Science Data Coordinated Archive',
		type: 'Mission record',
		provides:
			'Spacecraft design, instruments, UTC launch, Jupiter flyby, trajectory, and communication history.',
		usage:
			'Drives Pioneer dates, engineering explanation, timeline, and no-surface-location handling.',
		license: 'United States government scientific record; cite NASA/NSSDCA.',
		accessed,
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'deep-nasa-pioneer-history',
		name: '50 Years Ago: Pioneer 10 Launches to Explore Jupiter',
		url: 'https://www.nasa.gov/history/50-years-ago-pioneer-10-launches-to-explore-jupiter/',
		organization: 'NASA History',
		type: 'Science & history',
		provides: 'Launch history, early milestones, mission objectives, and encounter context.',
		usage: 'Supports Pioneer’s launch timeline and educational mission summary.',
		license: 'NASA historical content; cite NASA and do not imply endorsement.',
		accessed,
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'image-pioneer10',
		name: 'ARC-1972-AC72-2142 | Pioneer 10 Launch',
		url: 'https://images.nasa.gov/details/ARC-1972-AC72-2142',
		organization: 'NASA / Kennedy Space Center',
		type: 'Image archive',
		provides:
			'Authentic Kennedy Space Center archive photograph of Pioneer 10 launching on 2 March 1972 local time.',
		usage:
			'Primary Pioneer profile photograph; the caption distinguishes local launch date from 3 March UTC.',
		license: nasaMediaTerms,
		accessed,
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'deep-nasa-kepler',
		name: 'Kepler Space Telescope',
		url: 'https://science.nasa.gov/mission/kepler/',
		organization: 'NASA Science',
		type: 'Science & history',
		provides:
			'Kepler mission design, transit method, discoveries, K2 extension, and retirement history.',
		usage:
			'Supports the telescope story, science contributions, status, learning quiz, and comparison.',
		license: 'NASA informational content; cite NASA and do not imply endorsement.',
		accessed,
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'deep-nssdc-kepler',
		name: 'Kepler | NSSDCA Master Catalog',
		url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2009-011A',
		organization: 'NASA Space Science Data Coordinated Archive',
		type: 'Mission record',
		provides:
			'Spacecraft description, heliocentric orbit, UTC launch date, science operations, and mission profile.',
		usage:
			'Drives Kepler dates, engineering explanation, trajectory wording, and no-surface-location handling.',
		license: 'United States government scientific record; cite NASA/NSSDCA.',
		accessed,
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'deep-nasa-kepler-retirement',
		name: 'NASA Retires Kepler Space Telescope, Passes Planet-Hunting Torch',
		url: 'https://www.nasa.gov/news-release/nasa-retires-kepler-space-telescope-passes-planet-hunting-torch/',
		organization: 'NASA',
		type: 'Science & history',
		provides:
			'Formal retirement announcement, fuel context, discovery count, and scientific legacy.',
		usage: 'Supports the 30 October 2018 retirement date, status, and exoplanet count.',
		license: 'NASA informational content; cite NASA and do not imply endorsement.',
		accessed,
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'deep-nasa-kepler-final',
		name: "NASA's Kepler Space Telescope Gets Its Final Commands",
		url: 'https://www.nasa.gov/wp-json/wp/v2/migration/129214?_fields=date,link,title,content',
		organization: 'NASA',
		type: 'Science & history',
		provides:
			'Preserved NASA article documenting the final shutdown commands received on 15 November 2018.',
		usage: 'Separates retirement announcement from final deactivation commands in the timeline.',
		license:
			'NASA informational content delivered through the public NASA API; cite NASA and do not imply endorsement.',
		accessed,
		verification: 'Verified',
		challengeResource: null
	},
	{
		id: 'image-kepler',
		name: 'KSC-2009-1124 | Kepler Solar Array Test',
		url: 'https://images.nasa.gov/details/KSC-2009-1124',
		organization: 'NASA / Kim Shiflett',
		type: 'Image archive',
		provides:
			'Authentic NASA photograph of Kepler during prelaunch solar-array illumination testing at Cape Canaveral.',
		usage: 'Primary Kepler profile photograph with a prelaunch-test caption.',
		license: nasaMediaTerms,
		accessed,
		verification: 'Verified',
		challengeResource: null
	}
];

export const marsDeepEquipment: Equipment[] = [
	{
		id: 'viking-1',
		name: 'Viking 1 Lander',
		shortName: 'Viking 1',
		mission: 'Viking 1',
		destination: 'Mars',
		equipmentType: 'Landers',
		launchDate: '1975-08-20',
		deploymentDate: '1976-07-20',
		deploymentLabel: 'Mars landing',
		missionEndDate: '1982-11',
		dateNote:
			'NASA sources disagree on the final-contact day: NASA Science gives 11 November 1982 while NSSDCA gives 13 November. The collection preserves only the verified month.',
		status: 'Mission complete',
		statusDetail:
			'Communications ended in November 1982. That ends the operational record; it does not prove the lander was destroyed. Its present detailed physical condition is Unknown.',
		chapter: 'The first long-lived scientific station on the surface of Mars.',
		summary:
			'A stationary laboratory that photographed, sampled, and monitored Mars from Chryse Planitia for more than six years.',
		story:
			'Viking 1 arrived as a complete field laboratory. It photographed the landscape, reached into the soil, watched Martian weather, and ran direct life-detection experiments. Its biology results did not establish conclusive evidence of life, but the measurements changed how scientists ask that question and created a detailed record of one place on Mars.',
		purpose:
			'Study the appearance, weather, chemistry, physical properties, and possible biological activity of the Martian surface and atmosphere.',
		functionality:
			'Radioisotope generators powered a fixed platform. Scan cameras surveyed the site, a sampler arm delivered soil to onboard experiments, meteorology sensors watched the atmosphere, and radios sent results directly or through the orbiter.',
		scientificContributions: [
			{
				text: 'Returned the first photograph transmitted from the Martian surface and began a long record of the Chryse Planitia environment.',
				sourceIds: ['mars-nasa-viking1', 'mars-nssdc-viking1']
			},
			{
				text: 'Measured soil chemistry and weather and performed direct biology experiments; those experiments did not establish conclusive evidence of life.',
				sourceIds: ['mars-nasa-viking1', 'mars-nssdc-viking1']
			}
		],
		location: {
			name: 'Western Chryse Planitia',
			description:
				'NSSDCA reports 22.27° N, 312.05° E planetocentric. The atlas expresses the same longitude as 47.95° W so it falls in the -180° to 180° plotting range.',
			coordinates: { latitude: 22.27, longitude: -47.95 },
			locationAccuracy: 'Documented equipment location',
			sourceIds: ['mars-nssdc-viking1']
		},
		images: [
			{
				id: 'viking1-first-surface',
				src: '/media/viking-1.jpg',
				alt: 'First Viking 1 view from the surface of Mars, showing nearby terrain and one lander footpad.',
				caption:
					'The first image from Viking 1 on 20 July 1976. It shows the nearby surface and a footpad, not the entire lander. PIA00381.',
				credit: 'NASA / JPL',
				originalUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA00381',
				sourceId: 'image-viking1',
				kind: 'Photograph',
				aiGenerated: false
			}
		],
		timeline: [
			{
				date: '1975-08-20',
				title: 'Viking 1 launches',
				description: 'The orbiter-lander spacecraft begins its journey to Mars.',
				type: 'Launch',
				sourceIds: ['mars-nssdc-viking1']
			},
			{
				date: '1976-06-19',
				title: 'The carrier enters Mars orbit',
				description: 'Orbital images help certify the landing site before separation.',
				type: 'Arrival',
				sourceIds: ['mars-nssdc-viking1']
			},
			{
				date: '1976-07-20',
				title: 'The lander touches down',
				description:
					'Viking 1 lands in western Chryse Planitia and starts transmitting its first surface view about 25 seconds later.',
				type: 'Deployment',
				sourceIds: ['mars-nssdc-viking1']
			},
			{
				date: '1976-07-28',
				title: 'The first soil sample is collected',
				description:
					'After freeing a sampler-arm locking pin, the lander begins delivering Martian material to onboard experiments.',
				type: 'Science',
				sourceIds: ['mars-nssdc-viking1']
			},
			{
				date: '1982-11',
				title: 'Communications end',
				description:
					'Contact is lost in November. NASA records disagree on the exact day, so this timeline does not invent one.',
				type: 'Conclusion',
				sourceIds: ['mars-nasa-viking1', 'mars-nssdc-viking1']
			}
		],
		interestingFacts: [
			{
				text: 'Transmission of Viking 1’s first surface image began about 25 seconds after landing.',
				sourceIds: ['mars-nssdc-viking1']
			},
			{
				text: 'Its command computer held about 6,000 words of instructions—tiny by modern standards, but enough to operate a laboratory on Mars.',
				sourceIds: ['mars-nssdc-viking1']
			}
		],
		relatedIds: ['insight', 'opportunity', 'eagle-descent-stage'],
		sources: ['mars-nasa-viking1', 'mars-nssdc-viking1', 'image-viking1'],
		fieldSources: {
			dates: ['mars-nasa-viking1', 'mars-nssdc-viking1'],
			purpose: ['mars-nasa-viking1', 'mars-nssdc-viking1'],
			functionality: ['mars-nssdc-viking1'],
			status: ['mars-nasa-viking1', 'mars-nssdc-viking1']
		},
		aiGeneratedMedia: false
	},
	{
		id: 'opportunity',
		name: 'Opportunity Mars Exploration Rover',
		shortName: 'Opportunity',
		mission: 'Mars Exploration Rover',
		destination: 'Mars',
		equipmentType: 'Rovers',
		launchDate: '2003-07-08',
		deploymentDate: '2004-01-25',
		deploymentLabel: 'Mars landing',
		missionEndDate: '2019-02-13',
		dateNote:
			'Dates use UTC: launch was 8 July UTC but 7 July in Florida; landing was 25 January UTC but 24 January Pacific time. Last contact was 10 June 2018; NASA declared the mission complete on 13 February 2019.',
		status: 'Mission complete',
		statusDetail:
			'Opportunity stopped communicating during a planet-wide dust storm. NASA ended recovery efforts in February 2019. Loss of contact does not reveal the rover’s present detailed physical condition, which is Unknown.',
		chapter: 'A 90-day rover that kept exploring for more than fourteen years.',
		summary:
			'A solar-powered robotic geologist that followed the mineral and rock record of ancient water across Meridiani Planum.',
		story:
			'Opportunity landed inside a small crater and began reading Mars like a field geologist. Cameras chose targets; spectrometers examined their chemistry; a grinding tool exposed fresh rock. The rover kept moving long after its planned 90-sol mission, following geological clues from Eagle crater to Endeavour crater until a vast dust storm cut off communication.',
		purpose:
			'Search rocks and soils for evidence of past water, characterize Martian geology and climate, and assess whether ancient environments could have supported life.',
		functionality:
			'Six motorized wheels and a rocker-bogie suspension carried a solar-powered laboratory. Panoramic cameras, spectrometers, a microscope, and an arm-mounted rock abrasion tool let the rover inspect layers and minerals up close.',
		scientificContributions: [
			{
				text: 'Found mineral and sedimentary evidence that liquid water once affected rocks in Meridiani Planum.',
				sourceIds: ['mars-nasa-opportunity', 'mars-nssdc-opportunity']
			},
			{
				text: 'Investigated older rocks near Endeavour crater that recorded less acidic water conditions with greater potential for habitability.',
				sourceIds: ['mars-nasa-opportunity', 'mars-jpl-opportunity-end']
			}
		],
		location: {
			name: 'Eagle crater landing site, Meridiani Planum',
			description:
				'The atlas plots Opportunity’s documented landing position: 1.946° S, 354.473° E IAU 2000 body-centered coordinates, expressed as 5.527° W. This is not the rover’s final location in Perseverance Valley.',
			coordinates: { latitude: -1.946, longitude: -5.527 },
			locationAccuracy: 'Approximate mission site',
			sourceIds: ['mars-nssdc-opportunity']
		},
		images: [
			{
				id: 'opportunity-self-portrait',
				src: '/media/opportunity.jpg',
				alt: 'Opportunity rover on Mars in a self-portrait mosaic assembled from its Pancam images.',
				caption:
					'Opportunity self-portrait assembled from Pancam images taken 22–24 March 2014 in approximately true color. The camera mast is absent because of the projection. PIA18079.',
				credit: 'NASA / JPL-Caltech / Cornell University / Arizona State University',
				originalUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA18079',
				sourceId: 'image-opportunity',
				kind: 'Photo mosaic',
				aiGenerated: false
			}
		],
		timeline: [
			{
				date: '2003-07-08',
				title: 'Opportunity launches',
				description: 'The second Mars Exploration Rover begins its interplanetary journey.',
				type: 'Launch',
				sourceIds: ['mars-nssdc-opportunity']
			},
			{
				date: '2004-01-25',
				title: 'A hole in one on Mars',
				description: 'Airbags carry Opportunity into Eagle crater at Meridiani Planum.',
				type: 'Deployment',
				sourceIds: ['mars-nssdc-opportunity']
			},
			{
				date: '2011-08-09',
				title: 'Endeavour crater reached',
				description:
					'After years of driving, the rover reaches the rim of a much larger and older crater.',
				type: 'Science',
				sourceIds: ['mars-nasa-opportunity']
			},
			{
				date: '2018-06-10',
				title: 'Last communication',
				description: 'A major dust storm blocks sunlight and the solar-powered rover falls silent.',
				type: 'Conclusion',
				sourceIds: ['mars-nssdc-opportunity', 'mars-jpl-opportunity-end']
			},
			{
				date: '2019-02-13',
				title: 'Mission declared complete',
				description:
					'NASA ends the recovery campaign after more than fourteen years of surface exploration.',
				type: 'Legacy',
				sourceIds: ['mars-jpl-opportunity-end']
			}
		],
		interestingFacts: [
			{
				text: 'Designed for about 90 Martian days, Opportunity worked on Mars for more than fourteen Earth years.',
				sourceIds: ['mars-jpl-opportunity-end']
			},
			{
				text: 'The rover traveled 45.16 kilometers—farther than a marathon—during its mission.',
				sourceIds: ['mars-jpl-opportunity-end']
			}
		],
		relatedIds: ['viking-1', 'insight', 'apollo-15-rover'],
		sources: [
			'mars-nasa-opportunity',
			'mars-nssdc-opportunity',
			'mars-jpl-opportunity-end',
			'image-opportunity'
		],
		fieldSources: {
			dates: ['mars-nssdc-opportunity', 'mars-jpl-opportunity-end'],
			purpose: ['mars-nasa-opportunity', 'mars-nssdc-opportunity'],
			functionality: ['mars-nssdc-opportunity'],
			status: ['mars-nssdc-opportunity', 'mars-jpl-opportunity-end']
		},
		aiGeneratedMedia: false
	},
	{
		id: 'insight',
		name: 'InSight Mars Lander',
		shortName: 'InSight',
		mission: 'InSight',
		destination: 'Mars',
		equipmentType: 'Landers',
		launchDate: '2018-05-05',
		deploymentDate: '2018-11-26',
		deploymentLabel: 'Mars landing',
		missionEndDate: '2022-12-21',
		dateNote:
			'Last communication was received on 15 December 2022. NASA declared the mission over on 21 December after two further attempts failed.',
		status: 'Mission complete',
		statusDetail:
			'Dust reduced the solar panels’ power until the lander could no longer communicate. The mission is retired; a 2024 orbital image showing the dusty lander did not restore operations. Present detailed hardware condition is Unknown.',
		chapter: 'The stationary lander that listened beneath the Martian surface.',
		summary:
			'A geophysical station that used marsquakes and radio tracking to reveal the structure inside Mars.',
		story:
			'InSight did not roam. Its job was to become a quiet geophysical observatory. A robotic arm placed a sensitive seismometer on the ground, where vibrations from marsquakes and impacts traveled through the planet. By comparing those waves, researchers could investigate layers no camera can see.',
		purpose:
			'Investigate the size, composition, and physical state of Mars’s crust, mantle, and core and measure present seismic activity and impact rates.',
		functionality:
			'Solar panels powered a fixed lander. Its arm placed the SEIS seismometer on the ground; radio tracking measured subtle rotational motion. The heat-flow mole did not reach its intended depth, so the planned deep heat measurement was not completed.',
		scientificContributions: [
			{
				text: 'Detected 1,319 marsquakes, creating the first long seismic record from the surface of another planet.',
				sourceIds: ['mars-nasa-insight', 'mars-jpl-insight-end']
			},
			{
				text: 'Seismic waves revealed properties of Mars’s crust, mantle, and core and linked some signals to meteoroid impacts later seen from orbit.',
				sourceIds: ['mars-nasa-insight', 'mars-jpl-insight-end']
			}
		],
		location: {
			name: 'Western Elysium Planitia',
			description:
				'NASA and NSSDCA identify the landing region in western Elysium Planitia near the Martian equator. A numerical position precise enough for this atlas was not verified in the consulted records, so no point is plotted.',
			coordinates: null,
			locationAccuracy: 'Approximate mission site',
			sourceIds: ['mars-nssdc-insight']
		},
		images: [
			{
				id: 'insight-final-selfie',
				src: '/media/insight.jpg',
				alt: 'Dust-covered InSight lander in its final robotic-arm selfie mosaic on Mars.',
				caption:
					'InSight’s final selfie, assembled from robotic-arm camera views taken 24 April 2022. Dust covers the solar panels. PIA25287.',
				credit: 'NASA / JPL-Caltech',
				originalUrl: 'https://images.nasa.gov/details/PIA25287',
				sourceId: 'image-insight',
				kind: 'Photo mosaic',
				aiGenerated: false
			}
		],
		timeline: [
			{
				date: '2018-05-05',
				title: 'InSight launches',
				description: 'The geophysics mission begins its journey from Vandenberg Air Force Base.',
				type: 'Launch',
				sourceIds: ['mars-nssdc-insight']
			},
			{
				date: '2018-11-26',
				title: 'Landing in Elysium Planitia',
				description:
					'The stationary lander reaches a broad plain chosen for safe operations and instrument placement.',
				type: 'Deployment',
				sourceIds: ['mars-nssdc-insight']
			},
			{
				date: '2018-12-19',
				title: 'A seismometer touches Mars',
				description: 'The robotic arm places SEIS directly on the surface.',
				type: 'Science',
				sourceIds: ['mars-nssdc-insight', 'mars-nasa-insight']
			},
			{
				date: '2022-12-15',
				title: 'Last communication',
				description:
					'The final received signal arrives as accumulated dust leaves too little solar power.',
				type: 'Conclusion',
				sourceIds: ['mars-nssdc-insight']
			},
			{
				date: '2022-12-21',
				title: 'Mission retired',
				description:
					'NASA declares the mission complete after two additional communication attempts fail.',
				type: 'Legacy',
				sourceIds: ['mars-nssdc-insight', 'mars-jpl-insight-end']
			}
		],
		interestingFacts: [
			{
				text: 'SEIS was the first seismometer placed directly on the surface of another planet.',
				sourceIds: ['mars-nasa-insight']
			},
			{
				text: 'InSight’s final selfie visibly recorded how much dust had accumulated on its solar panels.',
				sourceIds: ['image-insight', 'mars-jpl-insight-end']
			}
		],
		relatedIds: ['viking-1', 'opportunity', 'apollo-11-reflector'],
		sources: ['mars-nasa-insight', 'mars-nssdc-insight', 'mars-jpl-insight-end', 'image-insight'],
		fieldSources: {
			dates: ['mars-nssdc-insight', 'mars-jpl-insight-end'],
			purpose: ['mars-nasa-insight', 'mars-nssdc-insight'],
			functionality: ['mars-nssdc-insight'],
			status: ['mars-nssdc-insight', 'mars-jpl-insight-end']
		},
		aiGeneratedMedia: false
	},
	{
		id: 'pioneer-10',
		name: 'Pioneer 10 Space Probe',
		shortName: 'Pioneer 10',
		mission: 'Pioneer 10',
		destination: 'Deep Space',
		equipmentType: 'Spacecraft and probes',
		launchDate: '1972-03-03',
		deploymentDate: null,
		deploymentLabel: 'Planetary landing',
		missionEndDate: '1997-03-31',
		dateNote:
			'Launch was 3 March 1972 UTC but 2 March local time in Florida. Routine mission operations ended 31 March 1997; last usable telemetry arrived 27 April 2002, and a final weak carrier without telemetry was detected 23 January 2003.',
		status: 'Mission complete',
		statusDetail:
			'Pioneer 10 no longer communicates. A weak carrier detection is not usable telemetry, and silence is not evidence of destruction. It continues outward on a solar-system escape trajectory; its current verified position is not provided here.',
		chapter: 'The first spacecraft to cross the asteroid belt and visit Jupiter.',
		summary:
			'A spinning, radioisotope-powered probe that opened the route to Jupiter and then continued into deep space.',
		story:
			'Pioneer 10 was sent where no spacecraft had traveled before. It crossed the main asteroid belt, survived Jupiter’s intense radiation environment, returned close-range observations, and used the planet’s gravity to continue outward. Decades later, Earth heard only a final faint carrier. The spacecraft did not land, so a pin on a planetary surface would tell the wrong story.',
		purpose:
			'Measure the interplanetary environment, cross the asteroid belt, investigate Jupiter and its magnetic and radiation environment, and continue measurements beyond the giant planet.',
		functionality:
			'The spacecraft spun for stability while instruments measured particles, fields, radiation, dust, and images. Radioisotope generators supplied electricity and a large high-gain antenna sent data across growing distances.',
		scientificContributions: [
			{
				text: 'Returned the first close-range spacecraft observations of Jupiter, including hundreds of images and measurements of its atmosphere.',
				sourceIds: ['deep-nasa-pioneer10', 'deep-nssdc-pioneer10']
			},
			{
				text: 'Measured Jupiter’s magnetic field and radiation environment and gathered particle and dust data during the first spacecraft passage through the main asteroid belt.',
				sourceIds: ['deep-nasa-pioneer10', 'deep-nssdc-pioneer10']
			}
		],
		location: {
			name: 'Outbound solar-system escape trajectory',
			description:
				'Pioneer 10 did not land. It is traveling outward after its Jupiter flyby. No current position or distance is asserted in this collection, and the surface atlas deliberately leaves it unplotted.',
			coordinates: null,
			locationAccuracy: 'Not applicable',
			sourceIds: ['deep-nasa-pioneer10', 'deep-nssdc-pioneer10']
		},
		images: [
			{
				id: 'pioneer10-launch',
				src: '/media/pioneer-10.jpg',
				alt: 'Atlas-Centaur rocket carrying Pioneer 10 launching from Florida at night.',
				caption:
					'Pioneer 10 launches at 8:49 p.m. EST on 2 March 1972—3 March in UTC. ARC-1972-AC72-2142.',
				credit: 'NASA / Kennedy Space Center',
				originalUrl: 'https://images.nasa.gov/details/ARC-1972-AC72-2142',
				sourceId: 'image-pioneer10',
				kind: 'Photograph',
				aiGenerated: false
			}
		],
		timeline: [
			{
				date: '1972-03-03',
				title: 'Pioneer 10 launches',
				description: 'The probe leaves Florida late on 2 March local time, which is 3 March UTC.',
				type: 'Launch',
				sourceIds: ['deep-nssdc-pioneer10', 'deep-nasa-pioneer-history']
			},
			{
				date: '1973-12-04',
				title: 'First close Jupiter flyby',
				description: 'Pioneer 10 makes humanity’s first spacecraft encounter with Jupiter.',
				type: 'Science',
				sourceIds: ['deep-nasa-pioneer10', 'deep-nssdc-pioneer10']
			},
			{
				date: '1997-03-31',
				title: 'Routine mission ends',
				description:
					'NASA concludes routine operations, although occasional contact attempts continue.',
				type: 'Conclusion',
				sourceIds: ['deep-nasa-pioneer10']
			},
			{
				date: '2002-04-27',
				title: 'Last usable telemetry',
				description:
					'Earth receives the last signal strong enough to carry spacecraft engineering data.',
				type: 'Legacy',
				sourceIds: ['deep-nasa-pioneer10']
			},
			{
				date: '2003-01-23',
				title: 'Final weak carrier detected',
				description: 'A final extremely weak signal is detected without usable telemetry.',
				type: 'Legacy',
				sourceIds: ['deep-nasa-pioneer10']
			}
		],
		interestingFacts: [
			{
				text: 'Pioneer 10 carried a pictorial plaque designed to communicate where it came from if it were ever found.',
				sourceIds: ['deep-nasa-pioneer10']
			},
			{
				text: 'Roughly eleven hours after launch, it had already crossed the distance of the Moon’s orbit.',
				sourceIds: ['deep-nasa-pioneer-history']
			}
		],
		relatedIds: ['kepler', 'viking-1', 'eagle-descent-stage'],
		sources: [
			'deep-nasa-pioneer10',
			'deep-nssdc-pioneer10',
			'deep-nasa-pioneer-history',
			'image-pioneer10'
		],
		fieldSources: {
			dates: ['deep-nasa-pioneer10', 'deep-nssdc-pioneer10'],
			purpose: ['deep-nasa-pioneer10', 'deep-nssdc-pioneer10'],
			functionality: ['deep-nssdc-pioneer10'],
			status: ['deep-nasa-pioneer10']
		},
		aiGeneratedMedia: false
	},
	{
		id: 'kepler',
		name: 'Kepler Space Telescope',
		shortName: 'Kepler',
		mission: 'Kepler / K2',
		destination: 'Deep Space',
		equipmentType: 'Spacecraft and probes',
		launchDate: '2009-03-07',
		deploymentDate: null,
		deploymentLabel: 'Planetary landing',
		missionEndDate: '2018-10-30',
		dateNote:
			'Launch was 7 March 2009 UTC but 6 March local time in Florida. Retirement was announced 30 October 2018; final shutdown commands were received on 15 November. That command date is not relabeled as a verified final-telemetry timestamp.',
		status: 'Mission complete',
		statusDetail:
			'Kepler was retired after exhausting the fuel needed to point for further science and was deliberately deactivated. It remains in a heliocentric orbit; its current verified position and detailed physical condition are not provided here.',
		chapter: 'A telescope that discovered planets by watching stars grow dim.',
		summary:
			'A planet-hunting observatory that measured tiny, repeating dips in starlight and transformed our view of other solar systems.',
		story:
			'Kepler rarely saw an exoplanet directly. Instead, it watched the brightness of many stars at once and waited for a tiny repeating dip as a planet crossed in front. Even after reaction-wheel failures ended the original pointing strategy, engineers created the K2 mission and gave the same spacecraft a second scientific career.',
		purpose:
			'Measure how common planets are around other stars, especially Earth-size worlds and systems whose orbital geometry produces observable transits.',
		functionality:
			'A large photometer continuously measured stellar brightness. Repeated, regular dimming could indicate a planet crossing its star. The pattern revealed orbital period and, with the star’s size, helped estimate the planet’s size.',
		scientificContributions: [
			{
				text: 'Had discovered more than 2,600 confirmed exoplanets by retirement, showing that planets are common in our galaxy.',
				sourceIds: ['deep-nasa-kepler', 'deep-nasa-kepler-retirement']
			},
			{
				text: 'Discovered Kepler-186f, an Earth-size planet in its star’s habitable zone; that location does not by itself prove liquid water or life.',
				sourceIds: ['deep-nasa-kepler']
			}
		],
		location: {
			name: 'Heliocentric, Earth-trailing orbit',
			description:
				'Kepler did not land and did not travel to the exoplanets it observed. NASA left it in a safe orbit around the Sun away from Earth. No current distance is asserted, so the surface atlas leaves it unplotted.',
			coordinates: null,
			locationAccuracy: 'Not applicable',
			sourceIds: ['deep-nasa-kepler', 'deep-nssdc-kepler']
		},
		images: [
			{
				id: 'kepler-prelaunch-test',
				src: '/media/kepler.jpg',
				alt: 'Kepler spacecraft solar arrays reflecting test lights during prelaunch processing.',
				caption:
					'Kepler during solar-array illumination testing at Cape Canaveral on 13 January 2009. KSC-2009-1124.',
				credit: 'NASA / Kim Shiflett',
				originalUrl: 'https://images.nasa.gov/details/KSC-2009-1124',
				sourceId: 'image-kepler',
				kind: 'Photograph',
				aiGenerated: false
			}
		],
		timeline: [
			{
				date: '2009-03-07',
				title: 'Kepler launches',
				description:
					'A Delta II sends the observatory toward an Earth-trailing orbit around the Sun.',
				type: 'Launch',
				sourceIds: ['deep-nssdc-kepler']
			},
			{
				date: '2009-05-13',
				title: 'Science operations begin',
				description: 'The telescope starts its sustained survey of stellar brightness.',
				type: 'Science',
				sourceIds: ['deep-nasa-kepler', 'deep-nssdc-kepler']
			},
			{
				date: '2014-05-30',
				title: 'K2 begins a second mission',
				description:
					'A new pointing strategy lets Kepler continue observing after two reaction wheels fail.',
				type: 'Legacy',
				sourceIds: ['deep-nasa-kepler']
			},
			{
				date: '2018-10-30',
				title: 'Retirement announced',
				description:
					'NASA retires Kepler after it exhausts the fuel needed for further science pointing.',
				type: 'Conclusion',
				sourceIds: ['deep-nasa-kepler-retirement']
			},
			{
				date: '2018-11-15',
				title: 'Final commands received',
				description:
					'The telescope receives commands that disable its transmitters and protective fault modes.',
				type: 'Legacy',
				sourceIds: ['deep-nasa-kepler-final']
			}
		],
		interestingFacts: [
			{
				text: 'Kepler gained a second scientific career as K2 after two reaction wheels failed.',
				sourceIds: ['deep-nasa-kepler']
			},
			{
				text: 'Its final shutdown commands were sent on the anniversary of astronomer Johannes Kepler’s death.',
				sourceIds: ['deep-nasa-kepler-final']
			}
		],
		relatedIds: ['pioneer-10', 'opportunity', 'apollo-11-reflector'],
		sources: [
			'deep-nasa-kepler',
			'deep-nssdc-kepler',
			'deep-nasa-kepler-retirement',
			'deep-nasa-kepler-final',
			'image-kepler'
		],
		fieldSources: {
			dates: ['deep-nssdc-kepler', 'deep-nasa-kepler-retirement', 'deep-nasa-kepler-final'],
			purpose: ['deep-nasa-kepler', 'deep-nssdc-kepler'],
			functionality: ['deep-nasa-kepler'],
			status: ['deep-nasa-kepler-retirement', 'deep-nasa-kepler-final']
		},
		aiGeneratedMedia: false
	}
];
