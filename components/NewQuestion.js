import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Platform,
    StyleSheet,
    TextInput
} from 'react-native'

export default class NewQuestion extends Component {
    state = { question: '', answer: '' }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 32 }}>Add a Card</Text>

                <Text>Question</Text>
                <TextInput
                    multiline={true}
                    style={{ height: 120, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) => this.setState({ question: text })}
                    value={this.state.question}
                />

                <Text>Answer</Text>
                <TextInput
                    multiline={true}
                    style={{ height: 120, borderColor: 'gray', borderWidth: 1 }}
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
                        // onPress={onPress}
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
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    score: {
        alignItems: 'center',
        color: '#28AE28',
        fontSize: 100
    },
    iosSubmitBtn: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 7,
        height: 45,
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
