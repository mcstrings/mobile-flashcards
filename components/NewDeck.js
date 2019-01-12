import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Platform,
    StyleSheet,
    TextInput
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { saveDeckTitle } from '../utils/api'

export default class NewDeck extends Component {
    state = { title: '' }

    handleSavePress = async () => {
        const { navigation } = this.props
        const {
            addDeckToState,
            addCardToState,
            getCards
        } = navigation.state.params

        const newDeck = await saveDeckTitle(this.state.title)

        addDeckToState(newDeck)

        navigation.replace('Cards', {
            deckID: Object.values(newDeck)[0]['id'],
            getCards: getCards,
            title: Object.values(newDeck)[0]['title'],
            addCardToState: addCardToState
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) => this.setState({ title: text })}
                    value={this.state.title}
                />

                <View style={styles.bottom}>
                    <TouchableOpacity
                        style={
                            Platform.OS === 'ios'
                                ? styles.iosSubmitBtn
                                : styles.androidSubmitBtn
                        }
                        onPress={() => this.handleSavePress()}
                    >
                        <Text style={styles.submitBtnText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white'
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    label: {
        fontSize: 20
    },
    iosSubmitBtn: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 7,
        height: 45
    },
    androidSubmitBtn: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 2,
        height: 45,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30
    }
})
