import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Platform,
    StyleSheet
} from 'react-native'

export default class Cards extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>5 Cards</Text>

                <View style={styles.bottom}>
                    <TouchableOpacity
                        style={
                            Platform.OS === 'ios'
                                ? styles.iosSubmitOutlineBtn
                                : styles.androidSubmitOutlineBtn
                        }
                        onPress={() =>
                            this.props.navigation.navigate('NewQuestion')
                        }
                    >
                        <Text style={styles.submitOutlineBtnText}>Add a Card...</Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity
                        style={
                            Platform.OS === 'ios'
                                ? styles.iosSubmitBtn
                                : styles.androidSubmitBtn
                        }
                        onPress={() =>
                            this.props.navigation.navigate('Question')
                        }
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
    iosSubmitOutlineBtn: {
        backgroundColor: 'white',
        padding: 10,
        borderColor: '#007AFF',
        borderWidth: 1,
        borderRadius: 4,
        height: 45,
        // marginLeft: 40,
        // marginRight: 40,
        marginBottom: 4
    },
    androidSubmitOutlineBtn: {
        backgroundColor: 'white',
        padding: 10,
        borderColor: '#007AFF',
        borderWidth: 1,
        // paddingLeft: 30,
        // paddingRight: 30,
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
