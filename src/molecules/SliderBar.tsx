import React, {useRef} from 'react';
import {Animated, PanResponder, View} from 'react-native';
import styles from '../../style';


export default function SliderBar (){
    const pan = useRef(new Animated.Value(0)).current;
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
        console.log('panValue', pan)
        return Animated.event([
          null,
          {moveX: pan}
        ], {useNativeDriver: false}) (evt, gestureState)},
        onPanResponderRelease: () => {
          pan.flattenOffset();
        }
      })).current;
      
    console.log('panValue on first render', pan)
  
    return (
      <View style = {styles.barStyling} 
        {...panResponder.panHandlers}>
          <Animated.View 
            style={{
              ...styles.sliderStyling,
              width: pan
            }}        
            ></Animated.View>
      </View>
    );
  };