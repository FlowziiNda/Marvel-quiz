import React , {Component, Fragment}from 'react'
import QuizOver from '../QuizOver'
import Levels from '../Levels'
import { FaChevronRight } from 'react-icons/fa';
import ProgressBar from '../ProgressBar'
import { QuizMarvel } from '../Quizmarvel'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  
toast.configure();

const initiaState = {
    quizLevel: 0,
    maxQuestions: 10,
    storedQuestions: [],
    question: null,
    options : [],
    idQuestion : 0,
    btnDisabled: true ,
    userAnswer: null,
    score: 0,
    showWelcomeMsg: false,
    quizEnd : false,
    percent : null,
    }

const levelNames = ["debutant","confirme","expert"]

class Quiz extends Component{

constructor(props) {
    super(props)
    this.state = initiaState
    this.storedDataRef = React.createRef()

}




storedDataRef = React.createRef()


loadQuestions= quizz =>{

const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
if(fetchedArrayQuiz.length >= this.state.maxQuestions){

    this.storedDataRef.current = fetchedArrayQuiz;


    const newArray = fetchedArrayQuiz.map(( {answer, ...keepRest}) => keepRest );
    
    this.setState({storedQuestions: newArray})
 

}
}

showToastMsg = Pseudo =>{
    if(!this.state.showWelcomeMsg){

    this.setState({showWelcomeMsg : true})

        toast.warn(`Bienvenue ${Pseudo}, Et bonne chance`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            });
    }
    
}

componentDidMount() {
    this.loadQuestions(levelNames[this.state.quizLevel])
}

nextQuestion= () => {
    if (this.state.idQuestion === this.state.maxQuestions -1 ){

        this.setState({ quizEnd: true})
    }else{

        this.setState((prevState) => ({idQuestion: prevState.idQuestion + 1}))

        
            
    }

    
    

    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer
    if(this.state.userAnswer ===  goodAnswer ){

        this.setState(prevState => ({ score : prevState.score + 1}))

        toast.success('Bravo +1 Point', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            bodyClassName: "toastify-color-welcome"
            });
    }else{
        toast.error('Bien essayée 0 Points', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            bodyClassName: "toastify-color-welcome"
            });
    }
}

componentDidUpdate(prevProps, prevState){
    const {

        maxQuestions,
        storedQuestions,
        idQuestion,
        score,
        quizEnd,
    
    } = this.state

    if((storedQuestions !==  prevState.storedQuestions) && storedQuestions.length  ){
       this.setState({
       question: storedQuestions[idQuestion].question ,
       options : storedQuestions[idQuestion].options ,
       })
    }

    if((idQuestion !== prevState.idQuestion) && storedQuestions.length ){
        this.setState({
            question: storedQuestions[idQuestion].question ,
            options : storedQuestions[idQuestion].options,
            userAnswer: null,
            btnDisabled: true,
        })
    }

    if(quizEnd !== prevState.quizEnd){
        const gradePercent = this.getPercentage(maxQuestions, score)
        this.gameOver(gradePercent)
    }

    if(this.props.userData.Pseudo !== prevProps.userData.Pseudo){
        this.showToastMsg(this.props.userData.Pseudo)
    }
}

submitAnswer = selectedAnswer => {
this.setState({
    userAnswer: selectedAnswer,
    btnDisabled: false,
})
}

getPercentage = (maxQuest,ourScore) => (ourScore/ maxQuest) * 100


gameOver = percent => {



if (percent >= 50){
this.setState({
    quizLevel: this.state.quizLevel + 1,
    percent
    
})
}else{
    this.setState({
        percent
    
    })    


}


}

loadLevelQuestions = (param) =>{
this.setState({...initiaState, quizLevel: param})

this.loadQuestions(levelNames[param])

}

render(){

  const {

  
    quizLevel,
    maxQuestions,
    question,
    options,
    idQuestion,
    btnDisabled,
    userAnswer,
    score,
    quizEnd,
    percent,
} = this.state



const displayOption =options.map((option, index) => {
return(
    <p key = {index}
     className=
     {`answerOptions ${userAnswer === option ? "selected" : null}`} 
     onClick={() => this.submitAnswer(option)}
     >
     <FaChevronRight/>  {option} 
     </p>
)
})

 return quizEnd ?(
    <QuizOver
    ref = {this.storedDataRef}
    levelNames={levelNames}
    score = {score}
    maxQuestions={maxQuestions}
    quizLevel = {quizLevel}
    percent = {percent}
    loadLevelQuestions ={this.loadLevelQuestions}
    />
) : (
    <Fragment>
        <Levels
        levelNames={levelNames}
        quizLevel = {quizLevel}
        />
        <ProgressBar 
        idQuestion={idQuestion}
        maxQuestions = {maxQuestions}        
        />
        <h2>{question}</h2>

        {displayOption}
        <button disabled={btnDisabled}
         className="btnSubmit"
         onClick={this.nextQuestion}
         >
         {idQuestion < maxQuestions - 1 ? "Suivant" : "Terminer"}
         </button>
    </Fragment>
)
}
}




export default Quiz
