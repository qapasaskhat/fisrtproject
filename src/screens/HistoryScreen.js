import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  AsyncStorage,
  ScreenOrientation } from 'react-native';
import {AntDesign} from '@expo/vector-icons'
import Historycomponent from '../components/HistoryComponent'

var p=[];
let arr=[];
export default class History extends React.Component {
    
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
    constructor (props) {
      super(props)
      this.state = {
          data: [],
          code:null,
        videoUrl:null,
        pars:[{
          cod:'1',
          urlVideo: 'video1',
          urlImage:'Image'
        },
        {
          cod:'2',
          urlVideo: 'video1',
          urlImage:'Image'
        },
        {
          cod:'3',
          urlVideo: 'video1',
          urlImage:'Image'
        },],
        his: [],
        like:false,
      };
  }
    async componentDidMount(){
      console.log('componentDidMount HistoryScreen');
      // ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
       await this._hisroty()
    }
    
    _hisroty=async()=>{
      try{
        let history = await AsyncStorage.getItem('history')
        console.log(history+'his');
        p = await JSON.parse(history)
        console.log(p);
        await this.state.pars.push(p);
      }
      catch(error){
        console.log(error)
      }
    }
_onpress(){
  this.setState({like: !this.state.like})
}
  render() {
    console.log(p)
    return (
      <View style={styles.container}>
        <ScrollView>
        {  this.state.pars.map((i,k) => {
          return( <Historycomponent 
            key={k}
            title='history' 
            code={i.cod} 
            videoUrl={i.urlVideo}
            imageUrl={i.urlImage} 
            onpressLike={this._onpress.bind(this)}
            nameLike={'hearto'}/>)
        })
}
        </ScrollView>
      </View>
    );1
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  textStyle:{
    fontSize:20,
  }
});
