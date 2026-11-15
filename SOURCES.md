# Sources and Resource Provenance

Generated from the same typed source registry used by `/sources` and `/collection.json`. Regenerate with `npm run sources:generate` after changing the collection. Curated 15 November 2026.

## Scientific Integrity

Facts and scientific explanations are AI-assisted paraphrases of the sources below, not independently peer-reviewed science. Every equipment record carries field-level sources; timeline events, location claims, scientific contributions, interesting facts, and media each retain references. Unknown information is not filled with invented values.

Historical mission-site coordinates are not live positions. Apollo 15 rover and Opportunity landing markers are not claims about exact final rover locations. Deep-space spacecraft have no fabricated surface coordinates. NASA scientific photo mosaics are labeled as such. This release contains no AI-generated images, videos, audio, or 3D models.

## Exact 2026 Organizer Resources Tab

Original URL: https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/?tab=resources

Verification: **Verified with certificate-validating Chromium**. Overall award eligibility: **Not verified**.

The exact 2026 Resources URL returned HTTP 200 without redirect in certificate-disabled curl diagnostics. Its embedded Next.js resourcesTabContent ($19) contained the 14 NASA Data & Resources links below; page metadata reported lastPublishedAt 2026-11-13T03:46:21.392788Z. webfetch returned Transport error, and TLS-validating curl failed with SEC_E_UNTRUSTED_ROOT (0x80090325). One subsequent request using Node v24.21.0 fetch with default TLS/CA configuration failed with UNABLE_TO_GET_ISSUER_CERT_LOCALLY (unable to get local issuer certificate), before an HTTP response. No trust stores or security settings were changed. A subsequent Playwright Chromium browser check on 2026-11-15, with ignoreHTTPSErrors explicitly false, successfully opened the exact Resources URL with HTTP 200 and no redirect. The NASA Data & Resources heading was visible and every one of the 14 original NASA link targets below was present in the rendered page. This authenticated browser check resolves the earlier client-specific certificate failures. Names and URLs reproduce the observed tab data, not another year or a supplementary list. Destination pages are documented separately in the source registry. Listed inclusion does not establish overall competition eligibility.

All 14 verified names and original targets are preserved below. This is not a list inferred from another year or from supplementary archives. A certificate-validating Chromium browser confirmed these links on the exact Resources tab after the earlier command-line certificate failures. The full retrieval history is retained above.

- **NASA Space Science Data Coordinated Archive (NSSDCA)**: https://nssdc.gsfc.nasa.gov/. Observed organizer listing only; not used in this release.
- **Apollo Lunar Modules**: https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C. Used by source record(s): lunar-nssdc-apollo11; exact use documented below.
- **Lunar Roving Vehicles (LRVs)**: https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C. Used by source record(s): lunar-nssdc-apollo15; exact use documented below.
- **ALSEP Scientific Packages**: https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C. Observed organizer listing only; not used in this release.
- **Surveyor Landers**: https://science.nasa.gov/mission/surveyor-3/. Observed organizer listing only; not used in this release.
- **Sojourner Rover**: https://science.nasa.gov/mission/mars-pathfinder/. Observed organizer listing only; not used in this release.
- **Spirit & Opportunity**: https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/. Used by source record(s): mars-nasa-opportunity; exact use documented below.
- **Viking 1 & 2 Landers**: https://science.nasa.gov/mission/viking-1/. Used by source record(s): mars-nasa-viking1; exact use documented below.
- **Phoenix & InSight Landers**: https://science.nasa.gov/mission/insight/. Used by source record(s): mars-nasa-insight; exact use documented below.
- **Dawn Spacecraft**: https://science.nasa.gov/mission/dawn/. Observed organizer listing only; not used in this release.
- **NEAR Shoemaker**: https://science.nasa.gov/mission/near-shoemaker/. Observed organizer listing only; not used in this release.
- **Pioneer 10 & 11**: https://science.nasa.gov/mission/pioneer-10/. Used by source record(s): deep-nasa-pioneer10; exact use documented below.
- **Ingenuity Helicopter**: https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/. Observed organizer listing only; not used in this release.
- **Kepler Space Telescope**: https://science.nasa.gov/mission/kepler/. Used by source record(s): deep-nasa-kepler; exact use documented below.

## Meaningful NASA Data Use

The local collection incorporates NASA mission descriptions and dates into the explorer and timeline, documented location values into D3 map projections, scientific findings into stories and quizzes, and authentic archive photographs into galleries. The application is not dependent on a live NASA API. Each section below explains how the specific resource is used.

## Resource Inventory

### Apollo 11 Lunar Module | NSSDCA Master Catalog

- Registry ID: `lunar-nssdc-apollo11`
- Original URL: https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C
- Organization / creator: NASA Space Science Data Coordinated Archive
- Resource type: Mission record
- Information provided: Apollo 11 Lunar Module mission design, launch, landing, surface operations, and ascent chronology.
- Actual application use: Supports Eagle descent-stage dates, purpose, operation, status, and mission timeline.
- Conditions / license: United States government scientific record; cite NASA/NSSDCA and preserve the original context.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Exact source URL verified in the 2026 Resources tab with browser certificate validation enabled.
- Relevant equipment: Eagle's Descent Stage (eagle-descent-stage); Apollo 11 Laser Ranging Retroreflector (apollo-11-reflector)

### Apollo 15 Lunar Roving Vehicle | NSSDCA Master Catalog

- Registry ID: `lunar-nssdc-apollo15`
- Original URL: https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C
- Organization / creator: NASA Space Science Data Coordinated Archive
- Resource type: Mission record
- Information provided: Lunar Roving Vehicle design, deployment, traverses, purpose, and mission chronology.
- Actual application use: Supports the Apollo 15 rover engineering story, operational dates, exploration role, and findings.
- Conditions / license: United States government scientific record; cite NASA/NSSDCA and preserve the original context.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Exact source URL verified in the 2026 Resources tab with browser certificate validation enabled.
- Relevant equipment: Apollo 15 Lunar Roving Vehicle (apollo-15-rover)

### Lunar Landing Sites Coordinates

- Registry ID: `lunar-sites-nssdc`
- Original URL: https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html
- Organization / creator: NASA Space Science Data Coordinated Archive
- Resource type: Data archive
- Information provided: LROC-derived Apollo Lunar Module and experiment coordinates in the planetocentric Mean Earth/Polar Axis reference frame using DE421.
- Actual application use: Positions Eagle and the Apollo 11 reflector at documented coordinates and uses the Apollo 15 LM coordinate only as an approximate mission-site marker for the rover.
- Conditions / license: NASA scientific reference table; retain coordinate convention and cited LROC/Wagner context.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Eagle's Descent Stage (eagle-descent-stage); Apollo 15 Lunar Roving Vehicle (apollo-15-rover); Apollo 11 Laser Ranging Retroreflector (apollo-11-reflector)

### The Apollo Experiment That Keeps on Giving

- Registry ID: `lunar-nasa-reflector`
- Original URL: https://www.nasa.gov/missions/apollo/apollo-11/the-apollo-experiment-that-keeps-on-giving/
- Organization / creator: NASA
- Resource type: Science & history
- Information provided: Plain-language history of lunar laser ranging, passive reflector operation, and continuing scientific value.
- Actual application use: Supports the reflector purpose, no-power operation, scientific contributions, status, and learning quiz.
- Conditions / license: NASA informational content; cite NASA and do not imply endorsement.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Apollo 11 Laser Ranging Retroreflector (apollo-11-reflector)

### Apollo 11 Lunar Laser Ranging Retroreflector

- Registry ID: `lunar-ilrs-apollo11`
- Original URL: https://ilrs.gsfc.nasa.gov/missions/satellite_missions/current_missions/ap11_general.html
- Organization / creator: NASA Goddard / International Laser Ranging Service
- Resource type: Data archive
- Information provided: Current-mission listing and technical identification for the Apollo 11 passive reflector.
- Actual application use: Supports the distinction between hardware left on the Moon and a passive instrument still useful to laser-ranging stations.
- Conditions / license: Scientific mission reference; cite ILRS/NASA Goddard and preserve the current-mission context.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Apollo 11 Laser Ranging Retroreflector (apollo-11-reflector)

### AS11-40-5927 | Apollo 11 Lunar Module

- Registry ID: `image-eagle-descent-stage`
- Original URL: https://images.nasa.gov/details/as11-40-5927
- Organization / creator: NASA / Neil Armstrong
- Resource type: Image archive
- Information provided: Authentic Apollo 11 photograph of Buzz Aldrin unloading equipment from Eagle before its ascent stage departed.
- Actual application use: Profile image with a caption explicitly explaining that only the lower descent stage remained after departure.
- Conditions / license: NASA educational and informational media-use guidance applies. Preserve the stated credit; do not imply endorsement. Check the original record for third-party rights.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Eagle's Descent Stage (eagle-descent-stage)

### AS15-85-11451 | Apollo 15 Lunar Rover

- Registry ID: `image-apollo15-rover`
- Original URL: https://images.nasa.gov/details/as15-85-11451
- Organization / creator: NASA / James Irwin
- Resource type: Image archive
- Information provided: Authentic surface photograph of David Scott with the Apollo 15 Lunar Roving Vehicle.
- Actual application use: Primary profile photograph for the Apollo 15 rover.
- Conditions / license: NASA educational and informational media-use guidance applies. Preserve the stated credit; do not imply endorsement. Check the original record for third-party rights.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Apollo 15 Lunar Roving Vehicle (apollo-15-rover)

### AS11-40-5952 | Apollo 11 Laser Reflector

- Registry ID: `image-apollo11-reflector`
- Original URL: https://www.nasa.gov/history/alsj/a11/a11.html
- Organization / creator: NASA Apollo Lunar Surface Journal
- Resource type: Image archive
- Information provided: Authentic Apollo 11 surface photograph showing the deployed laser ranging retroreflector.
- Actual application use: Primary profile photograph for the Apollo 11 reflector, downloaded from the journal archive.
- Conditions / license: NASA educational and informational media-use guidance applies. Preserve the stated credit; do not imply endorsement. Check the original record for third-party rights.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Apollo 11 Laser Ranging Retroreflector (apollo-11-reflector)

### Viking 1 Mission

- Registry ID: `mars-nasa-viking1`
- Original URL: https://science.nasa.gov/mission/viking-1/
- Organization / creator: NASA Science
- Resource type: Science & history
- Information provided: Viking 1 mission overview, dates, firsts, scientific goals, and results.
- Actual application use: Supports the accessible mission story, scientific contributions, and the documented disagreement over the final-contact day.
- Conditions / license: NASA informational content; cite NASA and do not imply endorsement.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Exact source URL verified in the 2026 Resources tab with browser certificate validation enabled.
- Relevant equipment: Viking 1 Lander (viking-1)

### Viking 1 Lander | NSSDCA Master Catalog

- Registry ID: `mars-nssdc-viking1`
- Original URL: https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1975-075C
- Organization / creator: NASA Space Science Data Coordinated Archive
- Resource type: Mission record
- Information provided: Lander design, instruments, launch, orbit arrival, landing, coordinates, operations, and final contact.
- Actual application use: Drives Viking dates, planetocentric location, engineering explanation, timeline, and status note.
- Conditions / license: United States government scientific record; cite NASA/NSSDCA and preserve coordinate convention.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Viking 1 Lander (viking-1)

### PIA00381 | First Picture from the Surface of Mars

- Registry ID: `image-viking1`
- Original URL: https://photojournal.jpl.nasa.gov/catalog/PIA00381
- Organization / creator: NASA / JPL
- Resource type: Image archive
- Information provided: Viking 1 surface image taken on 20 July 1976, including terrain and a lander footpad.
- Actual application use: Primary Viking profile photograph, captioned as a view from the lander rather than a photograph of the full craft.
- Conditions / license: NASA educational and informational media-use guidance applies. Preserve the stated NASA/JPL or photographer credit; do not imply endorsement. Check the original record for third-party rights.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Viking 1 Lander (viking-1)

### Spirit and Opportunity Mars Exploration Rovers

- Registry ID: `mars-nasa-opportunity`
- Original URL: https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/
- Organization / creator: NASA Science
- Resource type: Science & history
- Information provided: Mars Exploration Rover goals, water-related discoveries, mission history, and legacy.
- Actual application use: Supports Opportunity’s scientific story and the distinction between evidence of past water and a present-day ocean.
- Conditions / license: NASA informational content; cite NASA and do not imply endorsement.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Exact source URL verified in the 2026 Resources tab with browser certificate validation enabled.
- Relevant equipment: Opportunity Mars Exploration Rover (opportunity)

### Opportunity | NSSDCA Master Catalog

- Registry ID: `mars-nssdc-opportunity`
- Original URL: https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-032A
- Organization / creator: NASA Space Science Data Coordinated Archive
- Resource type: Mission record
- Information provided: Rover design, science objectives, UTC launch and landing dates, landing coordinate, and last communication.
- Actual application use: Drives Opportunity filters, landing-site atlas marker, operation explanation, status, and timeline.
- Conditions / license: United States government scientific record; cite NASA/NSSDCA and retain the IAU coordinate note.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Opportunity Mars Exploration Rover (opportunity)

### NASA's Opportunity Rover Mission on Mars Comes to End

- Registry ID: `mars-jpl-opportunity-end`
- Original URL: https://www.jpl.nasa.gov/news/nasas-opportunity-rover-mission-on-mars-comes-to-end/
- Organization / creator: NASA Jet Propulsion Laboratory
- Resource type: Science & history
- Information provided: Formal mission-completion announcement, recovery effort, traverse distance, and major accomplishments.
- Actual application use: Separates the 2018 last communication from the 2019 mission-complete decision and supports the distance fact.
- Conditions / license: NASA/JPL informational content; attribution and no-endorsement conditions apply.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Opportunity Mars Exploration Rover (opportunity)

### PIA18079 | Opportunity Self-Portrait

- Registry ID: `image-opportunity`
- Original URL: https://photojournal.jpl.nasa.gov/catalog/PIA18079
- Organization / creator: NASA / JPL-Caltech / Cornell University / Arizona State University
- Resource type: Image archive
- Information provided: Approximately true-color Pancam self-portrait mosaic made from images taken 22–24 March 2014.
- Actual application use: Primary Opportunity profile image, explicitly identified as a scientific photo mosaic rather than a third-person photograph.
- Conditions / license: NASA educational and informational media-use guidance applies. Preserve the stated NASA/JPL or photographer credit; do not imply endorsement. Check the original record for third-party rights.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Opportunity Mars Exploration Rover (opportunity)

### InSight Mission

- Registry ID: `mars-nasa-insight`
- Original URL: https://science.nasa.gov/mission/insight/
- Organization / creator: NASA Science
- Resource type: Science & history
- Information provided: InSight mission goals, instruments, interior-science results, and mission history.
- Actual application use: Supports InSight’s plain-language story, scientific contributions, and learning concept.
- Conditions / license: NASA informational content; cite NASA and do not imply endorsement.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Exact source URL verified in the 2026 Resources tab with browser certificate validation enabled.
- Relevant equipment: InSight Mars Lander (insight)

### InSight | NSSDCA Master Catalog

- Registry ID: `mars-nssdc-insight`
- Original URL: https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2018-042A
- Organization / creator: NASA Space Science Data Coordinated Archive
- Resource type: Mission record
- Information provided: Lander design, science payload, launch, landing, instrument deployment, last transmission, and mission conclusion.
- Actual application use: Drives InSight dates, engineering explanation, location description, and the last-contact versus retirement distinction.
- Conditions / license: United States government scientific record; cite NASA/NSSDCA.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: InSight Mars Lander (insight)

### NASA Retires InSight Mars Lander Mission After Years of Science

- Registry ID: `mars-jpl-insight-end`
- Original URL: https://www.jpl.nasa.gov/news/nasa-retires-insight-mars-lander-mission-after-years-of-science/
- Organization / creator: NASA Jet Propulsion Laboratory
- Resource type: Science & history
- Information provided: Formal retirement announcement, dust and power context, marsquake count, and mission findings.
- Actual application use: Supports the mission-complete status, 1,319 marsquakes fact, and retirement timeline.
- Conditions / license: NASA/JPL informational content; attribution and no-endorsement conditions apply.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: InSight Mars Lander (insight)

### PIA25287 | InSight's Final Selfie

- Registry ID: `image-insight`
- Original URL: https://images.nasa.gov/details/PIA25287
- Organization / creator: NASA / JPL-Caltech
- Resource type: Image archive
- Information provided: Final InSight selfie mosaic assembled from robotic-arm camera views taken on 24 April 2022.
- Actual application use: Primary InSight profile image, labeled as a mosaic and used to show documented dust accumulation before retirement.
- Conditions / license: NASA educational and informational media-use guidance applies. Preserve the stated NASA/JPL or photographer credit; do not imply endorsement. Check the original record for third-party rights.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: InSight Mars Lander (insight)

### Pioneer 10 Mission

- Registry ID: `deep-nasa-pioneer10`
- Original URL: https://science.nasa.gov/mission/pioneer-10/
- Organization / creator: NASA Science
- Resource type: Science & history
- Information provided: Pioneer 10 mission history, Jupiter encounter, major firsts, operations, and communications chronology.
- Actual application use: Supports the deep-space story, Jupiter findings, plaque fact, and last-contact distinctions.
- Conditions / license: NASA informational content; cite NASA and do not imply endorsement.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Exact source URL verified in the 2026 Resources tab with browser certificate validation enabled.
- Relevant equipment: Pioneer 10 Space Probe (pioneer-10)

### Pioneer 10 | NSSDCA Master Catalog

- Registry ID: `deep-nssdc-pioneer10`
- Original URL: https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-012A
- Organization / creator: NASA Space Science Data Coordinated Archive
- Resource type: Mission record
- Information provided: Spacecraft design, instruments, UTC launch, Jupiter flyby, trajectory, and communication history.
- Actual application use: Drives Pioneer dates, engineering explanation, timeline, and no-surface-location handling.
- Conditions / license: United States government scientific record; cite NASA/NSSDCA.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Pioneer 10 Space Probe (pioneer-10)

### 50 Years Ago: Pioneer 10 Launches to Explore Jupiter

- Registry ID: `deep-nasa-pioneer-history`
- Original URL: https://www.nasa.gov/history/50-years-ago-pioneer-10-launches-to-explore-jupiter/
- Organization / creator: NASA History
- Resource type: Science & history
- Information provided: Launch history, early milestones, mission objectives, and encounter context.
- Actual application use: Supports Pioneer’s launch timeline and educational mission summary.
- Conditions / license: NASA historical content; cite NASA and do not imply endorsement.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Pioneer 10 Space Probe (pioneer-10)

### ARC-1972-AC72-2142 | Pioneer 10 Launch

- Registry ID: `image-pioneer10`
- Original URL: https://images.nasa.gov/details/ARC-1972-AC72-2142
- Organization / creator: NASA / Kennedy Space Center
- Resource type: Image archive
- Information provided: Authentic Kennedy Space Center archive photograph of Pioneer 10 launching on 2 March 1972 local time.
- Actual application use: Primary Pioneer profile photograph; the caption distinguishes local launch date from 3 March UTC.
- Conditions / license: NASA educational and informational media-use guidance applies. Preserve the stated NASA/JPL or photographer credit; do not imply endorsement. Check the original record for third-party rights.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Pioneer 10 Space Probe (pioneer-10)

### Kepler Space Telescope

- Registry ID: `deep-nasa-kepler`
- Original URL: https://science.nasa.gov/mission/kepler/
- Organization / creator: NASA Science
- Resource type: Science & history
- Information provided: Kepler mission design, transit method, discoveries, K2 extension, and retirement history.
- Actual application use: Supports the telescope story, science contributions, status, learning quiz, and comparison.
- Conditions / license: NASA informational content; cite NASA and do not imply endorsement.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Exact source URL verified in the 2026 Resources tab with browser certificate validation enabled.
- Relevant equipment: Kepler Space Telescope (kepler)

### Kepler | NSSDCA Master Catalog

- Registry ID: `deep-nssdc-kepler`
- Original URL: https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2009-011A
- Organization / creator: NASA Space Science Data Coordinated Archive
- Resource type: Mission record
- Information provided: Spacecraft description, heliocentric orbit, UTC launch date, science operations, and mission profile.
- Actual application use: Drives Kepler dates, engineering explanation, trajectory wording, and no-surface-location handling.
- Conditions / license: United States government scientific record; cite NASA/NSSDCA.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Kepler Space Telescope (kepler)

### NASA Retires Kepler Space Telescope, Passes Planet-Hunting Torch

- Registry ID: `deep-nasa-kepler-retirement`
- Original URL: https://www.nasa.gov/news-release/nasa-retires-kepler-space-telescope-passes-planet-hunting-torch/
- Organization / creator: NASA
- Resource type: Science & history
- Information provided: Formal retirement announcement, fuel context, discovery count, and scientific legacy.
- Actual application use: Supports the 30 October 2018 retirement date, status, and exoplanet count.
- Conditions / license: NASA informational content; cite NASA and do not imply endorsement.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Kepler Space Telescope (kepler)

### NASA's Kepler Space Telescope Gets Its Final Commands

- Registry ID: `deep-nasa-kepler-final`
- Original URL: https://www.nasa.gov/wp-json/wp/v2/migration/129214?_fields=date,link,title,content
- Organization / creator: NASA
- Resource type: Science & history
- Information provided: Preserved NASA article documenting the final shutdown commands received on 15 November 2018.
- Actual application use: Separates retirement announcement from final deactivation commands in the timeline.
- Conditions / license: NASA informational content delivered through the public NASA API; cite NASA and do not imply endorsement.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Kepler Space Telescope (kepler)

### KSC-2009-1124 | Kepler Solar Array Test

- Registry ID: `image-kepler`
- Original URL: https://images.nasa.gov/details/KSC-2009-1124
- Organization / creator: NASA / Kim Shiflett
- Resource type: Image archive
- Information provided: Authentic NASA photograph of Kepler during prelaunch solar-array illumination testing at Cape Canaveral.
- Actual application use: Primary Kepler profile photograph with a prelaunch-test caption.
- Conditions / license: NASA educational and informational media-use guidance applies. Preserve the stated NASA/JPL or photographer credit; do not imply endorsement. Check the original record for third-party rights.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Kepler Space Telescope (kepler)

### Apollo 17 sample collection | NASA Image and Video Library

- Registry ID: `image-hero`
- Original URL: https://images.nasa.gov/details/as17-134-20425
- Organization / creator: NASA / Eugene Cernan
- Resource type: Image archive
- Information provided: Harrison Schmitt collecting samples during Apollo 17, 11 December 1972. Historical mission context, not an image of the Apollo 11 site.
- Actual application use: Locally stored cinematic landing-page hero with a visible archive credit.
- Conditions / license: NASA educational and informational media-use guidance; preserve NASA/JPL/USGS or photographer credits. No endorsement implied. Original scientific processing and editorial cropping are not AI generation.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Site-wide imagery, design, tooling, or policy as described above.

### Galileo Moon image | NASA Image and Video Library

- Registry ID: `image-moon`
- Original URL: https://images.nasa.gov/details/PIA00405
- Organization / creator: NASA / JPL / USGS
- Resource type: Image archive
- Information provided: The Moon seen by Galileo, 7 December 1992. PIA00405.
- Actual application use: Locally stored destination imagery. The atlas does not use these photographs as a georeferenced basemap.
- Conditions / license: NASA educational and informational media-use guidance; preserve NASA/JPL/USGS or photographer credits. No endorsement implied. Original scientific processing and editorial cropping are not AI generation.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Site-wide imagery, design, tooling, or policy as described above.

### Viking global Mars mosaic | NASA Image and Video Library

- Registry ID: `image-mars`
- Original URL: https://images.nasa.gov/details/PIA00407
- Organization / creator: NASA / JPL / USGS
- Resource type: Image archive
- Information provided: Global color view of Mars from Viking imagery. PIA00407. A photo mosaic, not a live view.
- Actual application use: Locally stored destination imagery. The atlas does not use these photographs as a georeferenced basemap.
- Conditions / license: NASA educational and informational media-use guidance; preserve NASA/JPL/USGS or photographer credits. No endorsement implied. Original scientific processing and editorial cropping are not AI generation.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Site-wide imagery, design, tooling, or policy as described above.

### Apollo 17 rover fender repair | NASA Image and Video Library

- Registry ID: `image-learning`
- Original URL: https://images.nasa.gov/details/as17-137-20979
- Organization / creator: NASA / Eugene Cernan
- Resource type: Image archive
- Information provided: Apollo 17 rover with a fender repaired using lunar maps and clamps, 12 December 1972. This is Apollo 17 hardware, not the Apollo 15 rover in the collection.
- Actual application use: Learning section context image and an evidence-backed engineering fact.
- Conditions / license: NASA educational and informational media-use guidance; preserve NASA/JPL/USGS or photographer credits. No endorsement implied. Original scientific processing and editorial cropping are not AI generation.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Site-wide imagery, design, tooling, or policy as described above.

### NASA Images and Media Usage Guidelines

- Registry ID: `policy-nasa-media`
- Original URL: https://www.nasa.gov/nasa-brand-center/images-and-media/
- Organization / creator: NASA
- Resource type: Policy
- Information provided: Educational use, credits, third-party rights, generated content, and endorsement guidance.
- Actual application use: Guides selection and crediting of authentic archive media. Credit does not replace third-party permission.
- Conditions / license: Policy reference, not a blanket license for third-party content.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Site-wide imagery, design, tooling, or policy as described above.

### NASA Brand Guidelines

- Registry ID: `policy-nasa-brand`
- Original URL: https://www.nasa.gov/nasa-brand-center/brand-guidelines/
- Organization / creator: NASA
- Resource type: Policy
- Information provided: Restrictions on NASA insignia, logotypes, and implied endorsement.
- Actual application use: No NASA insignia, mission patches, or NASA Data Insignia are used as project branding. Insignia incidentally present in authentic historical photographs are not generated.
- Conditions / license: Branding rights are reserved; ordinary NASA image use does not grant branding permission.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Site-wide imagery, design, tooling, or policy as described above.

### Svelte 5

- Registry ID: `software-svelte`
- Original URL: https://svelte.dev/
- Organization / creator: Svelte contributors
- Resource type: Software
- Information provided: Application or development tooling, not scientific evidence.
- Actual application use: Reactive components, accessible interactions, and compiled user interface.
- Conditions / license: MIT
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Site-wide imagery, design, tooling, or policy as described above.

### SvelteKit 2, adapter-static, vite-plugin-svelte, svelte-check

- Registry ID: `software-sveltekit`
- Original URL: https://svelte.dev/docs/kit/introduction
- Organization / creator: Svelte contributors
- Resource type: Software
- Information provided: Application or development tooling, not scientific evidence.
- Actual application use: Routing, prerendering, static deployment, compiler integration, and type checks.
- Conditions / license: MIT
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Site-wide imagery, design, tooling, or policy as described above.

### Tailwind CSS and @tailwindcss/vite

- Registry ID: `software-tailwind`
- Original URL: https://tailwindcss.com/
- Organization / creator: Tailwind Labs
- Resource type: Software
- Information provided: Application or development tooling, not scientific evidence.
- Actual application use: CSS foundation, theme tokens, responsive styling, and build integration.
- Conditions / license: MIT
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Site-wide imagery, design, tooling, or policy as described above.

### D3 Geo

- Registry ID: `software-d3`
- Original URL: https://d3js.org/d3-geo
- Organization / creator: Mike Bostock and D3 contributors
- Resource type: Software
- Information provided: Application or development tooling, not scientific evidence.
- Actual application use: Orthographic planetary-coordinate projections and graticules. No Earth basemap or invented planetary surface data.
- Conditions / license: ISC
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Site-wide imagery, design, tooling, or policy as described above.

### Lucide (@lucide/svelte)

- Registry ID: `software-lucide`
- Original URL: https://lucide.dev/license
- Organization / creator: Lucide contributors
- Resource type: Software
- Information provided: Application or development tooling, not scientific evidence.
- Actual application use: Interface icons and the independent museum orbit symbol. Not NASA branding.
- Conditions / license: ISC; some inherited Feather icons are MIT
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Site-wide imagery, design, tooling, or policy as described above.

### Inter Variable via Fontsource

- Registry ID: `font-inter`
- Original URL: https://fontsource.org/fonts/inter
- Organization / creator: Rasmus Andersson; Fontsource distributors
- Resource type: Font
- Information provided: Openly licensed font files.
- Actual application use: Locally served body and interface typography; no Google Fonts runtime requests.
- Conditions / license: SIL Open Font License 1.1; Fontsource packaging MIT
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Site-wide imagery, design, tooling, or policy as described above.

### Space Grotesk Variable via Fontsource

- Registry ID: `font-space-grotesk`
- Original URL: https://fontsource.org/fonts/space-grotesk
- Organization / creator: Florian Karsten; Fontsource distributors
- Resource type: Font
- Information provided: Openly licensed font files.
- Actual application use: Locally served editorial headings and numerical labels.
- Conditions / license: SIL Open Font License 1.1; Fontsource packaging MIT
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Site-wide imagery, design, tooling, or policy as described above.

### TypeScript

- Registry ID: `software-typescript`
- Original URL: https://www.typescriptlang.org/
- Organization / creator: Microsoft and TypeScript contributors
- Resource type: Software
- Information provided: Application or development tooling, not scientific evidence.
- Actual application use: Typed records, field-level provenance, and application validation.
- Conditions / license: Apache-2.0
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Site-wide imagery, design, tooling, or policy as described above.

### Vite

- Registry ID: `software-vite`
- Original URL: https://vite.dev/
- Organization / creator: Vite contributors
- Resource type: Software
- Information provided: Application or development tooling, not scientific evidence.
- Actual application use: Local development and production bundling. Dev server binds to localhost.
- Conditions / license: MIT
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Site-wide imagery, design, tooling, or policy as described above.

### Playwright Test

- Registry ID: `software-playwright`
- Original URL: https://playwright.dev/
- Organization / creator: Microsoft and Playwright contributors
- Resource type: Software
- Information provided: Application or development tooling, not scientific evidence.
- Actual application use: Browser tests for navigation, filters, profiles, atlas, timeline, learning, accessibility, and mobile viewports.
- Conditions / license: Apache-2.0
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Site-wide imagery, design, tooling, or policy as described above.

### Node.js and npm

- Registry ID: `software-node`
- Original URL: https://nodejs.org/
- Organization / creator: OpenJS Foundation and npm contributors
- Resource type: Software
- Information provided: Application or development tooling, not scientific evidence.
- Actual application use: Build runtime, native unit tests, package resolution, link checks, and reproducible archive downloads.
- Conditions / license: Node.js MIT with bundled third-party notices; npm Artistic-2.0
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Site-wide imagery, design, tooling, or policy as described above.

### Prettier and prettier-plugin-svelte

- Registry ID: `software-prettier`
- Original URL: https://prettier.io/
- Organization / creator: Prettier and Svelte plugin contributors
- Resource type: Software
- Information provided: Application or development tooling, not scientific evidence.
- Actual application use: Consistent code formatting.
- Conditions / license: MIT
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Site-wide imagery, design, tooling, or policy as described above.

### @types/node and @types/d3-geo

- Registry ID: `software-types`
- Original URL: https://github.com/DefinitelyTyped/DefinitelyTyped
- Organization / creator: DefinitelyTyped contributors
- Resource type: Software
- Information provided: Application or development tooling, not scientific evidence.
- Actual application use: Development-only TypeScript declarations.
- Conditions / license: MIT
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Site-wide imagery, design, tooling, or policy as described above.

### Kilo Code AI assistant

- Registry ID: `tool-kilo`
- Original URL: https://kilo.ai/
- Organization / creator: Kilo; model reported as gpt-6-astra (agent_router12/gpt-6-astra)
- Resource type: Software
- Information provided: Application or development tooling, not scientific evidence.
- Actual application use: AI-assisted research retrieval, source curation, explanatory writing, architecture, code, and tests. No AI-generated image, video, or audio assets.
- Conditions / license: Tool use subject to provider terms; not a license for referenced NASA or third-party assets.
- Review status: Verified; 2026-11-15. AI-assisted source review, not a claim of NASA endorsement or human peer review.
- Organizer list: Supplementary resource or implementation tool; no exact link match in the verified organizer list.
- Relevant equipment: Site-wide imagery, design, tooling, or policy as described above.

## Attribution and Rights

NASA credit does not automatically clear third-party copyrights, personality/publicity rights, or trademarks. Preserve each image credit and check its own archive entry together with NASA/JPL usage guidance. We do not use NASA logos, flags, mission patches, or the NASA Data Insignia as project branding. Official insignia may appear incidentally in authentic historical photographs; these photographs are not AI-generated reconstructions.

Fonts and photographs are served locally. Lucide supplies interface icons. Exact package versions and the complete transitive dependency graph are recorded in package-lock.json; dependency licenses remain in their distributed packages.

## Submission References

Transfer the applicable verified NASA resources and specific uses into the official NASA Data field. Put institutional image partners, libraries, fonts, and other tools in Space Agency and Other Data / References as applicable. List Kilo Code and the model in AI/SI Tools Used. Recheck the current rules and complete a human factual/rights review before marking the submission ready. Overall award eligibility is not asserted.
