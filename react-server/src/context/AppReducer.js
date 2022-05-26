export default (state, action) => {
    switch(action.type) {
      case 'REMOVE_GAME':
        return {
          Selected: state.Selected.filter(game => game !== action.payload)
        }
      case 'ADD_GAME':
          console.dir(action);
        return {
          Selected: [action.payload, ...state.Selected]
        }
      default:
        return state;
    }
  }