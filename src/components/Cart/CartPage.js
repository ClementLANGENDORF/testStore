import React from 'react'
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Alert, ImageBackground} from 'react-native'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Entypo} from '@expo/vector-icons';

import * as CartAction from '../../actions/CartAction';

class CartPage extends React.Component {

	componentDidMount() {
		this.props.CartAction.getCart();
	}

	_showAlert = () => {
		Alert.alert(
			'Work in progress',
			'',
			[
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{text: 'OK', onPress: () => console.log('OK Pressed')},
			],
			{ cancelable: false }
		)
	};


	_keyExtractor = (item, index) => item.id;

	removeItem(item) {
		this.props.CartAction.removeFromCart(item);
	}

	render() {
		const {cart} = this.props;
		console.log('props', this.props);
		console.log('render cart', cart);

		if (cart && cart.length > 0) {
		    // this.getTotalPrices(cart);
			const Items = <FlatList contentContainerStyle={styles.list}
															data={cart}
															keyExtractor={this._keyExtractor}
															renderItem={({item}) =>
																<View style={styles.lineItem}>
                                                                    {console.log(item)}
                                                                    <View style={styles.lineItem}>
																	<Image style={styles.image} source={{uri: item.image}} resizeMode={'contain'}/>
																	</View>
																	<View style={styles.list}>
																	<Text style={styles.text}>{item.name}</Text>
																	<View style={styles.lineItem}>
																	<Text style={styles.text}>Quantity : {item.quantity}</Text>
                                                                    <Text style={styles.text}>Price : {item.totalPrice} $</Text>
																	</View>
																	</View>
																	<TouchableOpacity style={{marginLeft: 'auto'}}
																										onPress={() => this.removeItem(item)}><Entypo name="cross"
																																																	size={30}/></TouchableOpacity>
																</View>
															}
			/>;
			return (
				<ImageBackground  source={require('../../../assets/bkg.png')} style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
				<View style={styles.container}>
					{Items}
					<TouchableOpacity style={styles.button} onPress={() => 	this._showAlert()} >
						<Text style={{ color: '#fff' }}> BUY NOW </Text>
					</TouchableOpacity>
				</View>
				</ImageBackground>
			)
		} else {
			return (
				<ImageBackground  source={require('../../../assets/bkg.png')} style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
				<View style={styles.container}>
					<Text>Cart is empty!</Text>
				</View>
				</ImageBackground>
			)
		}
	}
}

const styles = StyleSheet.create({
	lineItem: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	list: {
		flexDirection: 'column'
	},
	button: {
		alignItems: 'center',
		backgroundColor: '#FE6F61',
		padding: 10,
		width: 150,
		height: 40,
		marginLeft: 20,
		marginBottom: 50,
		borderBottomLeftRadius: 17,
		borderBottomRightRadius: 17,
		borderTopLeftRadius: 17,
		borderTopRightRadius: 17,
	},
	image: {
		width: 60,
		height: 60
	},
	container: {
		flex: 1,
		marginTop: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 15,
		padding: 5
	}
});

function mapStateToProps(state) {
	return {
		cart: state.cart
	};
}

function mapDispatchToProps(dispatch) {
	return {
		CartAction: bindActionCreators(CartAction, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);