export const challenge = {
	title:
		"Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars",
	resourcesUrl:
		'https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/?tab=resources',
	inspectedAt: '2026-11-15',
	verification: 'Verified with certificate-validating Chromium',
	evidence:
		'The exact 2026 Resources URL returned HTTP 200 without redirect in certificate-disabled curl diagnostics. ' +
		'Its embedded Next.js resourcesTabContent ($19) contained the 14 NASA Data & Resources links below; ' +
		'page metadata reported lastPublishedAt 2026-11-13T03:46:21.392788Z. ' +
		'webfetch returned Transport error, and TLS-validating curl failed with SEC_E_UNTRUSTED_ROOT (0x80090325). ' +
		'One subsequent request using Node v24.21.0 fetch with default TLS/CA configuration failed with ' +
		'UNABLE_TO_GET_ISSUER_CERT_LOCALLY (unable to get local issuer certificate), before an HTTP response. ' +
		'No trust stores or security settings were changed. A subsequent Playwright Chromium browser check on 2026-11-15, ' +
		'with ignoreHTTPSErrors explicitly false, successfully opened the exact Resources URL with HTTP 200 and no redirect. ' +
		'The NASA Data & Resources heading was visible and every one of the 14 original NASA link targets below was present in the rendered page. ' +
		'This authenticated browser check resolves the earlier client-specific certificate failures. ' +
		'Names and URLs reproduce the observed tab data, not another year or a supplementary list. ' +
		'Destination pages are documented separately in the source registry. Listed inclusion does not establish overall competition eligibility.',
	eligibility: 'Not verified',
	resourceLinks: [
		{
			name: 'NASA Space Science Data Coordinated Archive (NSSDCA)',
			url: 'https://nssdc.gsfc.nasa.gov/'
		},
		{
			name: 'Apollo Lunar Modules',
			url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C'
		},
		{
			name: 'Lunar Roving Vehicles (LRVs)',
			url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C'
		},
		{
			name: 'ALSEP Scientific Packages',
			url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C'
		},
		{
			name: 'Surveyor Landers',
			url: 'https://science.nasa.gov/mission/surveyor-3/'
		},
		{
			name: 'Sojourner Rover',
			url: 'https://science.nasa.gov/mission/mars-pathfinder/'
		},
		{
			name: 'Spirit & Opportunity',
			url: 'https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/'
		},
		{
			name: 'Viking 1 & 2 Landers',
			url: 'https://science.nasa.gov/mission/viking-1/'
		},
		{
			name: 'Phoenix & InSight Landers',
			url: 'https://science.nasa.gov/mission/insight/'
		},
		{
			name: 'Dawn Spacecraft',
			url: 'https://science.nasa.gov/mission/dawn/'
		},
		{
			name: 'NEAR Shoemaker',
			url: 'https://science.nasa.gov/mission/near-shoemaker/'
		},
		{
			name: 'Pioneer 10 & 11',
			url: 'https://science.nasa.gov/mission/pioneer-10/'
		},
		{
			name: 'Ingenuity Helicopter',
			url: 'https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/'
		},
		{
			name: 'Kepler Space Telescope',
			url: 'https://science.nasa.gov/mission/kepler/'
		}
	],
	brandReferences: [
		{
			name: 'NASA Space Apps Brand Guidelines',
			url: 'https://www.spaceappschallenge.org/brand/',
			evidence:
				'Page text inspected only through certificate-disabled curl diagnostics; TLS-authenticated provenance remains unverified.'
		},
		{
			name: 'NASA Space Apps Brand Guide (PDF)',
			url: 'https://assets.spaceappschallenge.org/media/documents/Space_Apps_Brand_Guide_VUGpVJm.pdf',
			evidence: 'Link observed on the brand page; the file was not downloaded or inspected.'
		},
		{
			name: 'NASA Space Apps Logos 2026',
			url: 'https://assets.spaceappschallenge.org/media/documents/NASA_Space_Apps_Logos_2026.zip',
			evidence: 'Link observed on the brand page; the file was not downloaded or inspected.'
		}
	],
	policyReferences: [
		{
			name: 'NASA Images and Media Usage Guidelines',
			url: 'https://www.nasa.gov/nasa-brand-center/images-and-media/',
			evidence:
				'Successfully inspected using webfetch; the page displayed an October 27, 2026 update. Check asset credits, third-party rights, and endorsement restrictions.'
		},
		{
			name: 'NASA Brand Guidelines',
			url: 'https://www.nasa.gov/nasa-brand-center/brand-guidelines/',
			evidence:
				'Successfully inspected using webfetch. Ordinary media-use permission does not authorize branding an app with NASA marks.'
		},
		{
			name: 'NASA Data Insignia',
			url: 'https://www.nasa.gov/nasa-data-insignia/',
			evidence:
				'Successfully inspected using webfetch. Use requires prior explicit approval, not merely the inclusion of NASA data.'
		}
	]
} as const;
