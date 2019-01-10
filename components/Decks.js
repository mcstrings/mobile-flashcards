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
        decks: [],
        cards: []
    }

    componentDidMount = async () => {
        const data = await getDecks()
        this.setState({
            decks: data.Decks,
            cards: data.Cards
        })
    }

    getDecks = () => {
        return this.state.decks
    }

    getDeck = (id) => {
        
    }

    getCards = (deckID) => {
        const { decks } = this.state
        return decks[deckID].cards
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={Object.values(this.state.decks)}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('Cards', {
                                    deckID: item.id,
                                    getCards: this.getCards,
                                    title: item.title
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
                            this.props.navigation.navigate('NewDeck')
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
        // marginLeft: 40,
        // marginRight: 40
    },
    androidSubmitBtn: {
        backgroundColor: '#007AFF',
        padding: 10,
        // paddingLeft: 30,
        // paddingRight: 30,
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
