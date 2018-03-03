export default function userData(
  state = {
    currentUser: { user: {} },
    user: null,
    dateTime: Date.now(),
    notes: [],
    dataLoaded: false
  },
  action
) {
  switch (action.type) {
    case "SET_NOTES":
      return {
        ...state,
        notes: action.payload
      };

    case "ADD_NOTE":
      return {
        ...state,
        notes: [...state.notes, action.payload]
      };
    case "UPDATE_NOTE":
      let newNotes = state.notes.filter(note => {
        if (note.id !== action.payload.id) {
          return note;
        }
      });
      newNotes = [...newNotes, action.payload];
      return { ...state, notes: newNotes };

    case "REMOVE_NOTE":
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload)
      };
    default:
      return state;
  }
}
