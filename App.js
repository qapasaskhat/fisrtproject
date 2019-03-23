import React from 'react';
import {
  Platform,
  Image,
  View } from 'react-native'
import { 
  createStackNavigator, 
  createAppContainer,
  createBottomTabNavigator } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen'
import VideoScreen from './src/screens/VideoScreen'
import QRCameraScreen from './src/screens/QRCameraScreen'
import HistoryScreen from './src/screens/HistoryScreen'
import {AntDesign,MaterialIcons} from '@expo/vector-icons'

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Video: VideoScreen,
},
{
  initialRouteName: 'Home'
});

const History = createStackNavigator({
  History: HistoryScreen,
})
const Gallery = createStackNavigator({
  Gallery: QRCameraScreen
})

const bottomTabNavigator = createBottomTabNavigator({
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'ИСТОРИЯ',
      tabBarIcon: ({ tintColor }) => {return(
        <View style={{width:35,height:35,backgroundColor:tintColor,borderRadius:50,alignItems:'center',justifyContent: 'center',}}>
        <Image source={require('./assets/history.png')} 
        style={{width:22,height:22}}/>
        </View>)}
    },
    
  },
  Home: {
    screen: AppNavigator,
    navigationOptions: {
      tabBarLabel: 'КАМЕРА',
      tabBarIcon: ({ tintColor }) => {return(
      <View style={{width:35,height:35,backgroundColor:tintColor,borderRadius:50,alignItems:'center',justifyContent: 'center',}}>
      <Image source={require('./assets/camera.png')} 
      style={{width:25,height:22}}/>
      </View>)}
    },
  },
  Gallery:{
    screen: Gallery,
    navigationOptions:{
      tabBarLabel:'LIKE',
      tabBarIcon:({tintColor})=>{return(
        <View style={{width:35,height:35,backgroundColor:tintColor,borderRadius:50,alignItems:'center',justifyContent: 'center',}}>
        <Image source={require('./assets/like.png')} 
        style={{width:25,height:22}}/>
        </View>)}
    }
  }
},{
  initialRouteName: 'Home',
  tabBarOptions: {
    style:{
      backgroundColor:'#04edcf',
      height:50
    },
    //activeBackgroundColor:'#35D59D',
    activeTintColor: '#ffc602',  // Color of tab when pressed
    inactiveTintColor: '#ff116a', // Color of tab when not pressed
    showIcon: 'true', // Shows an icon for both iOS and Android
    showLabel: (Platform.OS !== 'ios'), //No label for IOS
    labelStyle: {
      fontSize: 9,
    }
  },
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarOnPress: ({ navigation, defaultHandler }) => {
      console.log('onPress:',navigation.state.routeName);
      defaultHandler()
      if(navigation.state.routeName==='Home'){
        console.log('home');
      }
    },
  }),
});

const AppContainer = createAppContainer(bottomTabNavigator);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}
