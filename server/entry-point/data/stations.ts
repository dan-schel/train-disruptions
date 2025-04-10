import { MapPoint } from "@/server/data/map-point";
import { Station } from "@/server/data/station/station";
import { StationCollection } from "@/server/data/station/station-collection";
import * as corridor from "@/server/entry-point/data/corridors";
import * as node from "@/shared/map-node-ids";
import * as station from "@/shared/station-ids";

const data = [
  new Station({
    id: station.AIRCRAFT,
    name: "Aircraft",
    ptvIds: [1220],
    mapLocation: corridor.lavertonToWerribee.pointAt(1, 4),
  }),
  new Station({
    id: station.ALAMEIN,
    name: "Alamein",
    ptvIds: [1002],
    mapLocation: MapPoint.at(node.BURNLEY.ALAMEIN),
  }),
  new Station({
    id: station.ALBION,
    name: "Albion",
    ptvIds: [1003],
    mapLocation: corridor.sunshineToWatergardens.pointAt(1, 5),
  }),
  new Station({
    id: station.ALBURY,
    name: "Albury",
    ptvIds: [1500],
    mapLocation: MapPoint.at(node.REGIONAL_WESTERN.ALBURY),
  }),
  new Station({
    id: station.ALPHINGTON,
    name: "Alphington",
    ptvIds: [1004],
    mapLocation: corridor.cliftonHillToHurstbridge.pointAt(4, 17),
  }),
  new Station({
    id: station.ALTONA,
    name: "Altona",
    ptvIds: [1005],
    mapLocation: corridor.newportToLavertonLoop.pointAt(2, 4),
  }),
  new Station({
    id: station.ANSTEY,
    name: "Anstey",
    ptvIds: [1006],
    mapLocation: corridor.northMelbourneToUpfield.pointAt(6, 13),
  }),
  new Station({
    id: station.ARARAT,
    name: "Ararat",
    ptvIds: [1501],
    mapLocation: MapPoint.at(node.REGIONAL_WESTERN.ARARAT),
  }),
  new Station({
    id: station.ARDEER,
    name: "Ardeer",
    ptvIds: [1007],
    mapLocation: corridor.sunshineToDeerPark.pointAt(1, 2),
  }),
  new Station({
    id: station.ARMADALE,
    name: "Armadale",
    ptvIds: [1008],
    mapLocation: corridor.southYarraToCaulfield.pointAt(3, 5),
  }),
  new Station({
    id: station.ASCOT_VALE,
    name: "Ascot Vale",
    ptvIds: [1009],
    mapLocation: corridor.northMelbourneToBroadmeadows.pointAt(3, 12),
  }),
  new Station({
    id: station.ASHBURTON,
    name: "Ashburton",
    ptvIds: [1010],
    mapLocation: corridor.camberwellToAlamein.pointAt(5, 6),
  }),
  new Station({ id: station.ASPENDALE, name: "Aspendale", ptvIds: [1011] }),
  new Station({ id: station.AUBURN, name: "Auburn", ptvIds: [1012] }),
  new Station({ id: station.AVENEL, name: "Avenel", ptvIds: [1502] }),
  new Station({
    id: station.BACCHUS_MARSH,
    name: "Bacchus Marsh",
    ptvIds: [1503],
  }),
  new Station({ id: station.BAIRNSDALE, name: "Bairnsdale", ptvIds: [1504] }),
  new Station({ id: station.BALACLAVA, name: "Balaclava", ptvIds: [1013] }),
  new Station({ id: station.BALLAN, name: "Ballan", ptvIds: [1505] }),
  new Station({ id: station.BALLARAT, name: "Ballarat", ptvIds: [1506] }),
  new Station({
    id: station.BATMAN,
    name: "Batman",
    ptvIds: [1014],
    mapLocation: corridor.northMelbourneToUpfield.pointAt(9, 13),
  }),
  new Station({ id: station.BAXTER, name: "Baxter", ptvIds: [1015] }),
  new Station({ id: station.BAYSWATER, name: "Bayswater", ptvIds: [1016] }),
  new Station({
    id: station.BEACONSFIELD,
    name: "Beaconsfield",
    ptvIds: [1017],
  }),
  new Station({ id: station.BEAUFORT, name: "Beaufort", ptvIds: [1507] }),
  new Station({ id: station.BELGRAVE, name: "Belgrave", ptvIds: [1018] }),
  new Station({ id: station.BELL, name: "Bell", ptvIds: [1019] }),
  new Station({ id: station.BENALLA, name: "Benalla", ptvIds: [1508] }),
  new Station({ id: station.BENDIGO, name: "Bendigo", ptvIds: [1509] }),
  new Station({ id: station.BENTLEIGH, name: "Bentleigh", ptvIds: [1020] }),
  new Station({ id: station.BERWICK, name: "Berwick", ptvIds: [1021] }),
  new Station({ id: station.BIRREGURRA, name: "Birregurra", ptvIds: [1510] }),
  new Station({ id: station.BITTERN, name: "Bittern", ptvIds: [1022] }),
  new Station({ id: station.BLACKBURN, name: "Blackburn", ptvIds: [1023] }),
  new Station({ id: station.BONBEACH, name: "Bonbeach", ptvIds: [1024] }),
  new Station({ id: station.BORONIA, name: "Boronia", ptvIds: [1025] }),
  new Station({ id: station.BOX_HILL, name: "Box Hill", ptvIds: [1026] }),
  new Station({
    id: station.BRIGHTON_BEACH,
    name: "Brighton Beach",
    ptvIds: [1027],
  }),
  new Station({ id: station.BROADFORD, name: "Broadford", ptvIds: [1511] }),
  new Station({
    id: station.BROADMEADOWS,
    name: "Broadmeadows",
    ptvIds: [1028],
  }),
  new Station({
    id: station.BRUNSWICK,
    name: "Brunswick",
    ptvIds: [1029],
    mapLocation: corridor.northMelbourneToUpfield.pointAt(5, 13),
  }),
  new Station({ id: station.BUNYIP, name: "Bunyip", ptvIds: [1512] }),
  new Station({ id: station.BURNLEY, name: "Burnley", ptvIds: [1030] }),
  new Station({
    id: station.BURWOOD,
    name: "Burwood",
    ptvIds: [1031],
    mapLocation: corridor.camberwellToAlamein.pointAt(4, 6),
  }),
  new Station({ id: station.CAMBERWELL, name: "Camberwell", ptvIds: [1032] }),
  new Station({ id: station.CAMPERDOWN, name: "Camperdown", ptvIds: [1513] }),
  new Station({ id: station.CANTERBURY, name: "Canterbury", ptvIds: [1033] }),
  new Station({
    id: station.CARDINIA_ROAD,
    name: "Cardinia Road",
    ptvIds: [1223],
  }),
  new Station({ id: station.CARNEGIE, name: "Carnegie", ptvIds: [1034] }),
  new Station({
    id: station.CAROLINE_SPRINGS,
    name: "Caroline Springs",
    ptvIds: [1601],
  }),
  new Station({ id: station.CARRUM, name: "Carrum", ptvIds: [1035] }),
  new Station({ id: station.CASTLEMAINE, name: "Castlemaine", ptvIds: [1514] }),
  new Station({ id: station.CAULFIELD, name: "Caulfield", ptvIds: [1036] }),
  new Station({ id: station.CHATHAM, name: "Chatham", ptvIds: [1037] }),
  new Station({ id: station.CHELSEA, name: "Chelsea", ptvIds: [1038] }),
  new Station({ id: station.CHELTENHAM, name: "Cheltenham", ptvIds: [1039] }),
  new Station({ id: station.CHILTERN, name: "Chiltern", ptvIds: [1515] }),
  new Station({ id: station.CLARKEFIELD, name: "Clarkefield", ptvIds: [1516] }),
  new Station({ id: station.CLAYTON, name: "Clayton", ptvIds: [1040] }),
  new Station({
    id: station.CLIFTON_HILL,
    name: "Clifton Hill",
    ptvIds: [1041],
  }),
  new Station({ id: station.CLUNES, name: "Clunes", ptvIds: [1591] }),
  new Station({ id: station.COBBLEBANK, name: "Cobblebank", ptvIds: [1605] }),
  new Station({
    id: station.COBURG,
    name: "Coburg",
    ptvIds: [1042],
    mapLocation: corridor.northMelbourneToUpfield.pointAt(8, 13),
  }),
  new Station({ id: station.COLAC, name: "Colac", ptvIds: [1517] }),
  new Station({ id: station.COLLINGWOOD, name: "Collingwood", ptvIds: [1043] }),
  new Station({ id: station.COOLAROO, name: "Coolaroo", ptvIds: [1221] }),
  new Station({ id: station.CORIO, name: "Corio", ptvIds: [1518] }),
  new Station({ id: station.CRAIGIEBURN, name: "Craigieburn", ptvIds: [1044] }),
  new Station({ id: station.CRANBOURNE, name: "Cranbourne", ptvIds: [1045] }),
  new Station({ id: station.CRESWICK, name: "Creswick", ptvIds: [1590] }),
  new Station({ id: station.CRIB_POINT, name: "Crib Point", ptvIds: [1046] }),
  new Station({ id: station.CROXTON, name: "Croxton", ptvIds: [1047] }),
  new Station({ id: station.CROYDON, name: "Croydon", ptvIds: [1048] }),
  new Station({ id: station.DANDENONG, name: "Dandenong", ptvIds: [1049] }),
  new Station({
    id: station.DAREBIN,
    name: "Darebin",
    ptvIds: [1050],
    mapLocation: corridor.cliftonHillToHurstbridge.pointAt(5, 17),
  }),
  new Station({ id: station.DARLING, name: "Darling", ptvIds: [1051] }),
  new Station({ id: station.DEER_PARK, name: "Deer Park", ptvIds: [1052] }),
  new Station({
    id: station.DENNIS,
    name: "Dennis",
    ptvIds: [1053],
    mapLocation: corridor.cliftonHillToHurstbridge.pointAt(2, 17),
  }),
  new Station({
    id: station.DIAMOND_CREEK,
    name: "Diamond Creek",
    ptvIds: [1054],
    mapLocation: corridor.cliftonHillToHurstbridge.pointAt(15, 17),
  }),
  new Station({
    id: station.DIGGERS_REST,
    name: "Diggers Rest",
    ptvIds: [1055],
  }),
  new Station({ id: station.DINGEE, name: "Dingee", ptvIds: [1519] }),
  new Station({ id: station.DONNYBROOK, name: "Donnybrook", ptvIds: [1520] }),
  new Station({ id: station.DROUIN, name: "Drouin", ptvIds: [1521] }),
  new Station({
    id: station.EAGLEHAWK,
    name: "Eaglehawk",
    ptvIds: [1522],
  }),
  new Station({
    id: station.EAGLEMONT,
    name: "Eaglemont",
    ptvIds: [1056],
    mapLocation: corridor.cliftonHillToHurstbridge.pointAt(7, 17),
  }),
  new Station({
    id: station.EAST_CAMBERWELL,
    name: "East Camberwell",
    ptvIds: [1057],
  }),
  new Station({
    id: station.EAST_MALVERN,
    name: "East Malvern",
    ptvIds: [1058],
  }),
  new Station({
    id: station.EAST_RICHMOND,
    name: "East Richmond",
    ptvIds: [1059],
  }),
  new Station({ id: station.ECHUCA, name: "Echuca", ptvIds: [1523] }),
  new Station({ id: station.EDITHVALE, name: "Edithvale", ptvIds: [1060] }),
  new Station({ id: station.ELMORE, name: "Elmore", ptvIds: [1524] }),
  new Station({ id: station.ELSTERNWICK, name: "Elsternwick", ptvIds: [1061] }),
  new Station({
    id: station.ELTHAM,
    name: "Eltham",
    ptvIds: [1062],
    mapLocation: corridor.cliftonHillToHurstbridge.pointAt(14, 17),
  }),
  new Station({ id: station.EPPING, name: "Epping", ptvIds: [1063] }),
  new Station({ id: station.EPSOM, name: "Epsom", ptvIds: [1597] }),
  new Station({
    id: station.ESSENDON,
    name: "Essendon",
    ptvIds: [1064],
    mapLocation: corridor.northMelbourneToBroadmeadows.pointAt(5, 12),
  }),
  new Station({ id: station.EUROA, name: "Euroa", ptvIds: [1525] }),
  new Station({
    id: station.FAIRFIELD,
    name: "Fairfield",
    ptvIds: [1065],
    mapLocation: corridor.cliftonHillToHurstbridge.pointAt(3, 17),
  }),
  new Station({
    id: station.FAWKNER,
    name: "Fawkner",
    ptvIds: [1066],
    mapLocation: corridor.northMelbourneToUpfield.pointAt(11, 13),
  }),
  new Station({
    id: station.FERNTREE_GULLY,
    name: "Ferntree Gully",
    ptvIds: [1067],
  }),
  new Station({ id: station.FLAGSTAFF, name: "Flagstaff", ptvIds: [1068] }),
  new Station({
    id: station.FLEMINGTON_BRIDGE,
    name: "Flemington Bridge",
    ptvIds: [1069],
    mapLocation: corridor.northMelbourneToUpfield.pointAt(2, 13),
  }),
  new Station({
    id: station.FLEMINGTON_RACECOURSE,
    name: "Flemington Racecourse",
    ptvIds: [1070],
  }),
  new Station({
    id: station.FLINDERS_STREET,
    name: "Flinders Street",
    ptvIds: [1071],
  }),
  new Station({ id: station.FOOTSCRAY, name: "Footscray", ptvIds: [1072] }),
  new Station({ id: station.FRANKSTON, name: "Frankston", ptvIds: [1073] }),
  new Station({ id: station.GARDENVALE, name: "Gardenvale", ptvIds: [1074] }),
  new Station({ id: station.GARDINER, name: "Gardiner", ptvIds: [1075] }),
  new Station({ id: station.GARFIELD, name: "Garfield", ptvIds: [1526] }),
  new Station({ id: station.GEELONG, name: "Geelong", ptvIds: [1527] }),
  new Station({
    id: station.GINIFER,
    name: "Ginifer",
    ptvIds: [1076],
    mapLocation: corridor.sunshineToWatergardens.pointAt(2, 5),
  }),
  new Station({ id: station.GISBORNE, name: "Gisborne", ptvIds: [1528] }),
  new Station({ id: station.GLEN_IRIS, name: "Glen Iris", ptvIds: [1077] }),
  new Station({
    id: station.GLEN_WAVERLEY,
    name: "Glen Waverley",
    ptvIds: [1078],
  }),
  new Station({
    id: station.GLENBERVIE,
    name: "Glenbervie",
    ptvIds: [1079],
    mapLocation: corridor.northMelbourneToBroadmeadows.pointAt(6, 12),
  }),
  new Station({ id: station.GLENFERRIE, name: "Glenferrie", ptvIds: [1080] }),
  new Station({ id: station.GLEN_HUNTLY, name: "Glen Huntly", ptvIds: [1081] }),
  new Station({
    id: station.GLENROY,
    name: "Glenroy",
    ptvIds: [1082],
    mapLocation: corridor.northMelbourneToBroadmeadows.pointAt(10, 12),
  }),
  new Station({ id: station.GOORNONG, name: "Goornong", ptvIds: [1616] }),
  new Station({
    id: station.GOWRIE,
    name: "Gowrie",
    ptvIds: [1083],
    mapLocation: corridor.northMelbourneToUpfield.pointAt(12, 13),
  }),
  new Station({
    id: station.GREENSBOROUGH,
    name: "Greensborough",
    ptvIds: [1084],
    mapLocation: corridor.cliftonHillToHurstbridge.pointAt(12, 17),
  }),
  new Station({ id: station.HALLAM, name: "Hallam", ptvIds: [1085] }),
  new Station({ id: station.HAMPTON, name: "Hampton", ptvIds: [1086] }),
  new Station({
    id: station.HARTWELL,
    name: "Hartwell",
    ptvIds: [1087],
    mapLocation: corridor.camberwellToAlamein.pointAt(3, 6),
  }),
  new Station({ id: station.HASTINGS, name: "Hastings", ptvIds: [1088] }),
  new Station({
    id: station.HAWKSBURN,
    name: "Hawksburn",
    ptvIds: [1089],
    mapLocation: corridor.southYarraToCaulfield.pointAt(1, 5),
  }),
  new Station({ id: station.HAWKSTOWE, name: "Hawkstowe", ptvIds: [1227] }),
  new Station({ id: station.HAWTHORN, name: "Hawthorn", ptvIds: [1090] }),
  new Station({
    id: station.HEATHCOTE_JUNCTION,
    name: "Heathcote Junction",
    ptvIds: [1529],
  }),
  new Station({ id: station.HEATHERDALE, name: "Heatherdale", ptvIds: [1091] }),
  new Station({ id: station.HEATHMONT, name: "Heathmont", ptvIds: [1092] }),
  new Station({
    id: station.HEIDELBERG,
    name: "Heidelberg",
    ptvIds: [1093],
    mapLocation: corridor.cliftonHillToHurstbridge.pointAt(8, 17),
  }),
  new Station({ id: station.HEYINGTON, name: "Heyington", ptvIds: [1094] }),
  new Station({ id: station.HIGHETT, name: "Highett", ptvIds: [1095] }),
  new Station({ id: station.HOLMESGLEN, name: "Holmesglen", ptvIds: [1096] }),
  new Station({
    id: station.HOPPERS_CROSSING,
    name: "Hoppers Crossing",
    ptvIds: [1097],
    mapLocation: corridor.lavertonToWerribee.pointAt(3, 4),
  }),
  new Station({ id: station.HUGHESDALE, name: "Hughesdale", ptvIds: [1098] }),
  new Station({ id: station.HUNTINGDALE, name: "Huntingdale", ptvIds: [1099] }),
  new Station({ id: station.HURSTBRIDGE, name: "Hurstbridge", ptvIds: [1100] }),
  new Station({
    id: station.IVANHOE,
    name: "Ivanhoe",
    ptvIds: [1101],
    mapLocation: corridor.cliftonHillToHurstbridge.pointAt(6, 17),
  }),
  new Station({
    id: station.JACANA,
    name: "Jacana",
    ptvIds: [1102],
    mapLocation: corridor.northMelbourneToBroadmeadows.pointAt(11, 12),
  }),
  new Station({
    id: station.JEWELL,
    name: "Jewell",
    ptvIds: [1103],
    mapLocation: corridor.northMelbourneToUpfield.pointAt(4, 13),
  }),
  new Station({ id: station.JOLIMONT, name: "Jolimont", ptvIds: [1104] }),
  new Station({ id: station.JORDANVILLE, name: "Jordanville", ptvIds: [1105] }),
  new Station({ id: station.KANANOOK, name: "Kananook", ptvIds: [1106] }),
  new Station({
    id: station.KANGAROO_FLAT,
    name: "Kangaroo Flat",
    ptvIds: [1530],
  }),
  new Station({
    id: station.KEILOR_PLAINS,
    name: "Keilor Plains",
    ptvIds: [1107],
    mapLocation: corridor.sunshineToWatergardens.pointAt(4, 5),
  }),
  new Station({
    id: station.KENSINGTON,
    name: "Kensington",
    ptvIds: [1108],
    mapLocation: corridor.northMelbourneToBroadmeadows.pointAt(1, 12),
  }),
  new Station({ id: station.KEON_PARK, name: "Keon Park", ptvIds: [1109] }),
  new Station({ id: station.KERANG, name: "Kerang", ptvIds: [1531] }),
  new Station({
    id: station.KILMORE_EAST,
    name: "Kilmore East",
    ptvIds: [1532],
  }),
  new Station({ id: station.KOOYONG, name: "Kooyong", ptvIds: [1110] }),
  new Station({ id: station.KYNETON, name: "Kyneton", ptvIds: [1533] }),
  new Station({ id: station.LABURNUM, name: "Laburnum", ptvIds: [1111] }),
  new Station({ id: station.LALOR, name: "Lalor", ptvIds: [1112] }),
  new Station({ id: station.LARA, name: "Lara", ptvIds: [1534] }),
  new Station({ id: station.LAVERTON, name: "Laverton", ptvIds: [1113] }),
  new Station({ id: station.LEAWARRA, name: "Leawarra", ptvIds: [1114] }),
  new Station({ id: station.LILYDALE, name: "Lilydale", ptvIds: [1115] }),
  new Station({
    id: station.LITTLE_RIVER,
    name: "Little River",
    ptvIds: [1535],
  }),
  new Station({ id: station.LONGWARRY, name: "Longwarry", ptvIds: [1536] }),
  new Station({ id: station.LYNBROOK, name: "Lynbrook", ptvIds: [1222] }),
  new Station({
    id: station.MACAULAY,
    name: "Macaulay",
    ptvIds: [1116],
    mapLocation: corridor.northMelbourneToUpfield.pointAt(1, 13),
  }),
  new Station({ id: station.MACEDON, name: "Macedon", ptvIds: [1537] }),
  new Station({
    id: station.MACLEOD,
    name: "Macleod",
    ptvIds: [1117],
    mapLocation: corridor.cliftonHillToHurstbridge.pointAt(10, 17),
  }),
  new Station({ id: station.MALMSBURY, name: "Malmsbury", ptvIds: [1538] }),
  new Station({
    id: station.MALVERN,
    name: "Malvern",
    ptvIds: [1118],
    mapLocation: corridor.southYarraToCaulfield.pointAt(4, 5),
  }),
  new Station({ id: station.MARSHALL, name: "Marshall", ptvIds: [1539] }),
  new Station({ id: station.MARYBOROUGH, name: "Maryborough", ptvIds: [1592] }),
  new Station({ id: station.MCKINNON, name: "McKinnon", ptvIds: [1119] }),
  new Station({
    id: station.MELBOURNE_CENTRAL,
    name: "Melbourne Central",
    ptvIds: [1120],
  }),
  new Station({ id: station.MELTON, name: "Melton", ptvIds: [1121] }),
  new Station({ id: station.MENTONE, name: "Mentone", ptvIds: [1122] }),
  new Station({
    id: station.MERINDA_PARK,
    name: "Merinda Park",
    ptvIds: [1123],
  }),
  new Station({
    id: station.MERLYNSTON,
    name: "Merlynston",
    ptvIds: [1124],
    mapLocation: corridor.northMelbourneToUpfield.pointAt(10, 13),
  }),
  new Station({ id: station.MERNDA, name: "Mernda", ptvIds: [1228] }),
  new Station({ id: station.MERRI, name: "Merri", ptvIds: [1125] }),
  new Station({
    id: station.MIDDLE_BRIGHTON,
    name: "Middle Brighton",
    ptvIds: [1126],
  }),
  new Station({
    id: station.MIDDLE_FOOTSCRAY,
    name: "Middle Footscray",
    ptvIds: [1127],
  }),
  new Station({
    id: station.MIDDLE_GORGE,
    name: "Middle Gorge",
    ptvIds: [1226],
  }),
  new Station({ id: station.MITCHAM, name: "Mitcham", ptvIds: [1128] }),
  new Station({ id: station.MOE, name: "Moe", ptvIds: [1540] }),
  new Station({
    id: station.MONTMORENCY,
    name: "Montmorency",
    ptvIds: [1130],
    mapLocation: corridor.cliftonHillToHurstbridge.pointAt(13, 17),
  }),
  new Station({
    id: station.MOONEE_PONDS,
    name: "Moonee Ponds",
    ptvIds: [1131],
    mapLocation: corridor.northMelbourneToBroadmeadows.pointAt(4, 12),
  }),
  new Station({ id: station.MOORABBIN, name: "Moorabbin", ptvIds: [1132] }),
  new Station({ id: station.MOOROOLBARK, name: "Mooroolbark", ptvIds: [1133] }),
  new Station({ id: station.MOOROOPNA, name: "Mooroopna", ptvIds: [1541] }),
  new Station({ id: station.MORDIALLOC, name: "Mordialloc", ptvIds: [1134] }),
  new Station({
    id: station.MORELAND,
    name: "Moreland",
    ptvIds: [1135],
    mapLocation: corridor.northMelbourneToUpfield.pointAt(7, 13),
  }),
  new Station({ id: station.MORRADOO, name: "Morradoo", ptvIds: [1136] }),
  new Station({ id: station.MORWELL, name: "Morwell", ptvIds: [1542] }),
  new Station({
    id: station.MOUNT_WAVERLEY,
    name: "Mount Waverley",
    ptvIds: [1137],
  }),
  new Station({
    id: station.MURCHISON_EAST,
    name: "Murchison East",
    ptvIds: [1543],
  }),
  new Station({ id: station.MURRUMBEENA, name: "Murrumbeena", ptvIds: [1138] }),
  new Station({ id: station.NAGAMBIE, name: "Nagambie", ptvIds: [1544] }),
  new Station({
    id: station.NAR_NAR_GOON,
    name: "Nar Nar Goon",
    ptvIds: [1545],
  }),
  new Station({
    id: station.NARRE_WARREN,
    name: "Narre Warren",
    ptvIds: [1139],
  }),
  new Station({
    id: station.NEWMARKET,
    name: "Newmarket",
    ptvIds: [1140],
    mapLocation: corridor.northMelbourneToBroadmeadows.pointAt(2, 12),
  }),
  new Station({ id: station.NEWPORT, name: "Newport", ptvIds: [1141] }),
  new Station({ id: station.NOBLE_PARK, name: "Noble Park", ptvIds: [1142] }),
  new Station({
    id: station.NORTH_BRIGHTON,
    name: "North Brighton",
    ptvIds: [1143],
  }),
  new Station({
    id: station.NORTH_GEELONG,
    name: "North Geelong",
    ptvIds: [1546],
  }),
  new Station({
    id: station.NORTH_MELBOURNE,
    name: "North Melbourne",
    ptvIds: [1144],
  }),
  new Station({
    id: station.NORTH_RICHMOND,
    name: "North Richmond",
    ptvIds: [1145],
  }),
  new Station({ id: station.NORTH_SHORE, name: "North Shore", ptvIds: [1547] }),
  new Station({
    id: station.NORTH_WILLIAMSTOWN,
    name: "North Williamstown",
    ptvIds: [1146],
  }),
  new Station({ id: station.NORTHCOTE, name: "Northcote", ptvIds: [1147] }),
  new Station({ id: station.NUNAWADING, name: "Nunawading", ptvIds: [1148] }),
  new Station({
    id: station.OAK_PARK,
    name: "Oak Park",
    ptvIds: [1149],
    mapLocation: corridor.northMelbourneToBroadmeadows.pointAt(9, 12),
  }),
  new Station({ id: station.OAKLEIGH, name: "Oakleigh", ptvIds: [1150] }),
  new Station({ id: station.OFFICER, name: "Officer", ptvIds: [1151] }),
  new Station({ id: station.ORMOND, name: "Ormond", ptvIds: [1152] }),
  new Station({ id: station.PAKENHAM, name: "Pakenham", ptvIds: [1153] }),
  new Station({ id: station.PARKDALE, name: "Parkdale", ptvIds: [1154] }),
  new Station({ id: station.PARLIAMENT, name: "Parliament", ptvIds: [1155] }),
  new Station({
    id: station.PASCOE_VALE,
    name: "Pascoe Vale",
    ptvIds: [1156],
    mapLocation: corridor.northMelbourneToBroadmeadows.pointAt(8, 12),
  }),
  new Station({ id: station.PATTERSON, name: "Patterson", ptvIds: [1157] }),
  new Station({ id: station.PRAHRAN, name: "Prahran", ptvIds: [1158] }),
  new Station({ id: station.PRESTON, name: "Preston", ptvIds: [1159] }),
  new Station({ id: station.PYRAMID, name: "Pyramid", ptvIds: [1548] }),
  new Station({ id: station.REGENT, name: "Regent", ptvIds: [1160] }),
  new Station({ id: station.RESERVOIR, name: "Reservoir", ptvIds: [1161] }),
  new Station({ id: station.RICHMOND, name: "Richmond", ptvIds: [1162] }),
  new Station({
    id: station.RIDDELLS_CREEK,
    name: "Riddells Creek",
    ptvIds: [1549],
  }),
  new Station({ id: station.RINGWOOD, name: "Ringwood", ptvIds: [1163] }),
  new Station({
    id: station.RINGWOOD_EAST,
    name: "Ringwood East",
    ptvIds: [1164],
  }),
  new Station({ id: station.RIPPONLEA, name: "Ripponlea", ptvIds: [1165] }),
  new Station({
    id: station.RIVERSDALE,
    name: "Riversdale",
    ptvIds: [1166],
    mapLocation: corridor.camberwellToAlamein.pointAt(1, 6),
  }),
  new Station({ id: station.ROCHESTER, name: "Rochester", ptvIds: [1550] }),
  new Station({ id: station.ROCKBANK, name: "Rockbank", ptvIds: [1167] }),
  new Station({
    id: station.ROSANNA,
    name: "Rosanna",
    ptvIds: [1168],
    mapLocation: corridor.cliftonHillToHurstbridge.pointAt(9, 17),
  }),
  new Station({ id: station.ROSEDALE, name: "Rosedale", ptvIds: [1551] }),
  new Station({
    id: station.ROXBURGH_PARK,
    name: "Roxburgh Park",
    ptvIds: [1219],
  }),
  new Station({
    id: station.ROYAL_PARK,
    name: "Royal Park",
    ptvIds: [1169],
    mapLocation: corridor.northMelbourneToUpfield.pointAt(3, 13),
  }),
  new Station({ id: station.RUSHALL, name: "Rushall", ptvIds: [1170] }),
  new Station({ id: station.RUTHVEN, name: "Ruthven", ptvIds: [1171] }),
  new Station({ id: station.SALE, name: "Sale", ptvIds: [1553] }),
  new Station({
    id: station.SANDOWN_PARK,
    name: "Sandown Park",
    ptvIds: [1172],
  }),
  new Station({ id: station.SANDRINGHAM, name: "Sandringham", ptvIds: [1173] }),
  new Station({ id: station.SEAFORD, name: "Seaford", ptvIds: [1174] }),
  new Station({
    id: station.SEAHOLME,
    name: "Seaholme",
    ptvIds: [1175],
    mapLocation: corridor.newportToLavertonLoop.pointAt(1, 4),
  }),
  new Station({ id: station.SEDDON, name: "Seddon", ptvIds: [1176] }),
  new Station({ id: station.SEYMOUR, name: "Seymour", ptvIds: [1554] }),
  new Station({ id: station.SHEPPARTON, name: "Shepparton", ptvIds: [1555] }),
  new Station({
    id: station.SHERWOOD_PARK,
    name: "Sherwood Park",
    ptvIds: [1575],
  }),
  new Station({ id: station.SHOWGROUNDS, name: "Showgrounds", ptvIds: [1177] }),
  new Station({ id: station.SOMERVILLE, name: "Somerville", ptvIds: [1178] }),
  new Station({
    id: station.SOUTH_GEELONG,
    name: "South Geelong",
    ptvIds: [1556],
  }),
  new Station({
    id: station.SOUTH_KENSINGTON,
    name: "South Kensington",
    ptvIds: [1179],
  }),
  new Station({
    id: station.SOUTH_MORANG,
    name: "South Morang",
    ptvIds: [1224],
  }),
  new Station({ id: station.SOUTH_YARRA, name: "South Yarra", ptvIds: [1180] }),
  new Station({
    id: station.SOUTHERN_CROSS,
    name: "Southern Cross",
    ptvIds: [1181],
  }),
  new Station({ id: station.SOUTHLAND, name: "Southland", ptvIds: [1001] }),
  new Station({ id: station.SPOTSWOOD, name: "Spotswood", ptvIds: [1182] }),
  new Station({ id: station.SPRINGHURST, name: "Springhurst", ptvIds: [1557] }),
  new Station({ id: station.SPRINGVALE, name: "Springvale", ptvIds: [1183] }),
  new Station({
    id: station.ST_ALBANS,
    name: "St Albans",
    ptvIds: [1184],
    mapLocation: corridor.sunshineToWatergardens.pointAt(3, 5),
  }),
  new Station({ id: station.STONY_POINT, name: "Stony Point", ptvIds: [1185] }),
  new Station({ id: station.STRATFORD, name: "Stratford", ptvIds: [1558] }),
  new Station({
    id: station.STRATHMORE,
    name: "Strathmore",
    ptvIds: [1186],
    mapLocation: corridor.northMelbourneToBroadmeadows.pointAt(7, 12),
  }),
  new Station({ id: station.SUNBURY, name: "Sunbury", ptvIds: [1187] }),
  new Station({ id: station.SUNSHINE, name: "Sunshine", ptvIds: [1218] }),
  new Station({ id: station.SWAN_HILL, name: "Swan Hill", ptvIds: [1559] }),
  new Station({ id: station.SYNDAL, name: "Syndal", ptvIds: [1190] }),
  new Station({ id: station.TALBOT, name: "Talbot", ptvIds: [1594] }),
  new Station({ id: station.TALLAROOK, name: "Tallarook", ptvIds: [1560] }),
  new Station({ id: station.TARNEIT, name: "Tarneit", ptvIds: [1599] }),
  new Station({ id: station.TECOMA, name: "Tecoma", ptvIds: [1191] }),
  new Station({ id: station.TERANG, name: "Terang", ptvIds: [1561] }),
  new Station({ id: station.THOMASTOWN, name: "Thomastown", ptvIds: [1192] }),
  new Station({ id: station.THORNBURY, name: "Thornbury", ptvIds: [1193] }),
  new Station({
    id: station.TOORAK,
    name: "Toorak",
    ptvIds: [1194],
    mapLocation: corridor.southYarraToCaulfield.pointAt(2, 5),
  }),
  new Station({ id: station.TOORONGA, name: "Tooronga", ptvIds: [1195] }),
  new Station({ id: station.TOTTENHAM, name: "Tottenham", ptvIds: [1196] }),
  new Station({ id: station.TRAFALGAR, name: "Trafalgar", ptvIds: [1562] }),
  new Station({ id: station.TRARALGON, name: "Traralgon", ptvIds: [1563] }),
  new Station({ id: station.TYABB, name: "Tyabb", ptvIds: [1197] }),
  new Station({ id: station.TYNONG, name: "Tynong", ptvIds: [1564] }),
  new Station({ id: station.UPFIELD, name: "Upfield", ptvIds: [1198] }),
  new Station({
    id: station.UPPER_FERNTREE_GULLY,
    name: "Upper Ferntree Gully",
    ptvIds: [1199],
  }),
  new Station({ id: station.UPWEY, name: "Upwey", ptvIds: [1200] }),
  new Station({
    id: station.VICTORIA_PARK,
    name: "Victoria Park",
    ptvIds: [1201],
  }),
  new Station({ id: station.VIOLET_TOWN, name: "Violet Town", ptvIds: [1565] }),
  new Station({ id: station.WALLAN, name: "Wallan", ptvIds: [1574] }),
  new Station({ id: station.WANDONG, name: "Wandong", ptvIds: [1566] }),
  new Station({ id: station.WANGARATTA, name: "Wangaratta", ptvIds: [1567] }),
  new Station({ id: station.WARRAGUL, name: "Warragul", ptvIds: [1568] }),
  new Station({ id: station.WARRNAMBOOL, name: "Warrnambool", ptvIds: [1569] }),
  new Station({
    id: station.WATERGARDENS,
    name: "Watergardens",
    ptvIds: [1202],
  }),
  new Station({
    id: station.WATSONIA,
    name: "Watsonia",
    ptvIds: [1203],
    mapLocation: corridor.cliftonHillToHurstbridge.pointAt(11, 17),
  }),
  new Station({
    id: station.WATTLE_GLEN,
    name: "Wattle Glen",
    ptvIds: [1204],
    mapLocation: corridor.cliftonHillToHurstbridge.pointAt(16, 17),
  }),
  new Station({ id: station.WAURN_PONDS, name: "Waurn Ponds", ptvIds: [1596] }),
  new Station({ id: station.WENDOUREE, name: "Wendouree", ptvIds: [1589] }),
  new Station({ id: station.WERRIBEE, name: "Werribee", ptvIds: [1205] }),
  new Station({
    id: station.WEST_FOOTSCRAY,
    name: "West Footscray",
    ptvIds: [1206],
  }),
  new Station({
    id: station.WEST_RICHMOND,
    name: "West Richmond",
    ptvIds: [1207],
  }),
  new Station({ id: station.WESTALL, name: "Westall", ptvIds: [1208] }),
  new Station({
    id: station.WESTGARTH,
    name: "Westgarth",
    ptvIds: [1209],
    mapLocation: corridor.cliftonHillToHurstbridge.pointAt(1, 17),
  }),
  new Station({
    id: station.WESTONA,
    name: "Westona",
    ptvIds: [1210],
    mapLocation: corridor.newportToLavertonLoop.pointAt(3, 4),
  }),
  new Station({
    id: station.WILLIAMS_LANDING,
    name: "Williams Landing",
    ptvIds: [1225],
    mapLocation: corridor.lavertonToWerribee.pointAt(2, 4),
  }),
  new Station({
    id: station.WILLIAMSTOWN,
    name: "Williamstown",
    ptvIds: [1211],
  }),
  new Station({
    id: station.WILLIAMSTOWN_BEACH,
    name: "Williamstown Beach",
    ptvIds: [1212],
  }),
  new Station({
    id: station.WILLISON,
    name: "Willison",
    ptvIds: [1213],
    mapLocation: corridor.camberwellToAlamein.pointAt(2, 6),
  }),
  new Station({ id: station.WINCHELSEA, name: "Winchelsea", ptvIds: [1570] }),
  new Station({ id: station.WINDSOR, name: "Windsor", ptvIds: [1214] }),
  new Station({ id: station.WODONGA, name: "Wodonga", ptvIds: [1571] }),
  new Station({ id: station.WOODEND, name: "Woodend", ptvIds: [1572] }),
  new Station({
    id: station.WYNDHAM_VALE,
    name: "Wyndham Vale",
    ptvIds: [1598],
  }),
  new Station({ id: station.YARRAGON, name: "Yarragon", ptvIds: [1573] }),
  new Station({ id: station.YARRAMAN, name: "Yarraman", ptvIds: [1215] }),
  new Station({ id: station.YARRAVILLE, name: "Yarraville", ptvIds: [1216] }),
  new Station({ id: station.HUNTLY, name: "Huntly", ptvIds: [1618] }),
  new Station({ id: station.RAYWOOD, name: "Raywood", ptvIds: [1617] }),
  new Station({ id: station.UNION, name: "Union", ptvIds: [1229] }),
  new Station({
    id: station.EAST_PAKENHAM,
    name: "East Pakenham",
    ptvIds: [1230],
  }),
];

export const stations = new StationCollection(data);
