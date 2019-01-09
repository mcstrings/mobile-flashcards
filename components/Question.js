import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import TextButton from './TextButton'

export default class Question extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Question 2/5, 3 remaining</Text>

                <Text style={styles.question}>
                    HTML stands for Hypertext Markup Language -- true or false?
                </Text>

                <View style={styles.bottom}>
                    <TextButton
                        style={{ padding: 10 }}
                        onPress={() => this.props.navigation.navigate('Answer')}
                    >
                        See the answer
                    </TextButton>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
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
    question: {
        fontSize: 20,
        flex: 1,
        alignSelf: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30
    }
})
