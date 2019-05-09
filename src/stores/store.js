import { Documents } from './Documents';
import { Users } from './Users';
import * as firebase from 'firebase/app';
import "firebase/firestore"
import firebaseCredentials from '../../firebaseCredentials';

// Initialize Firebase
firebase.initializeApp(firebaseCredentials);
const db = firebase.firestore();  

const docs = new Documents(db);
const users = new Users(firebase);

export default {
    docs,
    users
}