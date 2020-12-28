import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignUp from '../screens/authentification/SignUp'
import SignIn from '../screens/authentification/SignIn'
import PhoneAuthentification  from '../screens/authentification/PhoneAuthentification'

const AuthNav = createSwitchNavigator({
    SignIn:{
      screen: SignIn,
    },
    SignUp:{
        screen:SignUp
    },
    PhoneAuthentification:{
      screen:PhoneAuthentification
    }
  }, {initialRouteName:'PhoneAuthentification'})




  export default createAppContainer(AuthNav)