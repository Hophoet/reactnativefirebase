
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';


export default class App extends React.Component {
	constructor(props){
		super(props)
	}

	render(){
		return (
			<View style={styles.container}>
				<Text>Testing</Text>
			</View>
		)
	}


}

const styles = StyleSheet.create({
	container:{
		justifyContent:'center',
		alignItems:'center',
		flex:1,
	}
});

