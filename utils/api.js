import { AsyncStorage } from 'react-native'

export const FLASHCARDS_KEY = 'Flashcards'
export const FLASHCARDS_DECKS_KEY = 'Flashcard:decks'
export const FLASHCARDS_CARDS_KEY = 'Flashcard:cards'

async function setData() {
    let decks = {
        hmrj72ctlrkcm4yav7fb: {
            id: 'hmrj72ctlrkcm4yav7fb',
            title: 'Web Development',
            cards: ['aajgz2al4570w1ud96bd9f', 'jiqmdod63poiovk75e9i8g']
        },
        zkswcrkxo8m2awnxgq22vo: {
            id: 'zkswcrkxo8m2awnxgq22vo',
            title: 'Fruits',
            cards: [
                '6trmozuodrr947cc3rdxth',
                'tjat00a5u1shhy9k0sz4d',
                'gtec1v290jj40hgatfoyqf'
            ]
        },
        ulbua9nmlec6lfxgg6dpur: {
            id: 'ulbua9nmlec6lfxgg6dpur',
            title: 'Breakfast Foods',
            cards: [
                '5v9nabgcb0uamdc9tgn8bq',
                '07ng04q3qjkwqr2fy6qmp9',
                'bt9i2ibp8xsn8fi7xfmmxi',
                'd4bpjnlfmo5ty5qt7epsc'
            ]
        }
    }

    let cards = {
        aajgz2al4570w1ud96bd9f: {
            id: 'aajgz2al4570w1ud96bd9f',
            question: 'What color is the sky?',
            answer: 'Red'
        },
        jiqmdod63poiovk75e9i8g: {
            id: 'jiqmdod63poiovk75e9i8g',
            question: 'What color is the sky?',
            answer: 'Orange'
        },
        '6trmozuodrr947cc3rdxth': {
            id: '6trmozuodrr947cc3rdxth',
            question: 'What color is the sky?',
            answer: 'Yellow'
        },
        '5v9nabgcb0uamdc9tgn8bq': {
            id: '5v9nabgcb0uamdc9tgn8bq',
            question: 'What color is the sky?',
            answer: 'Green'
        },
        tjat00a5u1shhy9k0sz4d: {
            id: 'tjat00a5u1shhy9k0sz4d',
            question: 'What color is the sky?',
            answer: 'Blue'
        },
        '07ng04q3qjkwqr2fy6qmp9': {
            id: '07ng04q3qjkwqr2fy6qmp9',
            question: 'What color is the sky?',
            answer: 'Indigo'
        },
        gtec1v290jj40hgatfoyqf: {
            id: 'gtec1v290jj40hgatfoyqf',
            question: 'What color is the sky?',
            answer: 'Violet'
        },
        bt9i2ibp8xsn8fi7xfmmxi: {
            id: 'bt9i2ibp8xsn8fi7xfmmxi',
            question: 'What color is the sky?',
            answer: 'Purple'
        },
        d4bpjnlfmo5ty5qt7epsc: {
            id: 'd4bpjnlfmo5ty5qt7epsc',
            question: 'What color is the sky?',
            answer: 'Chartreuse'
        }
    }

    try {
        return await AsyncStorage.multiSet([
            [FLASHCARDS_DECKS_KEY, JSON.stringify({ ...decks })],
            [FLASHCARDS_CARDS_KEY, JSON.stringify({ ...cards })]
        ])
    } catch (error) {
        console.log('ERROR setData: ', error)
    }
}

export function generateUID() {
    return (
        Math.random()
            .toString(36)
            .substring(2, 15) +
        Math.random()
            .toString(36)
            .substring(2, 15)
    )
}

// getDecks: return all of the decks along with their titles, questions, and answers.
export async function getDecks() {
    try {
        let results = await AsyncStorage.multiGet([
            FLASHCARDS_DECKS_KEY,
            FLASHCARDS_CARDS_KEY
        ])

        const parsed = results === null ? await setData() : results

        const flashcards = {
            decks: JSON.parse(parsed[0][1]),
            cards: JSON.parse(parsed[1][1])
        }

        return flashcards
    } catch (error) {
        console.log('ERROR getDecks: ', error)
    }
}

// getDeck: take in a single id argument and return the deck associated with that id.
export async function getDeck(id) {
    try {
        const results = await AsyncStorage.getItem(FLASHCARDS_DECKS_KEY)
        const decks = results === null ? null : JSON.parse(results)
        if (decks) {
            return decks[id]
        }
        return null
    } catch (error) {
        console.log('ERROR getDeck: ', error)
    }
}

// saveDeckTitle: take in a single title argument and add it to the decks.
export async function saveDeckTitle(title) {
    try {
        const id = generateUID()

        const newDeck = {
            [id]: { id, title, cards: [] }
        }

        await AsyncStorage.mergeItem(
            FLASHCARDS_DECKS_KEY,
            JSON.stringify(newDeck)
        )
        return newDeck
    } catch (error) {
        console.log('ERROR saveDeckTitle', error)
    }
}

// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
export async function addCardToDeck(title, card, deckID) {
    try {
        const id = generateUID()

        const newCard = {
            [id]: {
                ...card,
                id
            }
        }

        console.log('addCardToDeck', title, deckID, newCard)

        // Store the new card
        await AsyncStorage.mergeItem(
            FLASHCARDS_CARDS_KEY,
            JSON.stringify(newCard)
        )

        // Find the deck by the title
        const deck = await getDeck(deckID)

        // Add the card to the deck blob
        const updatedDeck = {
            [deckID]: { ...deck, cards: [...deck.cards, id] }
        }
        console.log('get the deck', updatedDeck)

        // Update storage
        await AsyncStorage.mergeItem(
            FLASHCARDS_DECKS_KEY,
            JSON.stringify(updatedDeck)
        )

        return { card: { ...newCard }, deck: { ...updatedDeck } }
    } catch (error) {
        console.log('ERROR addCardToDeck', error)
    }
}
