import React, {Component} from "react";
import {FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LoadingAnimation from '../../img/cart-loading.gif';
import * as ProductAction from '../../actions/ProductAction';

class ProductsList extends Component {

	state = {
		products: [],
	};

	componentDidMount() {
		this.props.ProductAction.getProducts();
	}

	_keyExtractor = (item, index) => item.id;

	render() {
		const {navigate} = this.props.navigation;
		const {products} = this.props;
		const Items = <FlatList contentContainerStyle={styles.list} numColumns={1}
														data={products.filter(item => item.categories[0].name === this.props.navigation.state.params.product.name)}
														keyExtractor={this._keyExtractor}
														renderItem={({item}) =>
															<TouchableHighlight style={{width: '75%'}}
																									onPress={() => navigate("Product", {product: item})}
																									underlayColor="white">
																<View style={styles.view}>
																	{console.log(item)}
																	<Image style={styles.image} source={{uri: item.images[0].src}}/>
																	<Text style={styles.text}>{item.name.toUpperCase()}</Text>
																	<Text style={styles.textOldPrice}>{item.regular_price} $</Text>
																	<Text style={styles.textPrice}>{item.price} $</Text>
																</View>
															</TouchableHighlight>
														}
		/>;
		return (
			<ImageBackground  source={require('../../../assets/bkg.png')} style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
			<ScrollView style={{flex: 1}}>
				{this.props.products.length ? Items :
					<View style={{alignItems: 'center', justifyContent: 'center'}}>
						<Image style={styles.loader} source={LoadingAnimation}/>
					</View>
				}
			</ScrollView>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	list: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	view: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10
	},
	loader: {
		width: 200,
		height: 200,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: 150,
		height: 150
	},
	text: {
		textAlign: 'center',
		fontSize: 15,
		padding: 5
	},
	textPrice: {
		textAlign: 'center',
		fontSize: 10,
		padding: 5
	},
	textOldPrice: {
		textAlign: 'center',
		fontSize: 10,
		padding: 5,
		textDecorationLine: 'line-through'
	},
});

function mapStateToProps(state) {
	return {
		products: state.products
	};
}

function mapDispatchToProps(dispatch) {
	return {
		ProductAction: bindActionCreators(ProductAction, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
