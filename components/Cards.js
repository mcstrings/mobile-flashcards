import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Platform,
    StyleSheet,
    FlatList
} from 'react-native'

export default class Cards extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`
    })

    render() {
        const { navigation } = this.props
        const { getCards, deckID } = navigation.state.params

        return (
            <View style={styles.container}>
                <View style={styles.center}>
                    <Text style={styles.noOfCards}>
                        {getCards(deckID).length}
                    </Text>
                    <Text style={styles.cards}>Cards</Text>
                </View>

                <View style={styles.bottom}>
                    <TouchableOpacity
                        style={
                            Platform.OS === 'ios'
                                ? styles.iosSubmitOutlineBtn
                                : styles.androidSubmitOutlineBtn
                        }
                        onPress={() => navigation.navigate('NewQuestion')}
                    >
                        <Text style={styles.submitOutlineBtnText}>
                            Add a Card...
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={
                            Platform.OS === 'ios'
                                ? styles.iosSubmitBtn
                                : styles.androidSubmitBtn
                        }
                        onPress={() => navigation.navigate('Question')}
                    >
                        <Text style={styles.submitBtnText}>Start the Quiz</Text>
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
    bottom: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    cards: {
        fontSize: 48
    },
    noOfCards: {
        fontSize: 96
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
    iosSubmitOutlineBtn: {
        backgroundColor: 'white',
        padding: 10,
        borderColor: '#007AFF',
        borderWidth: 1,
        borderRadius: 4,
        height: 45,
        marginBottom: 4
    },
    androidSubmitOutlineBtn: {
        backgroundColor: 'white',
        padding: 10,
        borderColor: '#007AFF',
        borderWidth: 1,
        borderRadius: 4,
        height: 45,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitOutlineBtnText: {
        color: '#007AFF',
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
