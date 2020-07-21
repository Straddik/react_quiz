import React, {Component} from 'react'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import classes from './Quiz.module.css'


class Quiz extends Component {
    state = {
        activeQuistion: 0,
        quiz: [
            {
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                answers: [
                    {text: 'Чёрный', id: 1},
                    {text: 'Синий', id: 2},
                    {text: 'Красный', id: 3},
                    {text: 'Зелёный', id: 4}
            ]
            }
        ]
    }
    onAnswerClickHandler =  (answerId) => {
        console.log('Answer Id: ', answerId)
    }
    render () {
        return (
            <div className = {classes.Quiz}>
                <div className = {classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    <ActiveQuiz 
                    question = {this.state.quiz[0].question}
                    answers = {this.state.quiz[0].answers}
                    onAnswerClick = {this.onAnswerClickHandler}
                    quizLength = {this.state.quiz}
                    answerNumber = {this.state.activeQuistion}
                    />
                </div>
            </div>
        )
    }
}


export default Quiz