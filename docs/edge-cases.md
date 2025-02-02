# Edge cases

This document exists to record down the weird edge cases I see foresee occuring, and how our data model can handle those cases.

## The Metro Tunnel

🟡 Matters

The Metro Tunnel opens sometime in 2025, and will change the route of the Pakenham, Cranbourne, Sunbury, and Frankston lines.

**Solution:** Either the Metro Tunnel lines should switch to simple routes that originate/terminate at Town Hall, or we treat the whole tunnel as a single block (i.e. "the city" like we do with the City Loop). This decision might depend on how Metro/PTV communicates disruptions.

## Expresses

🟡 Matters

This problems occurs in several sitations:

- Frankston line trains not running between South Yarra and Caulfield, while the Pakenham/Cranbourne lines continue to run.
- No Werribee line trains running via the Altona Loop, but still continuing to run via the express tracks from Newport to Laverton.
- Regional trains continuing to run in suburban areas while the suburban line is disruptioned.

**Solution:** We will need a disruption type for "All trains running express between X and Y", which is filtered out (or displayed less prominently) unless the commute starts/ends at one of these stations.

## Set-down-only trains

🟡 Matters

Similarly to the express edge cases listed above, if a suburban line which parallels a regional line is disruption, but the regional trains continue to run, we need to be clever about handling set-down-only trains.

For example, if Sunbury line trains are not running from Sunshine to the city, Sunbury line passengers will likely need to catch buses to complete their journey, even if V/Line trains continue to run, since suburban passengers are not allowed to board V/Line trains at Sunshine.

**Solution:** Commutes on the Sunbury line will need to ignore the possibility of interchanging to regional lines in cases like this.

## Albury Line

🟡 Matters

The Albury line is standard gauge, unlike the rest of the Victorian passenger network, which is broad gauge, meaning it runs on a completely independent line to trains to Seymour and Shepparton.

(The map actually lies, Albury line trains depart Southern Cross and head towards Sunshine, before diverging near Albion and meeting up with the Craigieburn and Seymour lines near Jacana!)

This all means a disruption to the Seymour line will not necessary impact the Albury line and vice-versa.

If only the Albury line was affected (e.g. from Broadmeadows to Southern Cross), passengers could make use of the Craigieburn/Seymour line to connect to Albury services, but the other way around isn't feasible given the relatively few Albury trains timetabled each day.

**Solution:** We need a way to show partial suspensions/bus replacements. Likely with a way to display custom text. Ideally the map would show a dotted line or something to indicate a partial disruption.

## Burnley Interchanges

🟢 Not an issue

Belgrave/Lilydale Line trains often run express through Burnley. If Glen Waverley line trains are not running between Burnley and the city, transferring to any old Belgrave/Lilydale line train will not work.

Low impact because I can't forsee any situation where a stops-all-stations train wouldn't also be running on the Belgrave/Lilydale lines. Just noting down in case I forget my logic for ignoring it.
