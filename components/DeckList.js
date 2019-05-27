import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { getAllDecks } from '../actions'
import { getDeckList, extractKey } from '../utils/api'

class DeckList extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    const { dispatch } = this.props

    getDeckList()
      .then((decks) => dispatch(getAllDecks(decks)))

    this.setState(() => ({
      loading: false,
    }))

  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => {
        const deckKey = extractKey(this.props.decks, item)
        this.props.navigation.navigate(
          'Deck',
          { deckKey, }
        )
      }
      }>
        <View style={styles.deckContainer}>
          <Text style={styles.deckTitle}>{item.title}</Text>
          <Text>{item.cards.length} cards</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { loading } = this.state

    if (loading === true) {
      return <AppLoading />
    }

    return (
      <View>
        <FlatList
          data={Object.values(this.props.decks)}
          keyExtractor={(item, index) => extractKey(this.props.decks, item)}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deckContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: '#38ada9'
  },
  deckTitle: {
    fontSize: 30,
  },
})

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)