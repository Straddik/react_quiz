import React, {Component} from 'react'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import classes from './Quiz.module.css'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'


class Quiz extends Component {
    state = {
        results: {}, //{[id]: 'success' 'error'}
        isFinished: true,
        activeQuistion: 0,
        answerState: null, // {[id]: 'success 'error'}
        quiz: [
            {
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                id: 1,
                answers: [
                    {text: 'Чёрный', id: 1},
                    {text: 'Синий', id: 2},
                    {text: 'Красный', id: 3},
                    {text: 'Зелёный', id: 4}
            ]
            },
            {
                question: 'Какого цвета крокодил?',
                rightAnswerId: 4,
                id: 2,
                answers: [
                    {text: 'Чёрный', id: 1},
                    {text: 'Синий', id: 2},
                    {text: 'Красный', id: 3},
                    {text: 'Зелёный', id: 4}
            ]
            },
            {
            question: 'В каком году основали Санкт-Петербург?',
            rightAnswerId: 3,
            id: 3,
            answers: [
                {text: '1699', id: 1},
                {text: '1024', id: 2},
                {text: '1703', id: 3},
                {text: '1705', id: 4}
        ]
        }
        ]
    }
    onAnswerClickHandler =  (answerId) => {
        const question = this.state.quiz[this.state.activeQuistion]
        const results = this.state.results
        if (question.rightAnswerId === answerId){
            if (!results[this.state.activeQuistion]) {
                results[this.state.activeQuistion] = 'success'
                this.setState ( {
                    results
                })
            }
            this.setState ( {
                answerState: {[answerId]: 'success'},
            })
            const timeout = window.setTimeout(()=>{
                if(this.isQuizFinished()) {
                    this.setState({
                        isFinished: true,
                    })
                } else {
                    this.setState({
                        activeQuistion: this.state.activeQuistion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)
           
        } else {
            results[this.state.activeQuistion] = 'error'
            this.setState ( {
                answerState: {[answerId]: 'error'},
                results
            })
        }

    }
    isQuizFinished() {
        return this.state.activeQuistion + 1 === this.state.quiz.length 
    }
    retryHandler = () => {
        this.setState({
            activeQuistion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }
    render () {
        return (
            <div className = {classes.Quiz}>
                <div className = {classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.isFinished 
                        ? <FinishedQuiz 
                        results = {this.state.results}
                        quiz={this.state.quiz}
                        onRetry={this.retryHandler}
                        />
                        :
                        <ActiveQuiz 
                    question = {this.state.quiz[this.state.activeQuistion].question}
                    answers = {this.state.quiz[this.state.activeQuistion].answers}
                    onAnswerClick = {this.onAnswerClickHandler}
                    quizLength = {this.state.quiz.length}
                    answerNumber = {this.state.activeQuistion + 1}
                    state = {this.state.answerState}
                    />
                    }
                </div>
            </div>
        )
    }
}


export default Quiz