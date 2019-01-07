import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { Constants } from 'expo'
import Decks from './components/Decks'
import Cards from './components/Cards'
import Question from './components/Question'
import Answer from './components/Answer'
import Score from './components/Score'
import NewDeck from './components/NewDeck'
import NewQuestion from './components/NewQuestion';

function UdaciStatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar
                translucent
                // backgroundColor={backgroundColor}
                {...props}
            />
        </View>
    )
}

// const MainContainer = createAppContainer(MainNavigator)

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <UdaciStatusBar barStyle="dark-content" />
                {/* <Decks /> */}
                {/* <Cards /> */}
                {/* <Question /> */}
                <Answer />
                {/* <Score /> */}
                {/* <NewDeck /> */}
                {/* <NewQuestion /> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})
