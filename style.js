import { StyleSheet } from "react-native"


const styles = StyleSheet.create({
    containerStyling:{
        flex: 1,
        backgroundColor: 'rgb(235, 234, 233)',
        alignItems: 'center',
    },
    temporalStyling:{
        position: 'absolute',
        bottom: 70,
        height: 60,
        width: '100%',
    },
    barStyling:{
        backgroundColor: 'white',
        borderColor: 'orange',
        borderRadius:10,
        borderWidth: 10,
        elevation: 2,
        height: '100%',
        width: '100%',
    },
    sliderStyling:{
        backgroundColor: 'orange',
        height: '100%',
        padding: 0,
    },
    backgroundVideo:{
        flex: 1,
    },
    videoContainerStyling:{
        top: 200,
        height: '25%',
        width: '50%',
        resizeMode: 'contain',
        overflow: 'hidden',
        borderRadius: 50,
    },
    talkingBubbleStyling:{
        position: 'absolute',
        alignItems: 'center',
        top: 450,
        backgroundColor: 'purple',
        height: 200,
        width: 200,
        elevation: 5,
        borderRadius: 120
    }
})

export default styles;