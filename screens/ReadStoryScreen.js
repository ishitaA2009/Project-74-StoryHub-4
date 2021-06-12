import * as React from 'react';
import { Text, View, StyleSheet,FlatList,ScrollView,SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import { SearchBar } from 'react-native-elements';
import db from '../config';


export default class Readscreen extends React.Component {
  constructor() {
    super();
    this.state = {
      allStories: [],
      dataSource: [],
      search: '',
    };
  }
  componentDidMount() {
    this.retriveStories();
  }

  retriveStories = () => {
    try {
      var allStories = [];
      var stories = db
        .collection('stories')
        .get()
        .then((stories) => {
          stories.forEach((doc) => {
            allStories.push(doc.data());
          });
          this.setState({ allStories });
        });
    } catch (error) {
      console.log(error);
    }
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  searchFilter(text){
    const newData=this.state.allStories.filter((item)=>{
    const itemData=item.title ? item.title.toUpperCase() : ''.toUpperCase();
    const textData= text.toUpperCase();
    return itemData.indexOf(textData) > -1;
    })
    this.setState({
      dataSource:newData,
      search:text
    })
  }

  render() {
      return (
       <View>
      <SearchBar
        placeholder="Search Here....."
        onChangeText={text=> this.searchFilter(text)}
        onClear={text=> this.searchFilter('')}
        value={this.state.search}
      />
      

     
      <FlatList
       data={this.state.search==="" ? this.state.allStories:this.state.dataSource}
       renderItem={({item})=>(
        <View style={{borderBottomWidth: 2 ,borderRadius:3,backgroundColor:'pink',marginTop:4,}}>
        <Text> Title: {item.title}</Text>
        <Text> Author: {item.author}</Text>
        </View>
      )}
      keyExtractor={(item,index)=> index.toString()}
      />
      
      </View>
      );

    
       
  }
}
