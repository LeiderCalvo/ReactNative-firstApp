import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react/native';
import { StyleSheet, Text, View, Image,Button, BackHandler} from 'react-native';
import { NativeRouter, Route, Link} from "react-router-native";
import store from '../../stores/store';

@observer export default class DocView extends React.Component {

    @observable test = 'hola';

    constructor(props){
        super(props);
       this.addText = this.addText.bind(this);
       this.addImg = this.addImg.bind(this);
       this.handleBackPress = this.handleBackPress.bind(this);
    }

    addText(){ 
        store.docs.addText('hola' + Math.random());
    }

    addImg(){
        store.docs.addImage('http://as01.epimg.net/epik/imagenes/2018/04/28/portada/1524913221_572475_1524913364_noticia_normal.jpg', Math.round(Math.random()*100 +50));
    }

    render() {
        let { id } = this.props.match.params;

        if(store.docs.selected===null || id != store.docs.selected.id){
            store.docs.setSelectedById(id);
        }
        let doc = store.docs.selected;
        return (
            <View style={{margin: 30}}>
                <Text>Doc view {id}</Text>
                {doc.blocks && doc.blocks.map((block)=>{
                    return block.type == 'text' ? <Text key={block.id}>{block.text}</Text> : <Image key={block.id} style={{ height: block.height || 100 }} source={{uri: block.url}}/>
                })}

                <View>
                    <Button onPress = {this.addText} title="Add Text">Add Text</Button>
                    <Button onPress = {this.addImg} title="Add Image">Add Image</Button>
                </View>
            </View>
        );
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress(){
        this.props.history.goBack();
        //this.props.history.push('/');
        return true;
    }
}