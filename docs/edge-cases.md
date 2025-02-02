# Edge cases

This document exists to record down the weird edge cases I see foresee occuring, and how our data model can handle those cases.

## Expresses

🔴 Solution required for Day 1

This problems occurs in several sitations:

- Frankston line trains not running between South Yarra and Caulfield, while the Pakenham/Cranbourne lines continue to run.
- No Werribee line trains running via the Altona Loop, but still continuing to run via the express tracks from Newport to Laverton.
- Regional trains continuing to run in suburban areas while the suburban line is disrupted.

**Solution:** We will need a disruption type for "All trains running express between X and Y", which is filtered out (or displayed less prominently) unless the commute starts/ends at one of these stations.

## Albury Line

🔴 Solution required for Day 1

The Albury line is standard gauge, unlike the rest of the Victorian passenger network, which is broad gauge, meaning it runs on a completely independent line to trains to Seymour and Shepparton.

(The map actually lies, Albury line trains depart Southern Cross and head towards Sunshine, before diverging near Albion and meeting up with the Craigieburn and Seymour lines near Jacana!)

This all means a disruption to the Seymour line will not necessary impact the Albury line and vice-versa.

If only the Albury line was affected (e.g. from Broadmeadows to Southern Cross), passengers could make use of the Craigieburn/Seymour line to connect to Albury services, but the other way around isn't feasible given the relatively few Albury trains timetabled each day.

**Solution:** We need a way to show partial suspensions/bus replacements. Likely with a way to display custom text. Ideally the map would show a dotted line or something to indicate a partial disruption.

## Branching lines

🔴 Solution required for Day 1

If buses replace all trains beyond Ballarat, there's no way to fit that into a "between X and Y" sentence. It would be between "Ballarat, Ararat, **_and_** Maryborough". How should we represent that?

**Solution:** As two separate disruptions? One for Ballarat to Ararat, and another for Ballarat to Maryborough? 😢

## The Metro Tunnel

🟠 Solution required relatively soon

The Metro Tunnel opens sometime in 2025, and will change the route of the Pakenham, Cranbourne, and Sunbury lines, as well as the Frankston line (sent back into the City Loop).

**Solution:** Either the Metro Tunnel lines should switch to simple routes that originate/terminate at Town Hall, or we treat the whole tunnel as a single block (i.e. "the city" like we do with the City Loop). This decision might depend on how Metro/PTV communicates disruptions.

The single block solution shouldn't be an issue, because I think it's very unlikely trains ever turn back once inside the Metro Tunnel. (They'd have to reverse out the way they came.)

## Set-down-only trains

🟡 May impact future features

Similarly to the express edge cases listed above, if a suburban line which parallels a regional line is disrupted, but the regional trains continue to run, we need to be clever about handling set-down-only trains.

For example, if Sunbury line trains are not running from Sunshine to the city, Sunbury line passengers will likely need to catch buses to complete their journey, even if V/Line trains continue to run, since suburban passengers are not allowed to board V/Line trains at Sunshine.

**Solution:** If we handle commutes across lines in the future (i.e. we don't require people to select two stations on the same line), our route finding algorithm will need to know when regional trains are off the table.

## North Melbourne regional lines split

🟡 Low impact

Every section on the `<Map>` can be uniquely identified by a pair of station IDs and a line group... except for Southern Cross to North Melbourne, where the regional line splits _before_ reaching North Melbourne! How can we identify one line without the other.

If this problem doesn't have a neat solution, it won't be so bad if the highlight doesn't handle the split perfectly correctly I guess!

**Solution:** TBD?

## Interchanging at Burnley

🟢 Non-issue

Belgrave/Lilydale Line trains often run express through Burnley. If Glen Waverley line trains are not running between Burnley and the city, transferring to any old Belgrave/Lilydale line train will not work.

I can't forsee any situation where a stops-all-stations train wouldn't also be running on the Belgrave/Lilydale lines, so classifying this one as a non-issue. (Just noting down in case I forget my logic for ignoring it.)

## Completely unforeseen situation

🔴 Solution required for Day 1

Try as we may, I'm confident PTV will come up with something we never thought possible. When that happens we won't have a predefined disruption category to sort it into, and yet our site should still be capable of displaying it.

**Solution:** At the end of the day, all disruption types will input into a few different subsystems, e.g. the map highlighting, status text for the line, the list of affected commutes, squares filled in on a calendar, etc.

There should be a disruption type (call it "custom"?) that allows us to just set these inputs directly, i.e. the admin manually types the name of the disruption, selects areas on the map to highlight, etc.

Hopefully we won't need to use it too often!
