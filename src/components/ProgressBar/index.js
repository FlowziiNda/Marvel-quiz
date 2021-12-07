import React, {Fragment} from 'react'

const ProgressBar = ({idQuestion,maxQuestions}) => {
    
const getWidth = (totalQuestions , questionsId) => {
    return (100 /totalQuestions ) * questionsId;
}

const actualQuestions = idQuestion + 1;
const  progressPercent = getWidth(maxQuestions , actualQuestions )

console.log( progressPercent)

    return (
        <Fragment>
        <div className="percentage">
           <div className="progressPercent"> {`Questions: ${idQuestion + 1}/${maxQuestions}`}</div>
           <div className="progressPercent"> {`Progression : ${progressPercent}%`}</div>
           </div>
           <div className="progressBar">
           <div className="progressBarChange" style ={{width: `${progressPercent}%`}}/>
           
           </div>
        
        </Fragment>
    )
}

export default React.memo(ProgressBar);
