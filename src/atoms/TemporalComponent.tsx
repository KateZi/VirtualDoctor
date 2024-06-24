import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import styles from '../../style';


interface TemporalComponentProps {
    children: React.ReactNode;
    delay: number;
    duration: number;
    setShowComponent: React.Dispatch<React.SetStateAction<any>>
  }

  
export default function TemporalComponent ({children, delay, duration, setShowComponent}: TemporalComponentProps) {
    // const [showComponent, setShowComponent] = useState(false);

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

    return (<View>{children}</View>);
}
  