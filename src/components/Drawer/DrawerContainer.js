import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

export default class DrawerContainer extends React.Component {


	render() {
		const {navigation} = this.props;
		return (
			<View style={styles.container}>
				<Text
					onPress={() => navigation.navigate('Home')}
					style={styles.transparentButton}>
					Home
				</Text>
				<Text
					onPress={() => navigation.navigate('Products')}
					style={styles.transparentButton}>
					Shop
				</Text>
				<Text
					onPress={() => navigation.navigate('CartPage')}
					style={styles.transparentButton}>
					Cart
				</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 40,
		paddingHorizontal: 20,

	},
	transparentButton: {
		fontSize: 18,
		fontWeight: 'bold',
		alignItems: 'center',
		width: '75%',
		color: '#ffffff',
		padding: 15,
		margin: 5,
		borderRadius: 2,
		borderBottomWidth: 1,
		borderColor: '#ffffff',
		textAlign: 'left'
	}
});
