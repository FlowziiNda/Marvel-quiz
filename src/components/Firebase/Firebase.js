import App from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'




const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID ,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  };
  


class Firebase {
    constructor(){
        App.initializeApp(config);
        this.auth = App.auth();
        this.db = App.firestore();
        }
       
    //inscription
    signupUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    //connexion
    loginUser = (email , password) =>
    this.auth.signInWithEmailAndPassword(email , password);

    //deconnexion
    signoutUser = () => this.auth.signOut()

    //Recupérer le Mot de Passe
    passwordReset = email => this.auth.sendPasswordResetEmail(email)

  user = uid => this.db.doc(`users/${uid}`)

    
}




export default Firebase;