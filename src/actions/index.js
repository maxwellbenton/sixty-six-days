import IDBAdapter from "../adapter/IDBAdapter";

export function gettingUserData() {
  return {
    type: "GETTING_USER_DATA"
  };
}

// export function setUserData(payload) {
//   return {
//     type: "SET_USER_DATA",
//     payload
//   };
// }

export function createHabit({
  user_id,
  frequency,
  hour,
  minute,
  ampm,
  habit,
  logType,
  quantity,
  unit
}) {
  let id = Math.round(Math.random() * 100000);
  debugger;
  return {
    type: "CREATE_HABIT",
    payload: {
      [id]: {
        id,
        user_id,
        habit,
        frequency,
        hour,
        minute,
        ampm,
        logType,
        quantity,
        unit
      }
    }
  };
}
