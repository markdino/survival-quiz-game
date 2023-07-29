import { useState, useEffect } from 'react'

const COUNTDOWN_TIME = 5000 // 5 secs timer
const choiceStyle = "border-4 rounded-md border-black my-4 mx-48 py-4 text-xl hover:border-yellow-400"
const selectedChoiceStyle = "border-4 rounded-md border-yellow-400 bg-yellow-500 my-4 mx-48 py-4 text-xl"
const correctChoiceStyle = "border-4 rounded-md border-green-500 bg-green-500 my-4 mx-48 py-4 text-xl"
const wrongChoiceStyle = "border-4 rounded-md border-red-500 bg-red-500 my-4 mx-48 py-4 text-xl"


const PlayerGame = ({question, choices, answer, showQuestion, startTimer, checkAnswer, eliminatePlayer}) => {
    const [ selectedAnswer, setSelectedAnswer ] = useState(null)
    const [ disableSelect, setDisableSelect ] = useState(true)

    // Choice component
    const renderChoice = (text, index) => (
        <li 
            key={text} 
            className={handleChoiceStyles(text, index)}
            onClick={() => handleSelectAnswer(index)}>
            {text}
        </li>
    )

    // Select answer interaction logic
    const handleSelectAnswer = (index) => {
        if (disableSelect) return
        if (index === selectedAnswer) {
            setSelectedAnswer(null)
            return
        }
        setSelectedAnswer(index)
    }

    // Choices color handling if answers are shown
    const handleChoiceStyles = (text, index) => {
        if (checkAnswer) {
            if (selectedAnswer === index && answer !== text) return wrongChoiceStyle
            if (answer === text) return correctChoiceStyle
            return choiceStyle
        }
        return index === selectedAnswer ? selectedChoiceStyle : choiceStyle
    }


    // Timer handler
    useEffect(() => {
        if (startTimer) {
            setDisableSelect(false)
            setTimeout(() => {
                alert("Time's Up!")
                setDisableSelect(true)
            }, COUNTDOWN_TIME)
        }
    },[startTimer])

    // Elimination handler
    useEffect(() => {
        if (checkAnswer && choices[selectedAnswer] !== answer) {
            eliminatePlayer(true)
        }
    },[checkAnswer])

    return (
        <>
        {showQuestion && (<section 
            className="flex items-center justify-center m-24 py-24 absolute top-0
                        border-4 rounded-md border-black"
            >
            <div className="text-center my-8">
                <span className='text-xl my-4'>
                    {startTimer ? <strong className="text-2xl text-green-500">Start!</strong> : "5 seconds to answer"}</span>
                <h3 className='text-3xl my-4'>Question</h3>
                <p className='text-2xl my-4 w-screen'>
                    {question}
                </p>
                <div className="flex justify-center items-center text-center my-16">
                    <ul className='w-1/2'>
                        {choices.map((choice) => renderChoice(choice, choices.indexOf(choice)))}
                    </ul>
                </div>
            </div>
        </section>)}
        </>
    )
}

export default PlayerGame