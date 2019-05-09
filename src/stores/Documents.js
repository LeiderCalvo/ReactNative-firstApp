import { observable, action, computed } from 'mobx';
import { AsyncStorage } from 'react-native';


export class Documents{

    constructor(db){
        this.readStorage();
        this.db = db;
        this.getItemFirebase();
    }

    @observable selected = null;

    @observable list = [
        /*{
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
        }*/
    ];

    @action addText(newText){
        this.selected.blocks.push({
            id: this.selected.blocks.length,
            type: 'text',
            text: newText
        });
        this.updateStorage();
    }

    @action addImage(img,altura){
        this.selected.blocks.push({
            id: this.selected.blocks.length,
            type: 'img',
            url: img,
            height: altura
        });
        this.updateStorage();
    }

    async updateStorage(){
        let copy = {...this.selected};
        delete copy.id;

        this.db.collection('documents')
        .doc(this.selected.id + '')
        .set(copy);
        
        /*try {
            await AsyncStorage.setItem('list', JSON.stringify(this.list));
        } catch (e) {
            // saving error
        }*/
    }

    async updateLocalStorage(){        
        try {
            await AsyncStorage.setItem('list', JSON.stringify(this.list));
        } catch (e) {
            // saving error
        }
    }

    async readStorage(){
        //const value = await AsyncStorage.removeItem('list');
        try {
            const value = await AsyncStorage.getItem('list');
            console.log(JSON.parse(value));
            if(value !== null) {
            let storageList = JSON.parse(value);
            if(storageList !== null) this.list = storageList;
            }
        } catch(e) {
            // error reading value
        }
    }

    @action setSelectedById(id){
        let doc = this.list.find(doc => doc.id == id);
        this.selected = doc;
    }

    getItemFirebase(){
        //.where("owner", "==", "X")
        this.db.collection("documents")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc)=> {
                console.log('list: ' + this.list);
                let found = this.list.find((docGuardado)=>{
                    console.log('fire: '+doc.id + '  list: ' + docGuardado.id);
                    return doc.id === docGuardado.id;
                });

                let temp = {
                    ...doc.data(),
                    id: doc.id
                };
                if(!temp.blocks)temp.blocks = [];

                if(!found){
                    this.list.push(temp);
                    console.log('No founded - doc: '+doc.id);
                    this.updateLocalStorage();
                }else{
                    console.log('fire: '+doc.id+'  founded: '+found.id);
                    found.blocks = {...doc.blocks};
                }

            });
        })
        .catch((error)=> {
            console.log("Error getting documents: ", error);
        });
    }

    addItemFirebase(){
        this.db.collection("documents").add({
            id: this.list.length,
            name: 'documentoFirestore' + this.list.length,
            blocks: [
                {
                    id: 0,
                    type: 'text',
                    text: 'Agregaaaaaaaaaa'
                },
                {
                    id: 1,
                    type: 'img',
                    url: 'https://images-na.ssl-images-amazon.com/images/I/61c9-XT0uFL._SY879_.jpg',
                    height: 50
                }
            ],
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
}