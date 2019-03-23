import React from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  Dimensions,
  Animated,
  Easing,
  Platform,Vibration } from 'react-native';
import { Camera, Permissions } from 'expo';
import {AntDesign,MaterialIcons} from '@expo/vector-icons'

const {width} = Dimensions.get('window')
const {height} = Dimensions.get('window')

export default class CameraExample extends React.Component {

  static navigationOptions={
    headerTitleStyle: { 
      textAlign:"center", 
      flex:1
  },
    title:'МОЙ АЛЬБОМ',
    headerStyle: {
      backgroundColor: '#34D1B2',
    },
    headerTintColor: '#CD0074',
    
}
constructor(props) {
  super(props);
  this.animatedValue = new Animated.Value(0)
  this.state={
    videoTest:null,
    hasCameraPermission: null,  //permission camera
    type: Camera.Constants.Type.back,  //фронтальная камера
    flashMode: Camera.Constants.FlashMode.off,  //фспышка
    autoFocus: Camera.Constants.AutoFocus.on,  //автофокус
    con:0,
    pars:[],
    animated: new Animated.Value(1),  //анимация
    responseJs:null,  //данные с сервера,
    focusedScreen:true,
    hasNotification:null,
    lastScannedUrl:null
  }
}

  async componentDidMount() {
    console.log('componentDidMount HomeScreen');
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted'});
    this._animate()
    const { navigation } = this.props;
    navigation.addListener('willFocus', () =>
      this.setState({ focusedScreen: true })
    );
    navigation.addListener('willBlur', () =>
      this.setState({ focusedScreen: false })
    );
  }
  vibr(){
    Vibration.vibrate(500)
  }
  _maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }
    return (
      <View style={{ position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 15,
      flexDirection: 'row',}}>
        <TouchableOpacity style={{flex: 1,}} onPress={this._handlePressUrl}>
          <Text numberOfLines={1} style={{color: '#fff',
    fontSize: 20,}}>
            {this.state.lastScannedUrl}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginLeft: 10,
            alignItems: 'center',
            justifyContent: 'center',}}
          onPress={this._handlePressCancel}>
          <Text style={{color: 'rgba(255,255,255,0.8)',
    fontSize: 18,}}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  //----------------------------анимация-------------------------------
  _animate(){
    this.animatedValue.setValue(0)
    Animated.timing(this.animatedValue,{
      toValue:1,
      duration: 3000,
      easing: Easing.linear
    }).start(()=>this._animate())
  }
//-------------------------------post - запрос--------------------------
   networking=async(code)=>{
    console.log('network...');
     await fetch('http://myalbum-001-site1.itempurl.com/api/codepost',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "InfoId":code
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          responseJs: responseJson,
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      });
      //return this.state.responseJs
  }
  //-----------------------------история----------------------------
  _async=async(barcode)=>{
    await AsyncStorage.setItem('history',JSON.stringify(barcode))
    let history = await AsyncStorage.getItem('history')
        //console.log(history+'his');
        let p = JSON.parse(history)
       //console.log(p);
        this.state.pars.push(p);
        //console.log(this.state.pars);
        await AsyncStorage.setItem('history',JSON.stringify(this.state.pars))
  }
  //---------------------------------сканнер штрих кода----------------------
  _onBarCodeScan=async(e)=>{
    this.vibr()
    console.log(e.data);
    this.setState({lastScannedUrl: e.data})
    //alert(e.data)
   await this.networking(e.data) 
  // await this.props.navigation.navigate('Video',{video:this.state.responseJs})
   console.log(this.state.responseJs)
   
   //await this._async(this.state.responseJs)
  }
  handleMountError = ({ message }) => {
    this.props.navigation.goBack()
  }

  render() {
    const movingMargin = this.animatedValue.interpolate({ //Анимаия линии
      inputRange: [0, 0.5, 1],
      outputRange: [0, 300, 0]
    })
    const { hasCameraPermission,focusedScreen,hasNotification } = this.state;
    if (hasCameraPermission === null) {
      return(<View style={{
        flex:1,
        justifyContent:"center",
        alignItems:"center"}}>
        <ActivityIndicator size={Platform.OS==='ios'?1:50} color="darkgrey" />
             </View>)
    } else if (hasCameraPermission === false) {
      return (<View style={{
        flex:1,
        justifyContent:"center",
        alignItems:"center"}} >
        <AntDesign name="frowno" size={35} color="black"/>
      <Text>No access to camera</Text>
      </View>)
    } else if(focusedScreen) {
      return (
        <View style={{ width:'100%',height:'100%'}}>
          <Camera 
          ref={ref => { this.camera = ref }}
          style={{flex:1,
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width, }} 
          type={this.state.type} 
          flashMode={this.state.flashMode} 
          autoFocus={this.state.autoFocus} 
          onBarCodeScanned={this.state.videoTest===null?this._onBarCodeScan:null}
          onCameraReady={()=>{console.log('sucsessful');}}
          onMountError={this.handleMountError}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'column',
                marginRight:width/3-40,
                marginLeft:width/3-40,
                marginBottom:height/4,
                marginTop:height/4,
              }}>
              <View 
              style={{
                flex: 10,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                marginBottom:20,
                borderRadius: 0,
                borderWidth: 2,
                borderColor: '#35D59D',
                justifyContent:'center',
                alignItems:'flex-end',

              }}>
              <Animated.View style={{
                marginBottom:movingMargin,
                borderTopColor:'red',
                borderTopWidth:2,
                width:'100%',
            }}>

              </Animated.View>
              </View>
              <View style={{flex:1,flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  console.log('flash');
                  this.setState({
                    flashMode: this.state.flashMode === Camera.Constants.FlashMode.off
                      ? Camera.Constants.FlashMode.torch
                      : Camera.Constants.FlashMode.off,
                  });
                }}>
                <MaterialIcons 
                name={this.state.flashMode? "flash-on":"flash-off"} 
                size={25} 
                color={this.state.flashMode?"white":"#35D59D"}/>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  console.log('front');
                  
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <AntDesign name="reload1" size={25} color={this.state.type?"white":"#35D59D"}/>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  console.log('focus');
                  //this.props.navigation.navigate('Video')
                  this.setState({
                    autoFocus: this.state.autoFocus === Camera.Constants.AutoFocus.on
                      ? Camera.Constants.AutoFocus.off
                      : Camera.Constants.AutoFocus.on,
                  });
                }}>
                <MaterialIcons 
                name={this.state.autoFocus? "center-focus-strong":"center-focus-weak"} 
                size={25} 
                color={this.state.autoFocus?"#35D59D":"white"}/>
              </TouchableOpacity>
              </View>
            </View>
            {this._maybeRenderUrl()}
          </Camera>
        </View>
      );
    }
    else{
      return <View />;
    }
  }
}