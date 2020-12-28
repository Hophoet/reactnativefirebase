import React from 'react'
import {Dimensions, ToastAndroid } from 'react-native'

//class
export default class Toast {

  //show toast
  static _show_bottom_toast = async (message) => {
    //nothing else
    //ToastAndroid.SHORT for short duration
    //ToastAndroid.LONG for long duration
    ToastAndroid.show(message, ToastAndroid.SHORT)
    
  }
  //show toast
  static _show_center_toast = async (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    )
  }

  _show_toast_with_gravity = async ()=>{
    //ToastAndroid.CENTER
    //ToastAndroid.TOP
    //ToastAndroid.BOTTOM
    ToastAndroid.showWithGravity(
      'gravity toast',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    )
  }

  _show_toast_with_gravity_and_offset = async ()=>{

    ToastAndroid.showWithGravityAndOffset(
      'gravity toast, offset',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      Dimensions.get('window').height,
      Dimensions.get('window').height/2
    )
  }



}
