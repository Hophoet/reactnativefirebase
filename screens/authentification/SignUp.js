import React from 'react'
import {StyleSheet, StatusBar, Dimensions, View, Text, ActivityIndicator, TextInput, TouchableOpacity} from 'react-native'
import Toast from '../../components/toasts'

import auth from '@react-native-firebase/auth';
//colors
import {colors} from '../../assets/colors/colors'

export default class  Login extends React.Component{ 
    constructor(props){
        super(props)
        //set state
        this.state = {
            isLoading:false,
            isFieldsFilled:false,
       
        }
        //set username and password 
        this.username = ''
        this.password = ''
        this.email = ''
    }

    //signup method
    _signUp = () => {
        //check request loading
        if(!this.state.isLoading){     
            //start the loading
            this.setState({isLoading:true})
            //get fields values
            let username = this.username.trim()
            let email = this.email.trim()
            let password = this.password


            //check the requirements of the fiels
            if(username.length === 0 && password.length === 0 && email.length === 0){
                Toast._show_bottom_toast('username, email and password are required')
                this.setState({isLoading:false})
                this.refs.username.focus()
            }
            //username empty case
            else if(username.length === 0){
                Toast._show_bottom_toast('username field is required')
                this.setState({isLoading:false})
                this.refs.username.focus()
            }
            //email empty case
            else if(email.length === 0){
                Toast._show_bottom_toast('email field is required')
                this.setState({isLoading:false})
                this.refs.email.focus()
            }
            //password empty case
            else if(password.length === 0){
                Toast._show_bottom_toast('password field is required')
                this.setState({isLoading:false})
                this.refs.password.focus()
            }
            //username and password provided case
            else{

                auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    console.log('User account created & signed in!');
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
                <View style={styles.signUpLoadingIndicatorContainer}>
                    <ActivityIndicator size='large' color={colors.core}/>
                </View>
            )
        }
        return (
            <View style={styles.signUpTitleContainer}>
                <Text>Sign up</Text>
                <Text>Signup to continue</Text>
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
                        placeholder='Enter your username'
                        ref='username'
                        style={styles.textinput}
                        onChangeText={text=>{this.username = text}}
                        onSubmitEditing={()=>{
                            this.refs.email.focus()
                        }}
                    />
                     <TextInput
                        placeholder='Enter your email'
                        ref='email'
                        style={styles.textinput}
                        keyboardType='email-address'
                        onChangeText={text=>{this.email = text}}
                        onSubmitEditing={() => this.refs.password.focus()}

                    />
                      <TextInput
                        placeholder='Enter your password'
                        ref='password'
                        style={styles.textinput}
                        secureTextEntry={true}
                        onChangeText={text=>{this.password = text}}
                        onSubmitEditing={() => {
                            if(!this.state.isLoading){
                                this._signUp
                            }
                        }
                        }

                    />
                </View>
                <TouchableOpacity 
                    style={styles.buttonContainer} 
                    activeOpacity={.5}
                    onPress={this._signUp}
                    disabled={(this.state.isLoading)?true:false}
                    >
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>
                <View style={styles.footer}>
                    <Text onPress={()=>this.props.navigation.navigate('SignIn', {})} style={styles.footerTitle}>Already have an account ? <Text style={styles.signinText}>sign in</Text></Text>
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
    signinText:{
        color:colors.core,
        fontWeight:'bold',
    },
    signUpTitleContainer:{
        justifyContent:'center',
        alignItems:'center',
    },
    signUpLoadingIndicatorContainer:{
        elevation:10,
        backgroundColor:'white',
        borderRadius:60
    }
})