import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import TextButton from './TextButton'
import Answer from './Answer'
import Score from './Score'

export default class Question extends Component {
    initBlob = {
        cards: [],
        currentCardIndex: 0,
        showAnswer: false,
        isFinishedQuiz: false,
        guesses: [],
        score: 0
    }

    state = {
        ...this.initBlob
    }

    componentDidMount = () => {
        const { navigation } = this.props
        const { getCards, deckID } = navigation.state.params

        const cards = getCards(deckID)

        this.setState({
            cards
        })

        // console.log(' Quiz componentDidMount', cards)
    }

    resetQuiz = () => {
        const cards = this.state.cards

        this.setState({
            ...this.initBlob,
            cards
        })
    }

    handleGuess = (isCorrectGuess) => {
        const incrementCurrentCardIndex = ++this.state.currentCardIndex

        const guesses = [...this.state.guesses, isCorrectGuess ? 1 : 0]

        const isItFinishedYet =
            incrementCurrentCardIndex + 1 > this.state.cards.length
                ? true
                : false

        this.setState({
            currentCardIndex: incrementCurrentCardIndex,
            isFinishedQuiz: isItFinishedYet,
            showAnswer: false,
            guesses
        })

        // TODO: Save?
    }

    calculateScore = () => {
        const { cards, guesses } = this.state

        const length = cards.length

        const totalCorrectAnswers = guesses.reduce((prev, curr) => {
            return prev + curr
        }, 0)

        const score = parseInt((totalCorrectAnswers / length) * 100, 10)

        return score
    }

    toggleAnswer = (isShowingQuestion) => {
        this.setState({
            showAnswer: isShowingQuestion
        })
    }

    render() {
        const {
            cards,
            currentCardIndex,
            showAnswer,
            isFinishedQuiz
        } = this.state

        const card = cards[currentCardIndex]
        const total = cards.length
        const remaining = total - (currentCardIndex + 1)

        return (
            <View style={styles.container}>
                {!isFinishedQuiz && (
                    <Text>
                        Question {currentCardIndex + 1} of {total}, {remaining}{' '}
                        remaining
                    </Text>
                )}

                {showAnswer && !isFinishedQuiz ? (
                    <Answer
                        answer={card && card.answer}
                        handleGuess={this.handleGuess}
                    />
                ) : (
                    <Text style={styles.question}>{card && card.question}</Text>
                )}

                {isFinishedQuiz ? (
                    <View style={styles.top}>
                        <Score
                            score={this.calculateScore()}
                            navigation={this.props.navigation}
                            resetQuiz={this.resetQuiz}
                        />
                    </View>
                ) : (
                    <View style={styles.bottom}>
                        {showAnswer ? (
                            <TextButton
                                style={{ padding: 10 }}
                                onPress={() => this.toggleAnswer(false)}
                            >
                                Go back to the question
                            </TextButton>
                        ) : (
                            <TextButton
                                style={{ padding: 10 }}
                                onPress={() => this.toggleAnswer(true)}
                            >
                                See the answer
                            </TextButton>
                        )}
                    </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white'
        // justifyContent: 'flex-end'
    },
    top: {
        flex: 1,
        marginTop: -100
    },
    bottom: {
        justifyContent: 'flex-end'
    },
    question: {
        fontSize: 40,
        flex: 1,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10
    }
})
