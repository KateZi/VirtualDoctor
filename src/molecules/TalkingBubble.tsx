import { useEffect, useRef, useState } from "react"
import { Animated, View} from "react-native"
import RNSoundLevel from 'react-native-sound-level'
import { StartListening } from "../back/SoundLevel"
import styles from "../../style"


const MONITOR_INTERVAL = 250 // in ms
const SAMPLING_RATE = 8000 // default is 22050
const MAX_VOLUME = 6_750
const AGENT_SPEAKING_THRESHOLD = 7_500
const SILENCE_THRESHOLD = 1_750
const AGENT_PAUSE = 3 // in sec

export default function TalkingBubble () {
    const [loudness, setLoudness] = useState(0)
    const scale = useRef(new Animated.Value(0)).current

    const [agentSpeaking, setAgentSpeaking] = useState(false)
    const timeoutRef = useRef(null);

    useEffect(() => {
        Animated.timing(scale,{
          toValue:loudness/MAX_VOLUME,
          useNativeDriver:true,
          duration:500,
        }).start()
      },[loudness])

    // use effect for starting and stopping
    useEffect(() => {
        StartListening(MONITOR_INTERVAL, SAMPLING_RATE);

        return () => {
            try {
                // don't forget to stop it
                RNSoundLevel.stop();
            } catch {
                console.error('Error stopping the Sound Level Listener');
            }
        }
    }, []);

    useEffect(() => {
        try{
            RNSoundLevel.onNewFrame = (data) => {
                const currData = data.rawValue
                setLoudness(0)
                if (currData > AGENT_SPEAKING_THRESHOLD) {   
                    if (!agentSpeaking){
                        setAgentSpeaking(true)
                        clearTimeout(timeoutRef.current);
                    }
                }
                else if (currData > SILENCE_THRESHOLD) {
                    setLoudness(currData)
                    if (agentSpeaking){
                        clearTimeout(timeoutRef.current);
                        timeoutRef.current = setTimeout(() => {
                            setAgentSpeaking(false);
                        }, AGENT_PAUSE*1000)
                    }
                }
            }
        } catch {
                console.error('Error reading a frame')
        }
        return () => {
            try{
                clearTimeout(timeoutRef.current);
            } catch {
                console.error('Error clearing the timer.')
            }
        }
    }, [agentSpeaking]);

    return (
        <View style={styles.bubbleContainerStyling}>
            <Animated.View 
                style={[{...styles.talkingBubbleStyling,
                transform:[{
                    scale: scale.interpolate({
                        inputRange: [0,1],
                        outputRange: [1,2],
                        extrapolate: 'clamp' // clamp prevents exceeding max range size
                        })
                    }]
                }]}>
            </Animated.View>
            <View style={styles.centerBubbleStyling}/>
        </View>
    )
}