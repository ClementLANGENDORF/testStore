import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {DrawerNavigator, StackNavigator} from "react-navigation";
import {EvilIcons, Ionicons} from '@expo/vector-icons';
import {connect, Provider} from 'react-redux';

import HomePage from './src/components/Home/HomePage';
import Products from "./src/components/Products/ProductList";
import Product from "./src/components/Products/Product";
import CartPage from './src/components/Cart/CartPage';
import DrawerContainer from './src/components/Drawer/DrawerContainer';
import configureStore from './src/store/configureStore';
import LottieView from "lottie-react-native";

const DrawerNavigation = DrawerNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            headerTitle: (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image resizeMode={'contain'}
                           style={{height: 50, width: 200}} source={require('./assets/img_0.png')}/>
                </View>
            ),
        }
    },
    Products: {
        screen: Products,
        navigationOptions: {
            headerTitle: (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image resizeMode={'contain'}
                           style={{height: 50, width: 200}} source={require('./assets/img_0.png')}/>
                </View>
            ),
        }
    },
    Product: {
        screen: Product,
        navigationOptions: ({navigation}) => ({
            title: navigation.state.params.product.name
        }),
    },
    CartPage: {
        screen: CartPage,
        navigationOptions: {
            headerTitle: (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image resizeMode={'contain'}
                           style={{height: 50, width: 200}} source={require('./assets/img_0.png')}/>
                </View>
            ),
        }
    },
}, {
    contentComponent: DrawerContainer,
    drawerBackgroundColor: 'rgba( 0, 0, 0, 0.3)',
    inactiveBackgroundColor: 'yellow',
});


const StackNavigation = StackNavigator({

    DrawerNavigation: {screen: DrawerNavigation}
}, {

    headerMode: 'float',
    navigationOptions: ({navigation, screenProps}) => ({

        headerStyle: {backgroundColor: '#000000'},
        headerTintColor: 'white',
        inactiveBackgroundColor: 'yellow',
        headerLeft: drawerButton(navigation),
        headerRight: cartButton(navigation, screenProps)
    })
});

const drawerButton = (navigation) => (
    <Text
        style={{padding: 15, color: 'white'}}
        onPress={() => {
            if (navigation.state.index === 0) {
                navigation.navigate('DrawerOpen')
            } else {
                navigation.navigate('DrawerClose')
            }
        }
        }><Ionicons name="ios-menu" size={30}/></Text>
);

const cartButton = (navigation, screenProps) => (
    <Text style={{padding: 15, color: 'white'}}
          onPress={() => {
              navigation.navigate('CartPage')
          }}
    >
        <EvilIcons name="cart" size={30}/>
        {screenProps.cartCount}
    </Text>
);

class CA extends React.Component {
    render() {
        const cart = {
            cartCount: this.props.cart.length
        };
        return (
            <StackNavigation screenProps={cart}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    };
}

const ConnectedApp = connect(mapStateToProps, null)(CA);

const store = configureStore();

class App extends React.Component {

    state = {
        isLoading: false,
    };

    componentDidMount() {
        this.animation.play();
        setTimeout(() => {
            this.setState({ isLoading: true });
        }, 2000);
    };

    render() {

        const {isLoading} = this.state;
        if (isLoading === false) {
            return (
                <View style={styles.contain}>
                    <LottieView
                        ref={animation => {
                            this.animation = animation;
                        }}
                        autoPlay
                        autoSize={false}
                        loop={false}
                        source={require('./src/Animations/data')}
                        //onAnimationFinish={}

                    />
                </View>
            );
        }

        return (
            <Provider store={store}>
                <ConnectedApp/>
            </Provider>
        )
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

export default App;