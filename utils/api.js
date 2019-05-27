import { AsyncStorage } from 'react-native'

export const FLASHCARDS_STORAGE_KEY = 'Flashcards:decklist'

export function getDeckList() {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((decks) => JSON.parse(decks))
}

export function saveDeck(key, deck) {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [key]: deck,
  }))
}

export function deleteDeck(key) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
    })
}

export function extractKey(object, value) {
  return Object.keys(object).find(key => object[key] === value)
}