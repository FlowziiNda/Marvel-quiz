import React, {useState, useContext, useEffect} from 'react'
import { FirebaseConext } from '../Firebase';
import Logout from '../Logout';
import Quiz from '../quiz';
import {useNavigate} from 'react-router-dom';
import Loader from '../loader';


const Welcome = () => {

const navigate = useNavigate();      

const firebase = useContext(FirebaseConext)

const [userSession, setUserSession] = useState(null)

const [userData, setUserData] = useState({})

useEffect(() => {
    
    let listener = firebase.auth.onAuthStateChanged(user =>{
        user ? setUserSession(user) : navigate("/")
    })

    if(!!userSession) {
        
        firebase.user(userSession.uid)
        .get()
        .then( doc => {
         if(doc && doc.exists){
             const myData = doc.data()
             setUserData(myData)
         }
        })
        .catch(error =>{
            console.log(error)
        })}

    

    return () => {
        listener()
    }
}, [firebase, navigate, userSession])

// eslint-disable-next-line

return userSession === null ? (
    <Loader
        loadingMsg= {"Authentification ..."}
        styling = {{textAlign: 'center' , color: '#FFFFFF'}}
        />
): (
    <div className="quiz-bg">
            <div className="container">
            <Logout/>
            <Quiz userData={userData}/>
            </div>
        </div>
)


}

export default Welcome;
