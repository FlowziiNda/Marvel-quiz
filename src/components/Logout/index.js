import React,{useState,useEffect,useContext} from 'react'
import { FirebaseConext } from '../Firebase'
import ReactTooltip from 'react-tooltip';

const Logout = () => {

const firebase = useContext(FirebaseConext);

const [checked, setChecked] = useState(false)


useEffect(() => {
if(checked){
    console.log("Deconnexion")
    firebase.signoutUser()
}

}, [checked, firebase])

const handleChange = event =>{
    setChecked(event.target)
}


    return (
        <div className="logoutContainer">
            <label className="switch">
            <input
            onChange={handleChange}
               type="checkbox"
               checked={checked}

            />
            <span className="slider round" data-tip="Déconnexion"></span>
            </label>
            <ReactTooltip place="left" type="dark" effect="solid"/>
        </div>
    )
}

export default Logout
