import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ToastAndroid, } from 'react-native';
import { Header } from 'react-native-elements';
import * as firebase from 'firebase';
import db from "../config.js"

export default class WriteStoryScreen extends React.Component {

  constructor(){
    super();
    this.state={
      writtenauthor: '',
      writtentitle: '',
      writtenstory: '',
      buttonState: 'normal',
      scanned: false,
    }
  }
  submitStory=async({type,data})=>{
    const {buttonState} = this.state

    if(buttonState==="author"){
      this.setState({
        scanned:true,
        writtenauthor : data,
        buttonState: 'normal',
      });
    }
    else if(buttonState==="title"){
      this.setState({
        scanned:true,
        writtentitle: data,
        buttonState: 'normal',
      });
    }

    db.collection("addStory").add({
      'author' : this.state.writtenauthor,
      'title' : this.state.writtentitle,
      'story' : this.state.writtenstory,
      //'date' : firebase.firestore.Timestamp.now().toDate(),
    })
    
    this.setState({
      writtenauthor: '',
      writtentitle: '',
      writtenstory: '',
    })
    
  }
  
  render(){
    return (
      <KeyboardAvoidingView style={styles.container} behaviour='padding' enabled>
      <View style={styles.container}>
        <Header
          backgroundColor={'pink'}
          centerComponent={{
            text: 'Story Hub',
            style: { color: 'black', fontSize: 20 },
          }}
        />
        <View style={styles.inputView}>
          <TextInput
            placeholder = "Story Title"
            onChangeText={(text)=>{
              this.setState({
                writtentitle: text
              })
            }}
            value={this.state.writtentitle}
          />
        </View>

         <View style={styles.inputView}>
          <TextInput
            placeholder = "Author"
            onChangeText={(text)=>{
              this.setState({
                writtenauthor: text
              })
            }}
            value={this.state.writtenauthor}
          />
        </View>

         <View style={styles.inputViewstory}>
          <TextInput
            placeholder = "Write your story"
            onChangeText={(text)=>{
              this.setState({
                writtenstory: text
              })
            }}
            value={this.state.writtenstory}
          />
        </View>

        <TouchableOpacity style = {styles.submitButton} onPress = {this.submitStory}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  inputView: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
   header:{
      backgroundColor: 'pink',
      marginTop: 0,
      justifyContent:'center',
      alignItems:'center',
      width:1000,
      height:50,
      padding: 10,
      margin: 10
    },
    inputViewstory: {

    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 50,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
    multiline: true,
  },
  submitButton:{
    backgroundColor: 'pink',
    padding: 10,
    margin: 10,
    width: 80,
    marginLeft: 650,
    borderWidth: 2,
    borderColor: 'blue',
  },
});

















