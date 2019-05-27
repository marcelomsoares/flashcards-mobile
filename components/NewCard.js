import React, { Component } from 'react'
import {
  StyleSheet, TextInput, KeyboardAvoidingView,
  TouchableOpacity, Text
} from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { saveDeck } from '../utils/api'
import { NavigationActions } from 'react-navigation'

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
  }

  disableSubmitButton() {
    return this.state.question === '' || this.state.answer === ''
  }

  onCreateCardPress = () => {
    const { deck, deckKey } = this.props

    const newCard = {
      question,
      answer,
    } = this.state

    deck.cards.push(newCard)

    this.props.dispatch(addCard(newCard))
    saveDeck(deckKey, deck)

    this.setState(() => ({
      question: '',
      answer: ''
    }))

    this.props.navigation.goBack()
  }

  backToDeck = () => {
    this.props.navigation.dispatch(NavigationActions.back({
      key: 'NewCard'
    }))
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}
        behavior='padding' enabled>
        <TextInput value={this.state.question} style={styles.question}
          onChangeText={(question) => this.setState({ question })}
          placeholder={'Type your Question...'} />

        <TextInput value={this.state.answer} style={styles.answer}
          onChangeText={(answer) => this.setState({ answer })}
          placeholder={'Type your Answer...'} />

        <TouchableOpacity style={[styles.button, this.disableSubmitButton() === true ? styles.disabledButton : styles.enabledButton]}
          onPress={this.onCreateCardPress}
          disabled={this.disableSubmitButton() === true}>
          <Text>Create Card</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
  question: {
    fontSize: 24,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    margin: 15,
  },
  answer: {
    fontSize: 24,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    margin: 15,
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

function mapStateToProps(decks, { navigation }) {
  const { deckKey } = navigation.state.params
  return {
    decks,
    deck: decks[deckKey],
    deckKey,
  }
}

export default connect(mapStateToProps)(NewCard)