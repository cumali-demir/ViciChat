import * as firebase from "firebase";
import {AsyncStorage} from 'react-native'

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
        return new Promise ((resolve,reject)=>{
            firebase.auth().signOut().then(
                success => {
                    AsyncStorage.removeItem('email');
                    AsyncStorage.removeItem('password');
                    resolve(success);
                },
                error=>reject(error)
            );
        })
    },

    forgotPassword(){


        var user = firebase.auth().currentUser;

        return new Promise((resolve,reject)=>{

                var auth = firebase.auth();

                auth.sendPasswordResetEmail(user.email).then(
                    success=>resolve(success),
                    error => reject(error)
                )

            })

    },


};