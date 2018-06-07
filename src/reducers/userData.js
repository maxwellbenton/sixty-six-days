export default function userData(
  state = {
    user: { lat: null, lng: null },
    dateTime: Date.now()
  },
  action
) {
  switch (action.type) {
    // case "SET_USER":
    //   return {
    //     ...state,
    //     user: action.user[0]
    //   };
    //
    // case "CREATE_HABIT":
    //   return {
    //     ...state,
    //     habits: {
    //       ...state.habits,
    //       [Object.keys(state.habits).length + 1]: action.habit
    //     }
    //   };
    default:
      return state;
  }
}
