import { useEffect, useRef } from 'react';
import {request, PERMISSIONS} from 'react-native-permissions';
import RNSoundLevel from 'react-native-sound-level'


export async function RequestPermissions(): Promise<boolean> {
    try {
        const statuses = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
        return (statuses === 'granted');
    } catch {
        console.error("Error in request permissions")
    }
}

export async function StartListening (monitor_interval?: number, samplingRate?: number) {
    try{
        RNSoundLevel.start({
            monitoringInterval: monitor_interval,
            samplingRate: samplingRate,
        });
    } catch {
        console.error('Error starting the Lound Level listener.')
    }

}