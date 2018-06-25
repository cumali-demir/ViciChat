import * as firebase from "firebase";

export const AuthService = {

    signUpService(email,password) {


        return new Promise((resolve,reject)=>{
            firebase.auth().createUserWithEmailAndPassword(email, password).then(
                success => resolve(success),
                error => reject(error)
            )
        })
    },

    loginService(email,password) {


        return new Promise((resolve,reject)=>{
            firebase.auth().signInWithEmailAndPassword(email, password).then(
                success => resolve(success),
                error => reject(error)
        )
        })
    },

    logOutService(){
        return new Promise((resolve,reject)=> {
            firebase.auth().signOut();
        })
    }

};