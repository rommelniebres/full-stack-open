const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const incrementGood = { 
        ...state, 
        good: state.good + 1 
      }
      return incrementGood
    case 'OK':
      const incrementOK = { 
        ...state, 
        ok: state.ok + 1 
      }
      return incrementOK
    case 'BAD':
      const incrementBad = { 
        ...state, 
        bad: state.bad + 1 
      }
      return incrementBad
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer