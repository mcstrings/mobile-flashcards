import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native'
import TextButton from './TextButton'

export default class Question extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 32 }}>Quiz</Text>

                <Text>Question 2/5, 3 remaining</Text>

                <Text>HTML stands for Hypertext Markup Language -- true or false?</Text>

                <TextButton style={{ padding: 10 }}>See the answer</TextButton>
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
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30
    }
})
