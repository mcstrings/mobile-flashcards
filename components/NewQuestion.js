import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Platform,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView
} from 'react-native'
import { addCardToDeck } from '../utils/api'

export default class NewQuestion extends Component {
    state = { question: '', answer: '' }

    handleSavePress = async () => {
        const { navigation } = this.props
        const {
            addCardToState,
            deckID,
            title,
            getCards
        } = navigation.state.params
        const { question, answer } = this.state

        try {
            // Create the card
            const cardBlob = {
                question,
                answer
            }

            const cardAndDeck = await addCardToDeck(title, cardBlob, deckID)
            const { card, deck } = cardAndDeck

            // Update the state
            const s = addCardToState(card, deck, () =>
                navigation.navigate('Cards', {
                    deckID,
                    title,
                    addCardToState,
                    getCards
                })
            )

            // console.log('New Question state', s)
        } catch (error) {
            console.log('ERROR new question save', error)
        }
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                keyboardVerticalOffset="80"
            >
                <Text style={styles.label}>Question</Text>
                <TextInput
                    // multiline={true}
                    style={{
                        fontSize: 16,
                        height: 60,
                        borderColor: 'gray',
                        borderWidth: 1
                    }}
                    onChangeText={(text) => this.setState({ question: text })}
                    value={this.state.question}
                />

                <Text style={styles.label}>Answer</Text>
                <TextInput
                    // multiline={true}
                    style={{
                        fontSize: 16,
                        height: 60,
                        borderColor: 'gray',
                        borderWidth: 1
                    }}
                    onChangeText={(text) => this.setState({ answer: text })}
                    value={this.state.answer}
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
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white'
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
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
