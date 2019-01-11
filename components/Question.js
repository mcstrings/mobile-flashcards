import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import TextButton from './TextButton'
import Answer from './Answer';

export default class Question extends Component {
    state = {
        cards: [],
        currentCardIndex: 0,
        showAnswer: false,
        isFinishedQuiz: false,
        score: 0
    }

    componentDidMount = () => {
        const { navigation } = this.props
        const { getCards, deckID, appState } = navigation.state.params

        const cardIDs = getCards(deckID)

        const cards = cardIDs.map((cardID) => {
            return appState.cards[cardID]
        })

        // console.log('what is cards?', cards)

        this.setState({
            cards
        })
    }

    handleToAnswer = () => {
        this.setState({
            showAnswer: true
        })
    }

    handleToQuestion = () => {
        this.setState({
            showAnswer: false
        })
    }

    render() {
        const {
            cards,
            currentCardIndex,
            showAnswer,
            isFinishedQuiz,
            score
        } = this.state

        const card = cards[currentCardIndex]
        const total = cards.length
        const remaining = total - (currentCardIndex + 1)

        return (
            <View style={styles.container}>
                <Text>
                    Question {currentCardIndex + 1} of {total},{' '}
                    {remaining} remaining
                </Text>

                {showAnswer ? (
                    <Answer answer={card && card.answer} />
                ) : (
                    <Text style={styles.question}>{card && card.question}</Text>
                )}

                <View style={styles.bottom}>
                    {showAnswer ? (
                        <TextButton
                            style={{ padding: 10 }}
                            onPress={() => this.handleToQuestion()}
                        >
                            Go back to the question
                        </TextButton>
                    ) : (
                        <TextButton
                            style={{ padding: 10 }}
                            onPress={() => this.handleToAnswer()}
                        >
                            See the answer
                        </TextButton>
                    )}
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
        justifyContent: 'flex-end'
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
        fontSize: 40,
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
