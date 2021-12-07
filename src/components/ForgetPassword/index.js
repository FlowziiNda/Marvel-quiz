import React,{useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { FirebaseConext } from '../Firebase'
import { useNavigate } from 'react-router'



const ForgetPassword = () => {

const navigate = useNavigate();    

const firebase = useContext(FirebaseConext)


const [Email, setEmail] = useState('')    

const [succes, setSucces] = useState(null)

const [error, setError] = useState(null)

const handleSubmit = e =>{
e.preventDefault();
firebase.passwordReset(Email)
.then(() => {
setError(null)
setSucces(`Consulter Votre Email ${Email} Pour Changer le Mot De Passe`)
setEmail('')

setTimeout(() => {
    navigate('/login')
}, 5000);
})
.catch (error => {
setError(error)
setEmail('')
})

}

 const disabled = Email === ""

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
            <div className="formBoxLeftForget">
      </div>
      <div className="formBoxRight">
      <div className="formContent">
      
      {succes && <span style={{
          border: "1px solid green ",
          backgournd : "green",
          color: "#ffffff"
      }} >
      {succes}
      
      </span>}


      {error && <span>{error.message}</span>}
  
        
      
      <h2>Mot de passe oulié ?</h2>
      <form onSubmit={handleSubmit}>
     
      <div className="inputBox">
      <input onChange={ e =>setEmail(e.target.value)} value={Email} type="email" autoComplete="off" required />
      <label htmlFor="Email">Email</label>
      </div>

      <button disabled= {disabled}>Recupérer</button>

      </form>

      <div className="linkContainer"> 
      <Link className="simpleLink" to="/login">Déja inscrit? Connectez-vous.</Link>
      </div>
      </div>
      </div>
          </div>
            </div>
    )
}

export default ForgetPassword
