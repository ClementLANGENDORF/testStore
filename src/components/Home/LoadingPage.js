import React from "react";
import {StyleSheet, Text, View, Dimensions, Image} from "react-native";
import LottieView from 'lottie-react-native';


class LoadingPage extends React.Component {

    componentDidMount() {
        this.animation.play();
        setTimeout(() => {
            this.props.navigation.navigate('Home');
        }, 2000);
    };

    render() {
        console.log(this.props);
        return (
            <View style={styles.contain}>
                <LottieView
                    ref={animation => {
                        this.animation = animation;
                    }}
                    autoPlay
                    autoSize={false}
                    loop={false}
                    source={require('../../Animations/data')}
                    //onAnimationFinish={}

                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'black'
    }
});

export default LoadingPage;