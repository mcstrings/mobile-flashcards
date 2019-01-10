import { AsyncStorage } from 'react-native'

export const FLASHCARDS_KEY = 'Flashcards'
export const FLASHCARDS_DECKS_KEY = 'Flashcard:decks'
export const FLASHCARDS_CARDS_KEY = 'Flashcard:cards'

async function setData() {
    let decks = {
        webdevelopment: {
            id: 'webdevelopment',
            title: 'Web Development',
            cards: ['aajgz2al4570w1ud96bd9f', 'jiqmdod63poiovk75e9i8g']
        },
        fruits: {
            id: 'fruits',
            title: 'Fruits',
            cards: [
                '6trmozuodrr947cc3rdxth',
                'tjat00a5u1shhy9k0sz4d',
                'gtec1v290jj40hgatfoyqf'
            ]
        },
        breakfastfoods: {
            id: 'breakfastfoods',
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

    let flashcards = {
        Decks: { ...decks },
        Cards: { ...cards }
    }

    try {
        return await AsyncStorage.setItem(
            FLASHCARDS_KEY,
            JSON.stringify(flashcards)
        )
    } catch (error) {
        console.log('ERROR: ', error)
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
// getDeck: take in a single id argument and return the deck associated with that id.
// saveDeckTitle: take in a single title argument and add it to the decks.
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
export async function getDecks() {
    try {
        // Remove the key for debugging purposes
        // await AsyncStorage.removeItem(FLASHCARDS_KEY)

        const results = await AsyncStorage.getItem(FLASHCARDS_KEY)
        return results === null ? setData() : JSON.parse(results)
    } catch (error) {
        console.log('ERROR: ', error)
    }
}

export async function getDeck(id) {
    try {
        const results = await AsyncStorage.getItem(FLASHCARDS_KEY)
        const data = results === null ? null : JSON.parse(results)
        if (data) {
            return data.Decks[id]
        }
        return null
    } catch (error) {
        console.log('ERROR: ', error)
    }
}

export async function saveDeckTitle(title) {}

export async function addCardToDeck(title, card) {}
