import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Platform,
    StyleSheet,
    FlatList
} from 'react-native'
import { getDecks } from '../utils/api'

export default class Decks extends Component {
    state = {
        decks: {},
        cards: {}
    }

    componentDidMount = async () => {
        const flashcards = await getDecks()
        this.setState({
            ...flashcards
        })
    }

    addDeckToState = (deck) => {
        const key = Object.keys(deck)[0]
        const val = Object.values(deck)[0]

        this.setState({
            decks: {
                ...this.state.decks,
                [key]: val
            }
        })
    }

    addCardToState = (card, deck, cb) => {
        const cardKey = Object.keys(card)[0]
        const cardVal = Object.values(card)[0]
        const deckKey = Object.keys(deck)[0]
        const deckVal = Object.values(deck)[0]

        this.setState({
            cards: {
                ...this.state.cards,
                [cardKey]: cardVal
            },
            decks: {
                ...this.state.decks,
                [deckKey]: deckVal
            }
        }, cb)

        return this.state
    }

    getCards = (deckID) => {
        const { decks } = this.state
        return decks[deckID].cards
    }
    
    sortByTitle = (arr) => {
        return Object.values(arr).sort((a, b) => {
            a_title = a.title.toUpperCase()
            b_title = b.title.toUpperCase()

            if (a_title < b_title) {
                return -1
            }
            if (a_title > b_title) {
                return 1
            }

            // names must be equal
            return 0
        })       
    }

    render() {
        const sortedDecks = this.sortByTitle(Object.values(this.state.decks))

        console.log('Decks.js', this.state);

        return (
            <View style={styles.container}>
                <FlatList
                    data={sortedDecks}
                    keyExtractor={(item) => {
                        return item.id
                    }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('Cards', {
                                    deckID: item.id,
                                    getCards: this.getCards,
                                    title: item.title,
                                    addCardToState: this.addCardToState
                                })
                            }}
                        >
                            <View>
                                <Text style={styles.listItem}>
                                    {item.title}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />

                <View style={styles.bottom}>
                    <TouchableOpacity
                        style={
                            Platform.OS === 'ios'
                                ? styles.iosSubmitBtn
                                : styles.androidSubmitBtn
                        }
                        onPress={() =>
                            this.props.navigation.navigate('NewDeck', {
                                addDeckToState: this.addDeckToState,
                                getCards: this.getCards,
                                addCardToState: this.addCardToState
                            })
                        }
                    >
                        <Text style={styles.submitBtnText}>
                            Create a Deck...
                        </Text>
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
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    listItem: {
        fontSize: 22,
        marginBottom: 12
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end'
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
