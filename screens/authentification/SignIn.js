import React from 'react'
import {StyleSheet, StatusBar, View, Text, ActivityIndicator, TextInput, TouchableOpacity, Dimensions} from 'react-native'

import auth from '@react-native-firebase/auth';


import Toast from '../../components/toasts'
//colors
import {colors} from '../../assets/colors/colors'

export default class SignIn extends React.Component{ 
    constructor(props){
        super(props)
        //set state
        this.state = {
            isLoading:false,
       
        }
        //set email and password 
        this.email = ''
        this.password = ''
    }

    //login method
    _login = () => {
        //check request loading
        if(!this.state.isLoading){     
            //start the loading
            this.setState({isLoading:true})
            //get fields values
            let email = this.email.trim()
            let password = this.password
            //check the requirements of the fiels
            if(email.length === 0 && password.length === 0){
                Toast._show_bottom_toast('email and password are required')
                this.setState({isLoading:false})
                this.refs.email.focus()
                
            }
            //email empty case
            else if(email.length === 0){
                Toast._show_bottom_toast('email field is required')
                this.setState({isLoading:false})
                this.refs.email.value = 'focus'
                this.refs.email.focus()
            }
            //password empty case
            else if(password.length === 0){
                Toast._show_bottom_toast('password field is required')
                this.setState({isLoading:false})
                this.refs.password.focus()
            }
            //email and password provided case
            else{
                //build POST request with the email and password providede

                auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                    console.log('User signed in!');
                    this.setState({isLoading:false})
                })
                .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    this.setState({isLoading:false})
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    this.setState({isLoading:false})
                }

                console.error(error.code);
                console.log(error)
                this.setState({isLoading:false})
                });

            }
        
        
        
        
        }
        
    }
    //loading activity render
    _loader = () => {
        if(this.state.isLoading){
            return (
                <View style={styles.loginLoadingIndicatorContainer}>
                    <ActivityIndicator size='large' color={colors.core}/>
                </View>
            )
        }
        return (
            <View style={styles.loginTitleContainer}>
                <Text>BlogIn</Text>
                <Text>login to continue</Text>
            </View>
        )
    }

 
    //components rending method
   
    render(){
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor={colors.core}/>
                <View style={styles.headerContainer}>

                    {this._loader()}
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                        placeholder='Enter your email'
                        ref='email'
                        style={styles.textinput}
                        onChangeText={text=>{this.email = text}}
                        onSubmitEditing={()=>{
                            this.refs.password.focus()
                
                        }}
                    />
                     <TextInput
                        placeholder='Enter your password'
                        ref='password'
                        style={styles.textinput}
                        secureTextEntry={true}
                        onChangeText={text=>{this.password = text}}
                        onSubmitEditing={this._login}

                    />
                </View>
                <TouchableOpacity 
                    style={styles.buttonContainer} 
                    onPress={this._login}
                    disabled={(this.state.isLoading)?true:false}
                    >
                    <Text style={styles.buttonText}>SIGN IN</Text>
                </TouchableOpacity>
                <View style={styles.footer}>
                    <Text onPress={()=>this.props.navigation.navigate('SignUp', {})} style={styles.footerTitle}>Not have an account yet ?<Text style={styles.signupText} > sign up</Text></Text>
                </View>
            </View>
        )
    }


}



//set screen styles
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center'
     
    },
    buttonContainer:{
        backgroundColor:colors.core,
        padding:10,
        marginHorizontal:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:40,
        elevation:10,

    },
    buttonText:{
        color:'white',
        fontWeight:'bold',
    }
    ,
    title:{
        alignSelf:'center',
        margin:10
    },
    formContainer:{

    },
    textinput:{
     
        backgroundColor:'#ffff',
        marginHorizontal:10,
        padding:8,
        marginBottom:10,
        elevation:2,
        borderRadius:40,
        paddingHorizontal:20,
    },
    headerContainer:{
        alignItems:'center',
        marginBottom:20
    },
    footerTitle:{
        color:'gray',
        margin:20
    },
    signupText:{
        color:colors.core,
        fontWeight:'bold',
    },
    loginTitleContainer:{
        justifyContent:'center',
        alignItems:'center',
    },
    loginLoadingIndicatorContainer:{
        elevation:10,
        backgroundColor:'white',
        borderRadius:60
    }
})