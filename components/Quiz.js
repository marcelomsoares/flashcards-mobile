import React, { Component } from 'react'
import { Text, StyleSheet, Animated, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { setLocalNotification, clearLocalNotifications } from '../utils/helpers'

const QUESTION = 'QUESTION'
const ANSWER = 'ANSWER'

class Quiz extends Component {

  state = {
    currentQuestionIndex: 0,
    correctAnswers: 0,
    cardSide: QUESTION,
    height: new Animated.Value(0),
    width: new Animated.Value(0),
  }

  componentDidMount() {
    this.animateFlipCard()
  }

  animateFlipCard = () => {
    Animated.spring(this.state.height, { toValue: 200, speed: 1 })
      .start()
    Animated.spring(this.state.width, { toValue: 350, speed: 1 })
      .start()
  }

  flipCard = () => {
    const { cardSide } = this.state
    this.setState(() => ({
      cardSide: cardSide === QUESTION ? ANSWER : QUESTION
    }))
  }

  handleCorrectAnswer = () => {
    const { correctAnswers, currentQuestionIndex } = this.state
    this.setState(() => ({
      correctAnswers: correctAnswers + 1,
      currentQuestionIndex: currentQuestionIndex + 1,
      cardSide: QUESTION,
    }))
  }

  handleIncorrectAnswer = () => {
    const { currentQuestionIndex } = this.state
    this.setState(() => ({
      currentQuestionIndex: currentQuestionIndex + 1,
      cardSide: QUESTION,
    }))
  }

  backToDeck = () => {
    const { deckKey } = this.props
    this.props.navigation.navigate(
      'Deck',
      { deckKey, }
    )
  }

  createNotificationForTomorrow = () => {
    clearLocalNotifications()
      .then(setLocalNotification())
  }

  renderAnswer = () => {
    return this.state.cardSide === ANSWER
  }

  render() {
    const { height, width } = this.state

    if (this.state.currentQuestionIndex === this.props.deck.cards.length) {
      this.createNotificationForTomorrow()
      return (
        <View style={styles.container}>
          <Text style={styles.finishedQuizMessage}>You finished the quiz!</Text>

          <Text style={styles.quizResults}>You got {this.state.correctAnswers} answer(s) right out of {this.props.deck.cards.length} total.</Text>

          <TouchableOpacity style={styles.correctButton}
            onPress={() => {
              const deckKey = this.props.deckKey
              this.props.navigation.push(
                'Quiz',
                { deckKey, }
              )
            }}>
            <Text>Restart quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.incorrectButton}
            onPress={this.backToDeck}>
            <Text>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.questionCounter}>
          Question {this.state.currentQuestionIndex + 1} of {this.props.deck.cards.length}
        </Text>

        <Animated.View style={[styles.questionContainer, { height, width }]}>
          {this.renderAnswer() === false ?
            <Text style={styles.questionText}>
              {this.props.deck.cards[this.state.currentQuestionIndex].question}
            </Text>
            : <Text style={styles.questionText}>
              {this.props.deck.cards[this.state.currentQuestionIndex].answer}
            </Text>
          }

          <TouchableOpacity onPress={() => {
            this.flipCard()
            this.animateFlipCard()
          }
          }>
            <Text style={styles.flipCardText}>{this.renderAnswer() === false ? 'Show Answer' : 'Show Question'}</Text>
          </TouchableOpacity>

          {this.renderAnswer() === true &&
            <View>
              <TouchableOpacity style={styles.correctButton}
                onPress={this.handleCorrectAnswer}>
                <Text>Correct</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.incorrectButton}
                onPress={this.handleIncorrectAnswer}>
                <Text>Incorrect</Text>
              </TouchableOpacity>
            </View>
          }

        </Animated.View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 30,
    marginBottom: 20,
  },
  questionCounter: {
    fontSize: 15,
    color: 'gray',
    marginBottom: 20,
  },
  flipCardText: {
    color: 'red'
  },
  correctButton: {
    backgroundColor: 'green',
    alignItems: 'center',
    margin: 10,
    padding: 15,
  },
  incorrectButton: {
    backgroundColor: 'red',
    alignItems: 'center',
    margin: 10,
    padding: 15,
  },
  finishedQuizMessage: {
    color: 'green',
    fontSize: 30,
    marginBottom: 10,
  },
  quizResults: {
    fontSize: 20,
    marginBottom: 20,
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

export default connect(mapStateToProps)(Quiz)