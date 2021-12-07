import React,{useState,useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import { FirebaseConext } from '../Firebase'
import {useNavigate} from 'react-router-dom';


const Login = () => {

const navigate = useNavigate();    

const firebase = useContext(FirebaseConext)

const [Email, setEmail] = useState('')
const [password, setpassword] = useState('')

const [btn, setBtn] = useState(false)

const [error, setError]= useState('')

useEffect(()=>{
   if (password.length > 5 && Email !== ''){
       setBtn(true)
   }else if (btn === true){
    setBtn(false)
   }
},[password,Email, btn])

const handleSubmit = e => {
e.preventDefault()
firebase.loginUser(Email, password)
.then(user =>{
    setEmail('');
    setpassword('');
navigate('/welcome')
})
.catch( error =>{
    setError(error)
    setEmail('');
    setpassword('');
})


}

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
            <div className="formBoxLeftLogin">
      </div>
      <div className="formBoxRight">
      <div className="formContent">
      
    {error !== '' && <span>{error.message}</span>}

      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
     
      <div className="inputBox">
      <input onChange={ e =>setEmail(e.target.value)} value={Email} type="email" autoComplete="off" required />
      <label htmlFor="Email">Email</label>
      </div>

      <div className="inputBox">
      <input onChange={e =>setpassword(e.target.value)} value={password} type="password"  autoComplete="off" required />
      <label htmlFor="password">Mot de Passe</label>
      </div>


      {btn ? <button>Connexion</button> : <button disabled>Connexion</button> }

      </form>

      <div className="linkContainer"> 
      <Link className="simpleLink" to="/signup">Nouveau sur Marvel Quiz ? Inscrivez-vous Maintenant.</Link>
      <br/>
      <Link className="simpleLink" to="/forgetpassword">Mot De Passe Oublié , Recupérer le ici</Link>
      
      </div>
      </div>
      </div>
          </div>
            </div>
    )
        
}

export default Login
