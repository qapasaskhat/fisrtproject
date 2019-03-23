import React from 'react';
import { Text, View, TouchableOpacity,Image,Dimensions,StyleSheet } from 'react-native';
import Video from 'expo'

const VideoC=({videoUrl,height,shouldPlay,mute})=>{
    return(
        <View>
        <Video
                ref={r=>this.vid = r}
                source={{uri:videoUrl}}                
                rate={1.0}
                shouldPlay={shouldPlay}
                volume={1.0}
                muted={mute}
                resizeMode='contain'
                isLooping
                useNativeControls={true}
                repeat
                style={{
                  width:"97%",
                  height: height/2.5,
                  backgroundColor:'black'}}
                />
        </View>
    )
}
export default VideoC