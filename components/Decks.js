import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Platform,
    StyleSheet,
    FlatList
} from 'react-native'
import { createStackNavigator } from 'react-navigation'

export default class Decks extends Component {
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={[{ key: 'a' }, { key: 'b' }]}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('Cards')
                            }}
                        >
                            <View>
                                <Text style={styles.listItem}>{item.key}</Text>
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
                        onPress={
                            () => this.props.navigation.navigate('NewDeck')
                            // this.props.navigation.navigate('NewDeck', {
                            //     deckId: key
                            // })
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
