import React from 'react';
import { StyleSheet, Text, View, Image,Button} from 'react-native';
import { NativeRouter, Route, Link} from "react-router-native";


export default class DocView extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            blocks: [
                {
                    id: 0,
                    type: 'text',
                    text: 'lorem ipsum id dolor'
                },
                {
                    id: 1,
                    type: 'img',
                    url: 'https://images-na.ssl-images-amazon.com/images/I/61c9-XT0uFL._SY879_.jpg'
                }
            ],
        };

       this.addText = this.addText.bind(this);
       this.addImg = this.addImg.bind(this);
    }

    addText(){
        this.setState((prevState) =>{
            return {
                blocks: [ ...prevState.blocks, {
                    id: prevState.blocks.length,
                    type: 'text',
                    text: 'hola' + Math.random()
                }]
            }
        });
    }

    addImg(){
        this.setState((prevState) =>{
            return {
                blocks: [ ...prevState.blocks, {
                    id: prevState.blocks.length,
                    type: 'img',
                    url: 'http://as01.epimg.net/epik/imagenes/2018/04/28/portada/1524913221_572475_1524913364_noticia_normal.jpg'
                }]
            }
        });
    }

    render() {
        let { id } = this.props.match.params;
        return (
            <View style={{margin: 30}}>
                <Text>Doc view {id}</Text>
                {this.state.blocks && this.state.blocks.map((block)=>{
                    return block.type == 'text' ? <Text key={block.id}>{block.text}</Text> : <Image key={block.id} style={{ height: 150 }} source={{uri: block.url}}/>
                })}

                <View>
                    <Button onPress = {this.addText} title="Add Text">Add Text</Button>
                    <Button onPress = {this.addImg} title="Add Image">Add Image</Button>
                </View>
            </View>
        );
    }
}