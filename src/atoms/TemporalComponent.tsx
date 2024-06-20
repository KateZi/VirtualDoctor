import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import styles from '../../style';


interface TemporalComponentProps {
    children: React.ReactNode;
    delay: number;
    duration: number;
  }

  
export default function TemporalComponent ({children, delay, duration}: TemporalComponentProps) {
    const [showComponent, setShowComponent] = useState(false);

    useEffect(() => {
        let showTimeoutId = setTimeout(() => {
        setShowComponent(true)
    }, delay*1000);
        let hideTimeoutId = setTimeout(() => {
        setShowComponent(false)
    }, (delay+duration)*1000);
        return () => {
            clearTimeout(showTimeoutId);
            clearTimeout(hideTimeoutId);
        }
    }, []);

    console.log('showComponent', showComponent)

    return (<View style={styles.temporalStyling}>{showComponent ? children : null}</View>);
}
  