import React, {useState , useContext} from 'react'
import { Link,  } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import { FirebaseConext } from '../Firebase'


const Signup = () => {



const navigate = useNavigate();

const firebase = useContext(FirebaseConext)
console.log(firebase)

const data = {
  Pseudo:'',
  Email: '',
  password:'',
  confirmPassword:'',
}

const [loginData,setloginData] = useState(data);

const [error, setError] = useState('')

const handleChange = e =>{
  setloginData({...loginData,[e.target.id]: e.target.value})

}

const handleSubmite = e =>{
e.preventDefault();
const {Email,password,Pseudo} = loginData;
firebase.signupUser(Email, password)
.then( authUser =>{
    firebase.user(authUser.user.uid).set({
    Pseudo,
    Email,

    })

})
.then(() =>{
setloginData({...data})
navigate('/welcome')
})
.catch(error =>{
setError(error)
setloginData({...data})
})
}

const {Pseudo, Email,password,confirmPassword} = loginData;

const btn = Pseudo === '' || Email === '' || password === '' || password !== confirmPassword ?
<button disabled>Inscription</button> : <button>Inscription</button>

//gestions erreur
const errorMsg = error !== '' && <span>{error.message}</span>

    return (
        <div className="signUpLoginBox">
          <div className= "slContainer">
        <div className="formBoxLeftSignup">
      </div>
      <div className="formBoxRight">
      <div className="formContent">
      {errorMsg}
      <h2>Inscription</h2>
      <form onSubmit={handleSubmite}>
      <div className="inputBox">
      <input onChange={handleChange} value={Pseudo} type="text" id="Pseudo" autoComplete="off" required />
      <label htmlFor="Pseudo">Pseudo</label>
      </div>

      <div className="inputBox">
      <input onChange={handleChange} value={Email} type="email" id="Email" autoComplete="off" required />
      <label htmlFor="Email">Email</label>
      </div>

      <div className="inputBox">
      <input onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required />
      <label htmlFor="password">Mot de Passe</label>
      </div>

      <div className="inputBox">
      <input onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" autoComplete="off" required />
      <label htmlFor="confirmPassword">Confirmer le Mot de Passe</label>
      </div>
      
      {btn}
      </form>
      <div className="linkContainer"> 
      <Link className="simpleLink" to="/login"> Déja inscrit? Connectez-vous.</Link>
      </div>
      </div>
      </div>
          </div>
            </div>
    )
}

export default Signup
