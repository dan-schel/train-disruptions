import * as station from "../../../shared/station-ids";
import { BranchingLineRoute } from "./branching-line-route";
import { DualPathLineRoute } from "./dual-path-line-route";
import { LoopLineRoute } from "./loop-line-route";
import { SimpleLineRoute } from "./simple-line-route";

export const SANDRINGHAM = new SimpleLineRoute([
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

export const FRANKSTON = new SimpleLineRoute([
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

export const STONY_POINT = new SimpleLineRoute([
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

export const CRANBOURNE = new LoopLineRoute([
  station.RICHMOND,
  station.SOUTH_YARRA,
  { id: station.HAWKSBURN, type: "always-express" },
  { id: station.TOORAK, type: "always-express" },
  { id: station.ARMADALE, type: "always-express" },

  // Dealing with this will be fun.
  { id: station.MALVERN, type: "often-express" },

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

export const PAKENHAM = new LoopLineRoute([
  station.RICHMOND,
  station.SOUTH_YARRA,
  { id: station.HAWKSBURN, type: "always-express" },
  { id: station.TOORAK, type: "always-express" },
  { id: station.ARMADALE, type: "always-express" },

  // Dealing with this will be fun.
  { id: station.MALVERN, type: "often-express" },

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

export const GIPPSLAND = new SimpleLineRoute([
  station.SOUTHERN_CROSS,
  station.FLINDERS_STREET,
  station.RICHMOND,
  { id: station.SOUTH_YARRA, type: "always-express" },
  { id: station.HAWKSBURN, type: "always-express" },
  { id: station.TOORAK, type: "always-express" },
  { id: station.ARMADALE, type: "always-express" },
  { id: station.MALVERN, type: "always-express" },
  station.CAULFIELD,
  { id: station.CARNEGIE, type: "always-express" },
  { id: station.MURRUMBEENA, type: "always-express" },
  { id: station.HUGHESDALE, type: "always-express" },
  { id: station.OAKLEIGH, type: "always-express" },
  { id: station.HUNTINGDALE, type: "always-express" },
  station.CLAYTON,
  { id: station.WESTALL, type: "always-express" },
  { id: station.SPRINGVALE, type: "always-express" },
  { id: station.SANDOWN_PARK, type: "always-express" },
  { id: station.NOBLE_PARK, type: "always-express" },
  { id: station.YARRAMAN, type: "always-express" },
  station.DANDENONG,
  { id: station.HALLAM, type: "always-express" },
  { id: station.NARRE_WARREN, type: "always-express" },

  // Bordering on always express for this one (1 train per day, max).
  { id: station.BERWICK, type: "often-express" },

  { id: station.BEACONSFIELD, type: "always-express" },
  { id: station.OFFICER, type: "always-express" },
  { id: station.CARDINIA_ROAD, type: "always-express" },
  station.PAKENHAM,
  { id: station.EAST_PAKENHAM, type: "always-express" },
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
]);

export const GLEN_WAVERLEY = new LoopLineRoute([
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

export const ALAMEIN = new LoopLineRoute([
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

export const BELGRAVE = new LoopLineRoute([
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

export const LILYDALE = new LoopLineRoute([
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

export const HURSTBRIDGE = new LoopLineRoute([
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

export const MERNDA = new LoopLineRoute([
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

export const UPFIELD = new LoopLineRoute([
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

export const CRAIGIEBURN = new LoopLineRoute([
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

export const SEYMOUR = new BranchingLineRoute(
  [
    station.SOUTHERN_CROSS,
    station.NORTH_MELBOURNE,
    { id: station.KENSINGTON, type: "always-express" },
    { id: station.NEWMARKET, type: "always-express" },
    { id: station.ASCOT_VALE, type: "always-express" },
    { id: station.MOONEE_PONDS, type: "always-express" },
    station.ESSENDON,
    { id: station.GLENBERVIE, type: "always-express" },
    { id: station.STRATHMORE, type: "always-express" },
    { id: station.PASCOE_VALE, type: "always-express" },
    { id: station.OAK_PARK, type: "always-express" },
    { id: station.GLENROY, type: "always-express" },
    { id: station.JACANA, type: "always-express" },
    station.BROADMEADOWS,
    { id: station.COOLAROO, type: "always-express" },
    { id: station.ROXBURGH_PARK, type: "always-express" },
    station.CRAIGIEBURN,
    station.DONNYBROOK,
    station.WALLAN,
    station.HEATHCOTE_JUNCTION,
    station.WANDONG,
    station.KILMORE_EAST,
    station.BROADFORD,
    station.TALLAROOK,
    station.SEYMOUR,
  ],
  [
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
  [
    // Shepparton branch.
    station.NAGAMBIE,
    station.MURCHISON_EAST,
    station.MOOROOPNA,
    station.SHEPPARTON,
  ],
);

export const FLEMINGTON_RACECOURSE = new SimpleLineRoute([
  station.FLINDERS_STREET,
  station.SOUTHERN_CROSS,
  station.NORTH_MELBOURNE,
  station.KENSINGTON,
  station.NEWMARKET,
  station.SHOWGROUNDS,
  station.FLEMINGTON_RACECOURSE,
]);

export const SUNBURY = new LoopLineRoute([
  station.NORTH_MELBOURNE,
  { id: station.SOUTH_KENSINGTON, type: "always-express" },
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

export const BENDIGO = new BranchingLineRoute(
  [
    station.SOUTHERN_CROSS,
    { id: station.NORTH_MELBOURNE, type: "always-express" },
    { id: station.SOUTH_KENSINGTON, type: "always-express" },
    station.FOOTSCRAY,
    { id: station.MIDDLE_FOOTSCRAY, type: "always-express" },
    { id: station.WEST_FOOTSCRAY, type: "always-express" },
    { id: station.TOTTENHAM, type: "always-express" },
    { id: station.SUNSHINE, type: "always-express" },
    { id: station.ALBION, type: "always-express" },
    { id: station.GINIFER, type: "always-express" },
    { id: station.ST_ALBANS, type: "always-express" },
    { id: station.KEILOR_PLAINS, type: "always-express" },
    station.WATERGARDENS,
    { id: station.DIGGERS_REST, type: "always-express" },
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
  [
    // Echuca branch.
    station.EPSOM,
    station.HUNTLY,
    station.GOORNONG,
    station.ELMORE,
    station.ROCHESTER,
    station.ECHUCA,
  ],
  [
    // Swan Hill branch.
    station.EAGLEHAWK,
    station.RAYWOOD,
    station.DINGEE,
    station.PYRAMID,
    station.KERANG,
    station.SWAN_HILL,
  ],
);

export const BALLARAT = new BranchingLineRoute(
  [
    station.SOUTHERN_CROSS,
    { id: station.NORTH_MELBOURNE, type: "always-express" },
    { id: station.SOUTH_KENSINGTON, type: "always-express" },
    station.FOOTSCRAY,
    { id: station.MIDDLE_FOOTSCRAY, type: "always-express" },
    { id: station.WEST_FOOTSCRAY, type: "always-express" },
    { id: station.TOTTENHAM, type: "always-express" },
    station.SUNSHINE,
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
  [
    // Maryborough branch.
    station.CRESWICK,
    station.CLUNES,
    station.TALBOT,
    station.MARYBOROUGH,
  ],
  [
    // Ararat branch.
    station.WENDOUREE,
    station.BEAUFORT,
    station.ARARAT,
  ],
);

export const GEELONG = new SimpleLineRoute([
  station.SOUTHERN_CROSS,
  { id: station.NORTH_MELBOURNE, type: "always-express" },
  { id: station.SOUTH_KENSINGTON, type: "always-express" },
  station.FOOTSCRAY,
  { id: station.MIDDLE_FOOTSCRAY, type: "always-express" },
  { id: station.WEST_FOOTSCRAY, type: "always-express" },
  { id: station.TOTTENHAM, type: "always-express" },
  station.SUNSHINE,
  { id: station.ARDEER, type: "always-express" },
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
]);

export const WERRIBEE = new DualPathLineRoute(
  [
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
  [
    // The Altona loop.
    station.SEAHOLME,
    station.ALTONA,
    station.WESTONA,
  ],
  [
    // The express route.
  ],
  [
    station.LAVERTON,
    station.AIRCRAFT,
    station.WILLIAMS_LANDING,
    station.HOPPERS_CROSSING,
    station.WERRIBEE,
  ],
);

export const WILLIAMSTOWN = new SimpleLineRoute([
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
