import IDBAdapter from "../adapters/IDBAdapter";

export function enterNewTile(closestLat, closestLng, exploredTiles) {
  let newTile = {
    id: `${closestLat},${closestLng}`,
    lat: closestLat,
    lng: closestLng,
    users: { 1: 1 }
  };

  if (exploredTiles[`${closestLat},${closestLng}`]) {
    console.log("entered tile exists");
    newTile.users[1] =
      exploredTiles[`${closestLat},${closestLng}`].users[1] + 1;
  } else {
    console.log("new tile discovered");
    fetch(
      `https://api.nasa.gov/planetary/earth/imagery/?lon=${closestLng}&lat=${closestLat}&cloud_score=True&api_key=ZmqrD8pzNLTHkc2lrz6sHCB9P1JehqQlpZnOT9Jt`
    )
      .then(res => res.json())
      .then(console.log);
  }

  return dispatch => {
    IDBAdapter.create("tiles", newTile).then(exploredTile => {
      dispatch({
        type: "ADD_TILE",
        exploredTile
      });
    });
  };
}
export function getLocation() {
  return dispatch => {
    navigator.geolocation.getCurrentPosition(position => {
      let closestLng = (
        Math.round(position.coords.longitude * 10000) / 10000
      ).toFixed(4);
      let latOffset =
        (Math.round(position.coords.longitude * 10000) / 10000 * 10000) % 2
          ? 0
          : 0.00005;
      let closestLat = (
        Math.round(position.coords.latitude * 10000) / 10000 +
        latOffset
      ).toFixed(5);
      dispatch({
        type: "SET_LOCATION",
        position,
        closestTile: { lat: closestLat, lng: closestLng }
      });
    });
  };
}

export function getInitialLocationAndData() {
  return dispatch => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          let closestLng = (
            Math.round(position.coords.longitude * 10000) / 10000
          ).toFixed(4);
          let latOffset =
            (Math.round(position.coords.longitude * 10000) / 10000 * 10000) % 2
              ? 0
              : 0.00005;
          let closestLat = (
            Math.round(position.coords.latitude * 10000) / 10000 +
            latOffset
          ).toFixed(5);

          let boardTiles = generateTiles(closestLat, closestLng);
          //will need to filter better soon:
          IDBAdapter.all("tiles").then(allTiles => {
            let exploredTiles = normalizeTiles(allTiles);

            dispatch({
              type: "SET_INITIAL_DATA",
              boardTiles,
              exploredTiles,
              position,
              closestTile: { lat: closestLat, lng: closestLng }
            });
            dispatch(enterNewTile(closestLat, closestLng, exploredTiles));
          });
        },
        err => console.log("geolocation failed", err)
      );
    } else {
      console.log("geolocation error");
    }
  };
}

function generateTiles(closestLat, closestLng) {
  const tileWidth = 100;
  const tileHeight = 100;
  const tileColumns = 10; //Math.ceil(window.innerWidth / tileWidth);
  const tileRows = 10; //Math.ceil(window.innerHeight / tileHeight);
  console.log(closestLat, closestLng);
  const startingLng = parseFloat(closestLng) - 0.0005;
  const startingLat = parseFloat(closestLat) + 0.00055arn ;

  const latOffset = 0.00005;
  const degreeIncrement = 0.0001;
  //Math.ceil(window.innerHeight / this.state.tileHeight) * 5;

  let tiles = {};
  for (let i = 0; i < tileColumns; i++) {
    for (let j = 0; j < tileRows; j++) {
      let lat, lng, y;
      if (i % 2 === 0) {
        lat = (startingLat - j * degreeIncrement).toFixed(5);
        lng = (startingLng + i * degreeIncrement).toFixed(4);
        y = j * tileHeight;
      } else {
        lat = (startingLat - latOffset - j * degreeIncrement).toFixed(5);
        lng = (startingLng + i * degreeIncrement).toFixed(4);
        y = j * tileHeight + tileHeight / 2;
      }

      tiles[`${lat},${lng}`] = {
        id: `${lat},${lng}`,
        lat,
        lng,
        bgColor: "#333",
        color: "#eee",
        x: i * tileWidth * 0.7,
        y
      };
    }
  }
  console.log(tiles);
  return tiles;
}

function normalizeTiles(tileArray) {
  let tileObject = {};
  for (let n = 0; n < tileArray.length; n++) {
    tileObject[tileArray[n].id] = tileArray[n];
  }
  return tileObject;
}

// export function getUserData() {
//   return dispatch => {
//     const habits = IDBAdapter.all("habits").then(habits => {
//       dispatch({ type: "SET_HABITS", habits });
//     });
//
//     const user = IDBAdapter.all("user").then(user => {
//       const newUser = {
//         id: Math.random()
//           .toString(36)
//           .substr(2, 9),
//         joined: Date.now()
//       };
//
//       !user.length
//         ? IDBAdapter.create("user", newUser).then(user => {
//             console.log(user, newUser);
//             debugger;
//             dispatch({ type: "SET_USER", user });
//           })
//         : dispatch({ type: "SET_USER", user });
//     });
//   };
// }
//
// export function checkIn(habitId, data) {
//   const checkIn = { habitId, ...data };
//   return dispatch => {
//     IDBAdapter.create("check-ins", checkIn).then(() => {
//       dispatch({ type: "ADD_CHECKIN", checkIn });
//     });
//   };
// }
//
// export function createHabit({
//   user_id,
//   frequency,
//   hour,
//   minute,
//   ampm,
//   habit,
//   logType,
//   quantity,
//   unit
// }) {
//   const id = Math.round(Math.random() * 100000);
//   const newHabit = {
//     id,
//     user_id,
//     habit,
//     frequency,
//     hour,
//     minute,
//     ampm,
//     logType,
//     quantity,
//     unit,
//     created_at: Date.now(),
//     checkins: []
//   };
//   return dispatch => {
//     IDBAdapter.create("habits", newHabit)
//       .then(newHabit => dispatch({ type: "CREATE_HABIT", habit: newHabit }))
//       .catch(console.log);
//   };
// }
