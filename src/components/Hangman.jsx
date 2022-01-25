import { useEffect, useState } from "react"
import { englishWord } from "../words"

import img0 from "../images/0.jpg";
import img1 from "../images/1.jpg";
import img2 from "../images/2.jpg";
import img3 from "../images/3.jpg";
import img4 from "../images/4.jpg";
import img5 from "../images/5.jpg";
import img6 from "../images/6.jpg";

const images = [img0, img1, img2, img3, img4, img5, img6]

const letters = 'abcdefghijklmnopqrstuvwxyz'

const words = englishWord

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length)
    return words[randomIndex]
}

export default function Hangman() {
    const [word, setWord] = useState(getRandomWord())

    const [guesses, setGuesses] = useState([])

    const wrongGuesses = guesses.filter(guess => !word.includes(guess))
    const rightGuesses = guesses.filter(guess => word.includes(guess))

    const lives = 6 - wrongGuesses.length

    const lost = lives === 0

    const won = word.split('').every(char => rightGuesses.includes(char))

    function reset() {
        setGuesses([])
        setWord(getRandomWord())
    }

    useEffect(() => {
        if (lost || won) return

        const listener = e => {
            const guess = e.key.toLowerCase()
            if (!letters.includes(guess)) return

            if (guesses.includes(guess)) return

            setGuesses([...guesses, guess])
        }
        window.addEventListener('keydown', listener)
        return () => window.removeEventListener('keydown', listener)
    }, [guesses, lost, won])

    return (
        <div className='Hangman'>
            <h1>HANGMAN</h1>
            <div>
                <img src={images[`${6 - lives}`]} alt='img0'></img>
            </div>

            <div className="word">
                {word.split('').map((char, index) => (
                    <span key={index}>{rightGuesses.includes(char) ? char : '_'}</span>
                ))}
            </div>

            <p>Wrong guesses: {wrongGuesses}</p>
            <p>Lives: {lives}</p>

            {lost ? (
                <div className='modal-wrapper'>
                    <div className='modal'>

                        <p>You lost 🤕</p>
                        <p>The word was: {word}</p>
                        <button onClick={reset}>RESET</button>

                    </div>
                </div>
            ) : null}

            {won ? (
                <div className='modal-wrapper'>
                    <div className='modal'>
                        <p>You won! 🎉</p>
                        <button onClick={reset}>RESET</button>
                    </div>
                </div>
            ) : null}

        </div>
    )
}