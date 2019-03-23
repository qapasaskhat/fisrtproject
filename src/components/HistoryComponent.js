import React from 'react';
import { Text, View, TouchableOpacity,Image,Dimensions,StyleSheet } from 'react-native';
import {Entypo,Feather,AntDesign} from '@expo/vector-icons'

const win = Dimensions.get('window')
const h = win.height
const w = win.width
var now = new Date();

const HistoryComponent = ({title,onpressLike,nameLike,code,videoUrl,imageUrl})=>{
    return(
        <View style={styles.container}>
            <View style={styles.container1}>
            <TouchableOpacity>
            <View style={{
                backgroundColor:'#ff116a',
                width:30,
                height:30,
                borderRadius:50,
                alignItems:'center',
                justifyContent:'center',
                marginLeft:-10,
                marginTop:-10}}>
            <Entypo name='images' size={20} color='#ffc602'/>
            </View>
            <Image 
            source={{uri:'https://cdn.dribbble.com/users/282234/screenshots/1350191/icon.png'}}
            style={{
                width:100,
                height:100,
                margin:10}}/>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{textAlign:'left',fontSize:12,marginLeft:5,marginBottom:5}}>
                {imageUrl} {now.getHours()}:{now.getMinutes()}  {now.getUTCDate()}-{now.getUTCMonth()}-{now.getFullYear()}
            </Text>
            <TouchableOpacity>
            <AntDesign name='hearto' size={20} color={'red'} style={{marginRight:10}}/>
            </TouchableOpacity>
            </View>
            </TouchableOpacity>
            </View>
            
            <View style={styles.container1}>
            <TouchableOpacity>
            <View style={{
                backgroundColor:'#ff116a',
                width:30,
                height:30,
                borderRadius:50,
                alignItems:'center',
                justifyContent:'center',
                marginLeft:-10,
                marginTop:-10}}>
            <Feather name='play' size={20} color='#ffc602'/>
            </View>
            <Image 
            source={{uri:'https://raw.githubusercontent.com/snwh/paper-icon-theme/master/Paper/512x512/mimetypes/video-x-generic.png'}}
            style={{
                width:100,
                height:100,
                margin:10}}/>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{textAlign:'left',fontSize:12,marginLeft:5,marginBottom:5}}>
                {videoUrl} {now.getHours()}:{now.getMinutes()}  {now.getUTCDate()}-{now.getUTCMonth()}-{now.getFullYear()}
            </Text>
            <TouchableOpacity onPress={onpressLike}>
            <AntDesign name={nameLike} size={20} color={'red'} style={{marginRight:10}}/>
            </TouchableOpacity>
            </View>
            </TouchableOpacity>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'flex-start', 
        marginTop:20,
        marginRight:20,
        marginLeft:20,
        backgroundColor: 'white',
        borderRadius:5,
        shadowColor:'red',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.25,
        shadowRadius:3.84,
        elevation:8,
        flexDirection:'row',
        height:h/4
    },
    container1:{
        flex:1,
        backgroundColor:'#CCDFF7',
        margin:20,
        borderRadius:10
    },
    container2:{
        flex:1,
    }

})

export default HistoryComponent