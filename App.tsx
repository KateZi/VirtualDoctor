import React, {useRef} from 'react';
import {View} from 'react-native';
import Video, {VideoRef} from 'react-native-video';
import TemporalComponent from './src/atoms/TemporalComponent';
import SliderBar  from './src/molecules/SliderBar';
import styles from './style';
import TalkingBubble from './src/atoms/TalkingBubble';
import NoPermissionPage from './src/pages/NoPermissionsPage';
import { RequestPermissions } from './src/back/SoundLevel';


export default function App(){
  
  const success = useRef(RequestPermissions())

  const delay = 14
  const duration = 7
  // const delay = 0
  // const duration = 120

  const videoRef = useRef<VideoRef>(null);
  const background = require('./assets/videos/talkingDoctor_v2_cropped.mov');

  return (
    <>
      {success ? 
        <View style = {styles.containerStyling}>
            <View style={styles.videoContainerStyling}>
              <Video 
                  source={background}
                  ref={videoRef}
                  style={styles.backgroundVideo}
              />
            </View>
            <TalkingBubble/>
            <TemporalComponent delay={delay} duration={duration}>
                  <SliderBar/>
            </TemporalComponent>
        </View>
        : 
      <NoPermissionPage permissionName={'Mic'}></NoPermissionPage>
      }
      </>
  );
}

