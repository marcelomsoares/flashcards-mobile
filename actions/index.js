export const GET_ALL_DECKS = 'GET_ALL_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export function getAllDecks(decks) {
  return {
    type: GET_ALL_DECKS,
    decks,
  }
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function addCard(card) {
  return {
    type: ADD_CARD,
    card,
  }
}