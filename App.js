import React from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Constants } from 'expo';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import reducer from './reducers'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'
import NewCard from './components/NewCard'
import Quiz from './components/Quiz'
import { setLocalNotification, clearLocalNotifications } from './utils/helpers'


function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const TabsData = {
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-circle' size={30} color={tintColor} />
    }
  },
}

const TabsOptions = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    style: {
      height: 56,
    },
  }
}

const Tabs = Platform.OS === 'android' ? createMaterialTopTabNavigator(TabsData, TabsOptions) : createBottomTabNavigator(TabsData, TabsOptions)

const AppNavigator = createAppContainer(createStackNavigator({
  home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    },
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      header: null,
    },
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      header: null,
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      header: null,
    }
  }
}))

export default class App extends React.Component {
  componentDidMount() {
    //clearLocalNotifications()
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <AppStatusBar backgroundColor={'#000000'} barStyle='light-content' />
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
