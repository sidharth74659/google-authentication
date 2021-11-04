// @ts-nocheck
// import { initializeApp } from 'firebase/app';
// import { getAuth, onAuthStateChanged } from "firebase/auth";

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js';

import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js';


// * FIRST initializeApp then anything after
const firebaseApp = initializeApp({
    apiKey: "AIzaSyD-dQ1LyPjots2qb6ZoDYz74F9G2GInAEY",
    authDomain: "todo-200720.firebaseapp.com",
    databaseURL: "https://todo-200720.firebaseio.com",
    projectId: "todo-200720",
    storageBucket: "todo-200720.appspot.com",
    messagingSenderId: "241273295218",
    appId: "1:241273295218:web:5126f5ad87dd409ffb4deb",
    measurementId: "G-10HRN3PDGM"
});

const auth = getAuth(firebaseApp);

const sign_in = document.querySelector('#sign-in')
const sign_up = document.querySelector('#sign-up')
const sign_out = document.querySelector('#sign-out')

onAuthStateChanged(auth, user => {
    if (user !== null) {
        sign_out.style.display = 'block';
        sign_in.style.display = 'none'
        sign_up.style.display = 'none'

        sign_out.addEventListener('click', signOutUser)
    } else {
        sign_out.style.display = 'none'
        sign_in.style.display = 'block'
        sign_up.style.display = 'block'

        document.querySelector('#log-in').addEventListener('click', signUser)
        document.querySelector('#create-account').addEventListener('click', createUser)
    }
})

function signOutUser(e) {
    e.preventDefault()

    signOut(auth)
}

function createUser(e) {
    e.preventDefault();

    const userEmail = document.querySelector('#email-address').value
    const userPassword = document.querySelector('#pass').value

    createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...

            toggleModal("default-modal-signup", false);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..

            alert(errorCode + errorMessage)
        });
}

function signUser(e) {
    e.preventDefault();

    const userEmail = document.querySelector('#login-email').value
    const userPassword = document.querySelector('#login-password').value

    signInWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...

            // toggleModal("default-modal-login", document.getElementById("default-modal-login").hasAttribute('aria-hidden', 'true'));
            toggleModal("default-modal-login", false);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            alert(errorCode + errorMessage)
        });
}