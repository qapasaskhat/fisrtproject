import React from 'react';
import { 
  StyleSheet, 
  View, 
  Modal,
  Dimensions,
  TouchableOpacity,
  Text,
  ActivityIndicator,Image,ScrollView} from 'react-native';
import { 
  Constants, 
  Video,
  ScreenOrientation,
  Asset  } from 'expo';
import {AntDesign,Ionicons,EvilIcons,Feather} from '@expo/vector-icons'
import ImageС from '../components/ImageComponent'

const { height} = Dimensions.get('window');
const { width} = Dimensions.get('window');

const videoUrl='http://myalbum-001-site1.itempurl.com/Video/FirstVideoTest.mp4'
var color = '#ff116a'

export default class VideoScreen extends React.Component {
    
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

    constructor(props) {
        super(props);
        this._onPress = this._onPress.bind(this);
        this.state={
            video: true,
            mute: false,
            shouldPlay: false,
            videoTest:null,
            modalVisible: false,
            initial:'1',
            responseTest:[],
        }
      }

      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }

      _onPress(){
        this.vid.presentFullscreenPlayer();      
      }

      handlePlayAndPause = () => {  
        this.setState((prevState) => ({
           shouldPlay: !prevState.shouldPlay
        }));
      }
      
      async componentDidMount(){
           await this._getVideoUrl()
           await console.log('componentDidMount videoScreen');
           //this.vid.presentFullscreenPlayer();
           //ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
      }
      _getVideoUrl=async()=>{
        try{   
         await this.setState({
            responseTest: this.props.navigation.getParam('video'),
          })
          //await console.log( this.state.responseTest);
        }
        catch(error){
          console.log(error);
        }
       
      }
  render() {

    let video1= `http://myalbum-001-site1.itempurl.com/Video/${this.state.responseTest.urlVideo}`
    let image1= `http://myalbum-001-site1.itempurl.com/images/${this.state.responseTest.urlImage}`
    let imagePng= `http://myalbum-001-site1.itempurl.com/images/${this.state.responseTest.urlPng}`
    let background = `https://pp.userapi.com/2gCVABdbyudjylG_eSZFq7rdqLc7-5EyhdBYQQ/q-pm-iollP0.jpg`

    if(this.state.responseTest===null){
    return(
      <View style={styles.container1}>
        <ActivityIndicator  size={30} color='darkgray'/> 
      </View>
    )}else{
    return (
      <View style={styles.container}>
      <View style={{flex:8}}>
      <TouchableOpacity style={{
                flex:0.01,
                justifyContent:'flex-end',
                zIndex:2,
                alignItems:'flex-end',position:'absolute',margin:10}}>
                <AntDesign name="close" size={20} color="black"/>
          </TouchableOpacity>
        <View style={{
          flex:7,
          backgroundColor:'gold',
          margin:5,
          borderRadius:5,
          alignItems:'center',
          justifyContent:'center',
          zIndex:1}}>
          
           {
             (this.state.initial==='1')?
             <Video
             ref={r=>this.vid = r}
             source={{uri:video1}}                
             rate={1.0}
             shouldPlay={this.state.shouldPlay}
             volume={1.0}
             muted={this.state.mute}
             resizeMode='contain'
             isLooping
             useNativeControls={true}
             repeat
             style={{
              
               width:"97%",
               height: height/2.5,
               backgroundColor:'black'}}
             />
             :
             (this.state.initial==='2')?
             <Image source={{uri:image1}} 
        style={{width:'100%',height:height/2.5}}/>:
             <ImageС height={height} width={width} uri={imagePng} uriBackground={background}/>
           }
                
        </View>
      </View>
        <View style={styles.container1}>
        <TouchableOpacity style={{flex:1}} onPress={()=>this.setState({initial:'1'})}>
          <View style={{ flex:1,backgroundColor:(this.state.initial==='1')?'gold':'white',alignItems: 'center',
    justifyContent: 'center',margin:10,borderColor:color,borderWidth:2,borderRadius:5}}>
            <Feather name='video' size={30} color={color}/>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1}} onPress={()=>this.setState({initial:'2'})}>
          <View style={{flex:1,backgroundColor:(this.state.initial==='2')?'gold':'white',alignItems: 'center',
    justifyContent: 'center',margin:10,borderColor:color,borderWidth:2,borderRadius:5}}>
            <EvilIcons name='image' size={30} color={color}/>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1}} onPress={()=>this.setState({initial:'3'})}>
          <View style={{flex:1,backgroundColor:(this.state.initial==='3')?'gold':'white',alignItems: 'center',
    justifyContent: 'center',margin:10,borderColor:color,borderWidth:2,borderRadius:5}}>
            <Ionicons name='md-images' size={30} color={color}/>
          </View></TouchableOpacity>
          <TouchableOpacity style={{flex:1}} onPress={()=>alert('Successful')}>
          <View style={{flex:1,backgroundColor:'white',alignItems: 'center',
    justifyContent: 'center',margin:10,borderColor:color,borderWidth:2,borderRadius:5}}>
            <AntDesign name='hearto' size={30} color={color}/>
          </View></TouchableOpacity>
        </View>
      </View>
    );
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: '#fff',
    //alignItems: 'center',
    
   //paddingTop: Constants.statusBarHeight,
   //backgroundColor: '#rgba(0,0,0,0.9)',

  },
  container1: {
    flex: 1,    
    //alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row'
  },
  modalStyle:{
    height:height-150,
    top:0,
    //paddingTop:100,
    position:'absolute',
    backgroundColor:'red',
    width:'100%',
    borderTopWidth:3,
    borderColor:'black'
  }
});