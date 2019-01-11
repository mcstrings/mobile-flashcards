import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Platform,
    StyleSheet
} from 'react-native'
import TextButton from './TextButton'

export default class Answer extends Component {
    render() {
        const { answer } = this.props

        return (
            <View style={styles.container}>
                <Text style={styles.answer}>{answer}</Text>

                <View style={styles.bottom}>
                    <TouchableOpacity
                        style={
                            Platform.OS === 'ios'
                                ? styles.iosCorrectGuessBtn
                                : styles.androidCorrectGuessBtn
                        }
                        // onPress={onPress}
                    >
                        <Text style={styles.submitCorrectGuessBtnText}>
                            My guess was right
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={
                            Platform.OS === 'ios'
                                ? styles.iosWrongGuessBtn
                                : styles.androidWrongGuessBtn
                        }
                        // onPress={onPress}
                    >
                        <Text style={styles.submitWrongGuessBtnText}>
                            My guess was wrong
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
    bottom: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    answer: {
        fontSize: 40,
        flex: 1,
        alignSelf: 'center'
},
    iosWrongGuessBtn: {
        backgroundColor: '#E00000',
        padding: 10,
        borderRadius: 7,
        height: 45
    },
    androidWrongGuessBtn: {
        backgroundColor: '#E00000',
        padding: 10,
        borderRadius: 2,
        height: 45,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitWrongGuessBtnText: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center'
    },
    iosCorrectGuessBtn: {
        backgroundColor: '#28AE28',
        padding: 10,
        borderColor: '#007AFF',
        borderRadius: 4,
        height: 45,
        marginBottom: 4
    },
    androidCorrectGuessBtn: {
        backgroundColor: '#28AE28',
        padding: 10,
        borderRadius: 4,
        height: 45,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitCorrectGuessBtnText: {
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
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 4
    },
    androidSubmitOutlineBtn: {
        backgroundColor: 'white',
        padding: 10,
        borderColor: '#007AFF',
        borderWidth: 1,
        paddingLeft: 30,
        paddingRight: 30,
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
