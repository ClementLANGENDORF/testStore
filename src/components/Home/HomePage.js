import React from "react";
import {
	Dimensions,
	FlatList,
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from "react-native";
import * as CategoriesAction from "../../actions/CategoriesAction";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LoadingAnimation from "../../img/cart-loading.gif";

class HomePage extends React.Component {


	componentDidMount() {
		this.props.CategoriesAction.getCategories();

	}

	_keyExtractor = (item, index) => item.id;

	render() {
		const {navigate} = this.props.navigation;
		const {categories} = this.props;

		const Items = <FlatList contentContainerStyle={styles.list} numColumns={1}
														data={categories || []}
														keyExtractor={this._keyExtractor}
														renderItem={({item}) =>
															<TouchableHighlight style={styles.imageContainer}
																									onPress={() => navigate("Products", {product: item})}
																									underlayColor="white">
																<View>
																	<Image
																		resizeMode={'cover'}
																		source={item.image !== null ? {uri: item.image.src} : require('../../../assets/img_0.png')}
																		style={styles.image}
																	/>
																	<Text style={styles.text}>{item.name}</Text>
																</View>
															</TouchableHighlight>
														}/>;
		return (
			<ImageBackground  source={require('../../../assets/bkg.png')} style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
			<View style={{backgroundColor: '#5A5A5A'}}>
				<Text style={{marginTop: 10, fontSize: 18, textAlign: 'center', color: '#FE6F61', padding: 10}}>Private sales</Text>
				<ScrollView
					scrollEventThrottle={10}
					pagingEnabled
					style={{marginBottom: 10, marginTop: 25}}>
					{this.props.categories.length ? Items :
						<View style={{alignItems: 'center', justifyContent: 'center'}}>
							<Image style={styles.loader} source={LoadingAnimation}/>
						</View>
					}
				</ScrollView>
			</View>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	imageContainer: {
		width: Dimensions.get('window').width,
		height: 250,
		marginBottom: 5
	},
	list: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	},
	title: {
		fontSize: 22,
		padding: 10
	},
	sliderImage: {
		height: 350,
		width: 350
	},

	view: {
		padding: 1
	},
	loader: {
		width: 200,
		height: 200,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		opacity: 0.8,
		width: Dimensions.get('window').width,
		height: 250,
	},
	text: {
		position: 'absolute',
		top: 5,
		right: 20,
		textAlign: 'center',
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
		padding: 5
	}
});

function mapStateToProps(state) {
	return {
		categories: state.categories
	};
}

function mapDispatchToProps(dispatch) {
	return {
		CategoriesAction: bindActionCreators(CategoriesAction, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
