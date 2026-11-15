export type LearningQuestion = {
	id: string;
	equipmentId: string;
	topic: string;
	prompt: string;
	choices: string[];
	correctIndex: number;
	explanation: string;
	evidence: 'functionality' | 'scientificContributions' | 'status';
	concept?: { title: string; description: string };
};

// Source IDs are resolved from the equipment records, not duplicated here.
export const learningQuestions: LearningQuestion[] = [
	{
		id: 'passive-reflector',
		equipmentId: 'apollo-11-reflector',
		topic: 'A different kind of instrument',
		prompt: 'What powers the Apollo 11 laser reflector on the Moon?',
		choices: [
			'An onboard battery that astronauts replace',
			'Nothing onboard: it reflects laser light sent from Earth',
			'A small nuclear generator'
		],
		correctIndex: 1,
		explanation:
			'The reflector is a passive optical instrument. It returns incoming laser light toward Earth without onboard electrical power. Timing the round trip helps scientists measure the Earth-Moon distance.',
		evidence: 'functionality',
		concept: {
			title: 'Passive instrument',
			description:
				'This reflector does not make its own signal. It returns light sent from Earth, so its work needs no onboard electrical power.'
		}
	},
	{
		id: 'marsquakes',
		equipmentId: 'insight',
		topic: 'Listening to another world',
		prompt: "What did InSight's seismometer measure?",
		choices: [
			'Tiny vibrations in the Martian ground',
			'Radio messages from the Moon',
			'The colors of clouds around Jupiter'
		],
		correctIndex: 0,
		explanation:
			'InSight measured ground motion, including marsquakes. Studying how seismic waves travel helps scientists investigate the interior of Mars. It was measuring vibrations, not recording ordinary sound with a microphone.',
		evidence: 'functionality',
		concept: {
			title: 'Marsquake',
			description:
				'A seismic event on Mars. The waves it sends through the planet can reveal clues about the interior, much as earthquakes help us study Earth.'
		}
	},
	{
		id: 'planet-transits',
		equipmentId: 'kepler',
		topic: 'A small dip, a big clue',
		prompt: 'What signal did Kepler look for when searching for planets?',
		choices: [
			'The sound a planet makes as it orbits',
			'Detailed photographs of every planetary surface',
			'Repeated small dips in the brightness of a star'
		],
		correctIndex: 2,
		explanation:
			"Kepler monitored starlight. A planet crossing in front of its star, from the telescope's viewpoint, can cause a small brightness dip called a transit. Repeating dips provide evidence to investigate, not a photograph of the planet.",
		evidence: 'functionality',
		concept: {
			title: 'Transit',
			description:
				'A crossing in front of a star from our line of sight. A planet can briefly block a little starlight, producing the brightness dip that Kepler measured.'
		}
	},
	{
		id: 'ancient-water',
		equipmentId: 'opportunity',
		topic: 'Reading the rocks',
		prompt: 'What kind of evidence for past water did Opportunity study?',
		choices: [
			'An ocean of liquid water it photographed on the surface',
			'Minerals and rock features that record a watery past',
			'Rain collected in a container on the rover'
		],
		correctIndex: 1,
		explanation:
			"Opportunity studied Martian rocks and minerals that preserve evidence of past water. These clues tell us about the planet's history; they do not mean the rover found a present-day ocean.",
		evidence: 'scientificContributions'
	},
	{
		id: 'mission-status',
		equipmentId: 'kepler',
		topic: 'An ending is not an erasure',
		prompt: 'What can a mission status of "complete" or "inactive" tell us?',
		choices: [
			'Operations ended; that alone does not mean the hardware was destroyed',
			'The hardware was definitely destroyed when the mission ended',
			'The equipment was always brought back to Earth'
		],
		correctIndex: 0,
		explanation:
			"Kepler was retired after its fuel was depleted and remains in a heliocentric orbit, around the Sun. Mission status describes operations, not proof that the hardware no longer exists. Each object's record explains its documented situation.",
		evidence: 'status'
	}
];
