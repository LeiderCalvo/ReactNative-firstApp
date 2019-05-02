import { observable, action, computed } from 'mobx';
import * as firebase from 'firebase/app';
import "firebase/firestore"

export class Documents{

    constructor(){
        /*
        let storageList = JSON.parse(localStorage.getItem('list'));
        if(storageList !== null){
            this.list = storageList;
        }
        https://github.com/react-native-community/react-native-async-storage
        */

       var firebaseConfig = {
        apiKey: "AIzaSyDblwzCapyjb30BwVpA6oTrI4Itwdcx1wU",
        authDomain: "reactnativefirstappgdocs.firebaseapp.com",
        databaseURL: "https://reactnativefirstappgdocs.firebaseio.com",
        projectId: "reactnativefirstappgdocs",
        storageBucket: "reactnativefirstappgdocs.appspot.com",
        messagingSenderId: "460324528853",
        appId: "1:460324528853:web:05b44ba163d5c8bf"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    this.db = firebase.firestore();  

    /*
    this.db.collection("users").add({
        first: "Ada",
        last: "Lovelace",
        born: 1815
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
*/

    this.db.collection("documents").where("owner", "==", "X")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc)=> {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            let temp = {
                ...doc.data(),
                id: doc.id
            };
            this.list.push(temp);

        });
    })
    .catch((error)=> {
        console.log("Error getting documents: ", error);
    }); 

    }

    @observable selected = null;

    @observable list = [
        {
            id: 1,
            name: 'documentos mobx',
            blocks: [
                {
                    id: 0,
                    type: 'text',
                    text: 'lorem ipsum id dolor'
                },
                {
                    id: 1,
                    type: 'img',
                    url: 'https://images-na.ssl-images-amazon.com/images/I/61c9-XT0uFL._SY879_.jpg',
                    height: 50
                }
            ],
        }
    ];

    @action addText(newText){
        this.selected.blocks.push({
            id: this.selected.blocks.length,
            type: 'text',
            text: newText
        });
        //this.updateStorage();
    }

    updateStorage(){
        localStorage.setItem('lista', JSON.stringify(this.list));
    }

    @action addImage(img,altura){
        this.selected.blocks.push({
            id: this.selected.blocks.length,
            type: 'img',
            url: img,
            height: altura
        });
        //this.updateStorage();
    }

    @action setSelectedById(id){
        let doc = this.list.find(doc => doc.id === parseInt(id));
        this.selected = doc;
    }
}