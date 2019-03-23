import React from 'react';
import { Text, View, TouchableOpacity,Image,Dimensions,StyleSheet } from 'react-native';
import {AntDesign,Feather} from '@expo/vector-icons'

const win = Dimensions.get('window')
const h = win.height
const w = win.width
var now = new Date();

const VideoComponent = ({title,onpres})=>{
    return(
            <View style={styles.container}>
             <TouchableOpacity>
            <View style={{
                backgroundColor:'#CD0074',
                width:30,
                height:30,
                borderRadius:50,
                alignItems:'center',
                justifyContent:'center',
                marginLeft:-10,
                marginTop:-10}}>
            <Feather name='play' size={20} color='gold'/>
            </View>
            <Image 
            source={{uri:'https://raw.githubusercontent.com/snwh/paper-icon-theme/master/Paper/512x512/mimetypes/video-x-generic.png'}}
            style={{
                width:100,
                height:100,
                margin:10}}/>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{textAlign:'left',fontSize:12,marginLeft:5,marginBottom:5}}>
                {now.getHours()}:{now.getMinutes()}  {now.getUTCDate()}-{now.getUTCMonth()}-{now.getFullYear()}
            </Text>
            <TouchableOpacity>
            <AntDesign name='hearto' size={20} color={'red'} style={{marginRight:10}}/>
            </TouchableOpacity>
            </View>
            </TouchableOpacity>          
            </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor:'darkgrey'
    },

})

export default VideoComponent