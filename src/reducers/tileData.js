export default function tileData(
  state = {
    exploredTiles: {},
    boardTiles: {},
    center: { lat: null, lng: null, closestTile: { lat: null, lng: null } }
  },
  action
) {
  console.log(action.type);
  switch (action.type) {
    case "SET_LOCATION":
      return {
        ...state,
        center: {
          lat: action.position.coords.latitude,
          lng: action.position.coords.longitude,
          closestTile: action.closestTile
        }
      };
    case "SET_INITIAL_DATA":
      return {
        ...state,
        exploredTiles: action.exploredTiles,
        boardTiles: action.boardTiles,
        center: {
          lat: action.position.coords.latitude,
          lng: action.position.coords.longitude,
          closestTile: action.closestTile
        }
      };
    // case "SET_BOARD_TILES":
    //   console.log("settin tiles");
    //   return {
    //     ...state,
    //     boardTiles: action.tiles
    //   };
    case "ADD_TILE":
      return {
        ...state,
        exploredTiles: {
          ...state.exploredTiles,
          [action.exploredTile.id]: action.exploredTile
        }
      };

    default:
      return state;
  }
}
