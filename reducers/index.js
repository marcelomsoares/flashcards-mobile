import { GET_ALL_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function decks(state = {}, action) {
  switch (action.type) {
    case GET_ALL_DECKS:
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.deck,
      }
    case ADD_CARD:
      return {
        ...state,
        ...action.deck,
      }
    default:
      return state
  }
}

export default decks