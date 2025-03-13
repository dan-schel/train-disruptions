import * as station from "@/shared/station-ids";
import {
  loop,
  simple,
  dualPath,
  regionalSimple,
  regionalBranch,
} from "@/server/data/static/line-routes/line-routes-utils";

export const SANDRINGHAM = simple([
  station.FLINDERS_STREET,
  station.RICHMOND,
  station.SOUTH_YARRA,
  station.PRAHRAN,
  station.WINDSOR,
  station.BALACLAVA,
  station.RIPPONLEA,
  station.ELSTERNWICK,
  station.GARDENVALE,
  station.NORTH_BRIGHTON,
  station.MIDDLE_BRIGHTON,
  station.BRIGHTON_BEACH,
  station.HAMPTON,
  station.SANDRINGHAM,
]);

export const FRANKSTON = simple([
  station.FLINDERS_STREET,
  station.RICHMOND,
  station.SOUTH_YARRA,
  station.HAWKSBURN,
  station.TOORAK,
  station.ARMADALE,
  station.MALVERN,
  station.CAULFIELD,
  station.GLEN_HUNTLY,
  station.ORMOND,
  station.MCKINNON,
  station.BENTLEIGH,
  station.PATTERSON,
  station.MOORABBIN,
  station.HIGHETT,
  station.SOUTHLAND,
  station.CHELTENHAM,
  station.MENTONE,
  station.PARKDALE,
  station.MORDIALLOC,
  station.ASPENDALE,
  station.EDITHVALE,
  station.CHELSEA,
  station.BONBEACH,
  station.CARRUM,
  station.SEAFORD,
  station.KANANOOK,
  station.FRANKSTON,
]);

export const STONY_POINT = simple([
  station.FRANKSTON,
  station.LEAWARRA,
  station.BAXTER,
  station.SOMERVILLE,
  station.TYABB,
  station.HASTINGS,
  station.BITTERN,
  station.MORRADOO,
  station.CRIB_POINT,
  station.STONY_POINT,
]);

export const CRANBOURNE = loop([
  station.RICHMOND,
  station.SOUTH_YARRA,
  // The Cranbourne line runs express South Yarra to Caulfield most of the time.
  // It sometimes stops at Malvern.
  station.CAULFIELD,
  station.CARNEGIE,
  station.MURRUMBEENA,
  station.HUGHESDALE,
  station.OAKLEIGH,
  station.HUNTINGDALE,
  station.CLAYTON,
  station.WESTALL,
  station.SPRINGVALE,
  station.SANDOWN_PARK,
  station.NOBLE_PARK,
  station.YARRAMAN,
  station.DANDENONG,
  station.LYNBROOK,
  station.MERINDA_PARK,
  station.CRANBOURNE,
]);

export const PAKENHAM = loop([
  station.RICHMOND,
  station.SOUTH_YARRA,
  // The Pakenham line runs express South Yarra to Caulfield most of the time.
  // It sometimes stops at Malvern.
  station.CAULFIELD,
  station.CARNEGIE,
  station.MURRUMBEENA,
  station.HUGHESDALE,
  station.OAKLEIGH,
  station.HUNTINGDALE,
  station.CLAYTON,
  station.WESTALL,
  station.SPRINGVALE,
  station.SANDOWN_PARK,
  station.NOBLE_PARK,
  station.YARRAMAN,
  station.DANDENONG,
  station.HALLAM,
  station.NARRE_WARREN,
  station.BERWICK,
  station.BEACONSFIELD,
  station.OFFICER,
  station.CARDINIA_ROAD,
  station.PAKENHAM,
  station.EAST_PAKENHAM,
]);

export const GIPPSLAND = regionalSimple({
  setDownOnly: [
    station.SOUTHERN_CROSS,
    station.FLINDERS_STREET,
    station.RICHMOND,
    station.CAULFIELD,
    station.CLAYTON,
    station.DANDENONG,
    // The Gippsland line sometimes stops at Berwick.
  ],
  stations: [
    // Pakenham is an exception to the "no surburban passengers" rule.
    station.PAKENHAM,

    // TODO: The Gippsland line will need special handling for East Pakenham. When
    // buses replace trains from Pakenham to the city, the Gippsland line
    // terminates at East Pakenham instead. We need to add a train edge from Nar
    // Nar Goon to East Pakenham, and remove all edges for Pakenham and beyond.
    //
    // Come to think of it, this also has interesting implications for the map,
    // if we want to show it accurately. We need to add an interchange marker at
    // East Pakenham, but only during disruptions.

    station.NAR_NAR_GOON,
    station.TYNONG,
    station.GARFIELD,
    station.BUNYIP,
    station.LONGWARRY,
    station.DROUIN,
    station.WARRAGUL,
    station.YARRAGON,
    station.TRAFALGAR,
    station.MOE,
    station.MORWELL,
    station.TRARALGON,
    station.ROSEDALE,
    station.SALE,
    station.STRATFORD,
    station.BAIRNSDALE,
  ],
});

export const GLEN_WAVERLEY = loop([
  station.RICHMOND,
  station.EAST_RICHMOND,
  station.BURNLEY,
  station.HEYINGTON,
  station.KOOYONG,
  station.TOORONGA,
  station.GARDINER,
  station.GLEN_IRIS,
  station.DARLING,
  station.EAST_MALVERN,
  station.HOLMESGLEN,
  station.JORDANVILLE,
  station.MOUNT_WAVERLEY,
  station.SYNDAL,
  station.GLEN_WAVERLEY,
]);

export const ALAMEIN = loop([
  station.RICHMOND,
  station.EAST_RICHMOND,
  station.BURNLEY,
  station.HAWTHORN,
  station.GLENFERRIE,
  station.AUBURN,
  station.CAMBERWELL,
  station.RIVERSDALE,
  station.WILLISON,
  station.HARTWELL,
  station.BURWOOD,
  station.ASHBURTON,
  station.ALAMEIN,
]);

export const BELGRAVE = loop([
  station.RICHMOND,
  station.EAST_RICHMOND,
  station.BURNLEY,
  station.HAWTHORN,
  station.GLENFERRIE,
  station.AUBURN,
  station.CAMBERWELL,
  station.EAST_CAMBERWELL,
  station.CANTERBURY,
  station.CHATHAM,
  station.UNION,
  station.BOX_HILL,
  station.LABURNUM,
  station.BLACKBURN,
  station.NUNAWADING,
  station.MITCHAM,
  station.HEATHERDALE,
  station.RINGWOOD,
  station.HEATHMONT,
  station.BAYSWATER,
  station.BORONIA,
  station.FERNTREE_GULLY,
  station.UPPER_FERNTREE_GULLY,
  station.UPWEY,
  station.TECOMA,
  station.BELGRAVE,
]);

export const LILYDALE = loop([
  station.RICHMOND,
  station.EAST_RICHMOND,
  station.BURNLEY,
  station.HAWTHORN,
  station.GLENFERRIE,
  station.AUBURN,
  station.CAMBERWELL,
  station.EAST_CAMBERWELL,
  station.CANTERBURY,
  station.CHATHAM,
  station.UNION,
  station.BOX_HILL,
  station.LABURNUM,
  station.BLACKBURN,
  station.NUNAWADING,
  station.MITCHAM,
  station.HEATHERDALE,
  station.RINGWOOD,
  station.RINGWOOD_EAST,
  station.CROYDON,
  station.MOOROOLBARK,
  station.LILYDALE,
]);

export const HURSTBRIDGE = loop([
  station.JOLIMONT,
  station.WEST_RICHMOND,
  station.NORTH_RICHMOND,
  station.COLLINGWOOD,
  station.VICTORIA_PARK,
  station.CLIFTON_HILL,
  station.WESTGARTH,
  station.DENNIS,
  station.FAIRFIELD,
  station.ALPHINGTON,
  station.DAREBIN,
  station.IVANHOE,
  station.EAGLEMONT,
  station.HEIDELBERG,
  station.ROSANNA,
  station.MACLEOD,
  station.WATSONIA,
  station.GREENSBOROUGH,
  station.MONTMORENCY,
  station.ELTHAM,
  station.DIAMOND_CREEK,
  station.WATTLE_GLEN,
  station.HURSTBRIDGE,
]);

export const MERNDA = loop([
  station.JOLIMONT,
  station.WEST_RICHMOND,
  station.NORTH_RICHMOND,
  station.COLLINGWOOD,
  station.VICTORIA_PARK,
  station.CLIFTON_HILL,
  station.RUSHALL,
  station.MERRI,
  station.NORTHCOTE,
  station.CROXTON,
  station.THORNBURY,
  station.BELL,
  station.PRESTON,
  station.REGENT,
  station.RESERVOIR,
  station.RUTHVEN,
  station.KEON_PARK,
  station.THOMASTOWN,
  station.LALOR,
  station.EPPING,
  station.SOUTH_MORANG,
  station.MIDDLE_GORGE,
  station.HAWKSTOWE,
  station.MERNDA,
]);

export const UPFIELD = loop([
  station.NORTH_MELBOURNE,
  station.MACAULAY,
  station.FLEMINGTON_BRIDGE,
  station.ROYAL_PARK,
  station.JEWELL,
  station.BRUNSWICK,
  station.ANSTEY,
  station.MORELAND,
  station.COBURG,
  station.BATMAN,
  station.MERLYNSTON,
  station.FAWKNER,
  station.GOWRIE,
  station.UPFIELD,
]);

export const CRAIGIEBURN = loop([
  station.NORTH_MELBOURNE,
  station.KENSINGTON,
  station.NEWMARKET,
  station.ASCOT_VALE,
  station.MOONEE_PONDS,
  station.ESSENDON,
  station.GLENBERVIE,
  station.STRATHMORE,
  station.PASCOE_VALE,
  station.OAK_PARK,
  station.GLENROY,
  station.JACANA,
  station.BROADMEADOWS,
  station.COOLAROO,
  station.ROXBURGH_PARK,
  station.CRAIGIEBURN,
]);

export const SEYMOUR = regionalBranch({
  setDownOnly: [
    station.SOUTHERN_CROSS,
    station.NORTH_MELBOURNE,
    // The Seymour line sometimes stops at Essendon.
    station.BROADMEADOWS,
    // TODO: Consider removing Craigieburn too, as it's only a sometimes stop?
    station.CRAIGIEBURN,
  ],
  shared: [
    station.DONNYBROOK,
    station.WALLAN,
    station.HEATHCOTE_JUNCTION,
    station.WANDONG,
    station.KILMORE_EAST,
    station.BROADFORD,
    station.TALLAROOK,
    station.SEYMOUR,
  ],
  branchA: [
    // Albury branch.
    station.AVENEL,
    station.EUROA,
    station.VIOLET_TOWN,
    station.BENALLA,
    station.WANGARATTA,
    station.SPRINGHURST,
    station.CHILTERN,
    station.WODONGA,
    station.ALBURY,
  ],
  branchB: [
    // Shepparton branch.
    station.NAGAMBIE,
    station.MURCHISON_EAST,
    station.MOOROOPNA,
    station.SHEPPARTON,
  ],
});

export const FLEMINGTON_RACECOURSE = simple([
  station.FLINDERS_STREET,
  station.SOUTHERN_CROSS,
  station.NORTH_MELBOURNE,
  // The Flemington Racecourse line doesn't stop at Kensington and Newmarket.

  // TODO: This line will require special treatment too. Usually it doesn't
  // run at all, and when it does, it usually only serves of one these two. Not
  // both.
  station.SHOWGROUNDS,
  station.FLEMINGTON_RACECOURSE,
]);

export const SUNBURY = loop([
  station.NORTH_MELBOURNE,
  // The Sunbury line doesn't stop at South Kensington.
  station.FOOTSCRAY,
  station.MIDDLE_FOOTSCRAY,
  station.WEST_FOOTSCRAY,
  station.TOTTENHAM,
  station.SUNSHINE,
  station.ALBION,
  station.GINIFER,
  station.ST_ALBANS,
  station.KEILOR_PLAINS,
  station.WATERGARDENS,
  station.DIGGERS_REST,
  station.SUNBURY,
]);

export const BENDIGO = regionalBranch({
  setDownOnly: [
    station.SOUTHERN_CROSS,
    station.FOOTSCRAY,
    // The Bendigo line doesn't stop at Sunshine.
    station.WATERGARDENS,
  ],
  shared: [
    // Sunbury is an exception to the "no surburban passengers" rule.
    station.SUNBURY,

    station.CLARKEFIELD,
    station.RIDDELLS_CREEK,
    station.GISBORNE,
    station.MACEDON,
    station.WOODEND,
    station.KYNETON,
    station.MALMSBURY,
    station.CASTLEMAINE,
    station.KANGAROO_FLAT,
    station.BENDIGO,
  ],
  branchA: [
    // Echuca branch.
    station.EPSOM,
    station.HUNTLY,
    station.GOORNONG,
    station.ELMORE,
    station.ROCHESTER,
    station.ECHUCA,
  ],
  branchB: [
    // Swan Hill branch.
    station.EAGLEHAWK,
    station.RAYWOOD,
    station.DINGEE,
    station.PYRAMID,
    station.KERANG,
    station.SWAN_HILL,
  ],
});

export const BALLARAT = regionalBranch({
  setDownOnly: [station.SOUTHERN_CROSS, station.FOOTSCRAY, station.SUNSHINE],
  shared: [
    station.ARDEER,
    station.DEER_PARK,
    station.CAROLINE_SPRINGS,
    station.ROCKBANK,
    station.COBBLEBANK,
    station.MELTON,
    station.BACCHUS_MARSH,
    station.BALLAN,
    station.BALLARAT,
  ],
  branchA: [
    // Maryborough branch.
    station.CRESWICK,
    station.CLUNES,
    station.TALBOT,
    station.MARYBOROUGH,
  ],
  branchB: [
    // Ararat branch.
    station.WENDOUREE,
    station.BEAUFORT,
    station.ARARAT,
  ],
});

export const GEELONG = regionalSimple({
  setDownOnly: [station.SOUTHERN_CROSS, station.FOOTSCRAY, station.SUNSHINE],
  stations: [
    // The Geelong line doesn't stop at Ardeer.
    station.DEER_PARK,
    station.TARNEIT,
    station.WYNDHAM_VALE,
    station.LITTLE_RIVER,
    station.LARA,
    station.CORIO,
    station.NORTH_SHORE,
    station.NORTH_GEELONG,
    station.GEELONG,
    station.SOUTH_GEELONG,
    station.MARSHALL,
    station.WAURN_PONDS,
    station.WINCHELSEA,
    station.BIRREGURRA,
    station.COLAC,
    station.CAMPERDOWN,
    station.TERANG,
    station.SHERWOOD_PARK,
    station.WARRNAMBOOL,
  ],
});

export const WERRIBEE = dualPath({
  shared: [
    station.FLINDERS_STREET,
    station.SOUTHERN_CROSS,
    station.NORTH_MELBOURNE,
    station.SOUTH_KENSINGTON,
    station.FOOTSCRAY,
    station.SEDDON,
    station.YARRAVILLE,
    station.SPOTSWOOD,
    station.NEWPORT,
  ],
  pathA: [
    // The Altona loop.
    station.SEAHOLME,
    station.ALTONA,
    station.WESTONA,
  ],
  pathB: [
    // The express route.
  ],
  rejoined: [
    station.LAVERTON,
    station.AIRCRAFT,
    station.WILLIAMS_LANDING,
    station.HOPPERS_CROSSING,
    station.WERRIBEE,
  ],
});

export const WILLIAMSTOWN = simple([
  station.FLINDERS_STREET,
  station.SOUTHERN_CROSS,
  station.NORTH_MELBOURNE,
  station.SOUTH_KENSINGTON,
  station.FOOTSCRAY,
  station.SEDDON,
  station.YARRAVILLE,
  station.SPOTSWOOD,
  station.NEWPORT,
  station.NORTH_WILLIAMSTOWN,
  station.WILLIAMSTOWN_BEACH,
  station.WILLIAMSTOWN,
]);
