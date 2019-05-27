import React, { Component } from 'react'
import {
  Text, StyleSheet, TextInput, KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { saveDeck } from '../utils/api'
import { NavigationActions } from 'react-navigation'

class NewDeck extends Component {
  state = {
    deckTitle: '',
  }

  onCreateDeckPress = () => {
    const newDeck = {
      title: this.state.deckTitle,
      cards: [],
    }

    this.setState(() => ({
      deckTitle: '',
    }))

    const uuidv1 = require('uuid/v1');
    const key = uuidv1()

    this.props.dispatch(addDeck({[key]: newDeck}))
    saveDeck(key, newDeck)

    this.backToDeck(key)
  }

  backToDeck = (deckKey) => {
    this.props.navigation.navigate(
      'Deck',
      { deckKey, }
    )
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
        <Text style={styles.newDeckTitle}>Your new deck title:</Text>
        <TextInput style={styles.deckTitleInput} value={this.state.deckTitle}
          onChangeText={(deckTitle) => this.setState({ deckTitle })}
          placeholder={'Deck title...'} />
        <TouchableOpacity style={[styles.button, this.state.deckTitle === '' ? styles.disabledButton : styles.enabledButton]}
          onPress={this.onCreateDeckPress}
          disabled={this.state.deckTitle === ''}>
          <Text>Create Deck</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(decks) {
  return {
    decks
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newDeckTitle: {
    fontSize: 30,
    marginBottom: 20,
  },
  deckTitleInput: {
    width: 500,
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
    alignItems: 'center',
    padding: 10
  },
  enabledButton: {
    backgroundColor: '#DDDDDD',
  },
  disabledButton: {
    backgroundColor: '#EEEEEE',
  }
})

export default connect(mapStateToProps)(NewDeck)