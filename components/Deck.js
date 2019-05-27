import React, { Component } from 'react'
import { Text, StyleSheet, Animated, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class Deck extends Component {
  state = {
    opacity: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, { toValue: 1, duration: 2500 })
      .start()
  }

  disableStartQuizButton() {
    return this.props.deck.cards.length === 0
  }

  render() {
    const { opacity } = this.state

    return (
      <Animated.View style={[styles.container, { opacity }]}>

        <Text style={styles.deckTitle}>{this.props.deck.title}</Text>

        <Text style={styles.cardCount}>{this.props.deck.cards.length} cards</Text>

        <TouchableOpacity style={[styles.startQuizButton, this.disableStartQuizButton() === true ? styles.disabledButton : styles.enabledButton]}
          onPress={() => {
            const deckKey = this.props.deckKey
            this.props.navigation.navigate(
              'Quiz',
              { deckKey, }
            )
          }}
          disabled={this.disableStartQuizButton() === true}>
          <Text>Start a Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.newQuestionButton}
          onPress={() => {
            const deckKey = this.props.deckKey
            this.props.navigation.navigate(
              'NewCard',
              { deckKey, }
            )
          }
          }>
          <Text>Create New Question</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

function mapStateToProps(decks, { navigation }) {
  const { deckKey } = navigation.state.params
  return {
    decks,
    deck: decks[deckKey],
    deckKey,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  deckTitle: {
    fontSize: 50,
  },
  cardCount: {
    fontSize: 15,
    color: 'gray',
    marginBottom: 20,
  },
  startQuizButton: {
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'green'
  },
  newQuestionButton: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'lightblue'
  },
  enabledButton: {
    opacity: 1,
  },
  disabledButton: {
    opacity: 0.5,
  }
})

export default connect(mapStateToProps)(Deck)