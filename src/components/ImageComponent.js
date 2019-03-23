import React from 'react';
import { Text, View, TouchableOpacity,Image,Dimensions,StyleSheet,ScrollView,ImageBackground } from 'react-native';

const ImageComponent=({height,width,uri,uriBackground})=>{
    return(
        <View style={{}}>
            <ImageBackground source={{uriBackground}} style={{width: '100%', height: '100%'}}>
            <Image source={{
               uri:uri}} 
        style={{width:width-10,height:height/3,marginTop:100}}/>
        </ImageBackground>
              <ScrollView horizontal={true} style={{flex:1,height:height/15,backgroundColor:'darkgrey',marginTop:100}}>
                  <Text style={{ textAlign:'center'}}>text</Text>
                  <Text>text</Text>
                  <Text>text</Text>
                  <Text>text</Text>
                  <Text>text</Text>
                  <Text>text</Text>
                  <Text>text</Text>
                  <Text>text</Text>
                  <Text>text</Text>
                  <Text>text</Text>
                  <Text>text</Text>
                  <Text>text</Text>
                  <Text>text</Text>
                  <Text>text</Text>
                  <Text>text</Text>
                  <Text>text</Text>
                  <Text>text</Text>
                  <Text>text</Text>
                  <Text>text</Text>
                  <Text>text</Text>
                  <Text>text</Text>
                  <Text>text</Text>
                  <Text>text</Text>
                  <Text>text</Text>
              </ScrollView>
        </View>
    )
}
export default ImageComponent