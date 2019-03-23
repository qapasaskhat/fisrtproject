import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,Dimensions } from 'react-native';
import {AntDesign} from '@expo/vector-icons'
import VideoComponent from '../components/VideoComponent'
import ImageComponent from '../components/ImageComponent'

const {h} = Dimensions.get('window')
export default class App extends React.Component {
    
  static navigationOptions={
    headerTitleStyle: { 
      textAlign:"center", 
      flex:1 
  },
    title:'МОЙ АЛЬБОМ',
    headerStyle: {
      backgroundColor: '#04edcf',
    },
    headerTintColor: '#ff116a',
}
    componentDidMount(){
      console.log('componentDidMount Gallery');
    }
  render() {
    return (
      <View style={styles.container}>
        <View >
          <ImageComponent height={h}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:10,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  textStyle:{
    fontSize:20,
  },
  viewStyle:{
    flex:1,
    backgroundColor:'#35D59D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewStyle2:{
    flex:1
  }
});
