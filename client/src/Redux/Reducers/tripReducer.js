const tripReducer = (state =[], action) => {
  switch(action.type){
    case 'SET_HPOSTS':
      return [...action.payload]
    case 'UPDATE_HPOSTS':
      return [action.payload,...state]
    default:
      return state  
  }
}

export default tripReducer