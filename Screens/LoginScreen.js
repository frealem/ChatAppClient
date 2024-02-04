import { Image, StyleSheet, Text, View,KeyboardAvoidingView, ImageBackground } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import tw from "twrnc";
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signIn } from '../hooks/signalr';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/loader'
import { BlurView } from 'expo-blur';
import Logo from '../components/logo';
import { AntDesign } from '@expo/vector-icons';

// import { BlurView } from '@react-native-community/blur';


const LoginScreen = () => {
    const[email,setemail]=useState(null);
    const[password,setPassword]=useState(null);
    const[isLoading,setIsLoading]=useState(false);
    
    const navigator=useNavigation();
    const incomplete=!email||!password;
    

    const handleSignIn= async () => {
      try {
        setIsLoading(true)
        const data = await signIn(email, password);
        if(data === null) {
          Alert.alert('Couldnt sign in ','incorrect password or email');
          return;
        }
        //await setSessionVariable('token',data.token);
        //await setSessionVariable('userId',data.userId);
        await AsyncStorage.setItem('token',data.token)
        await AsyncStorage.setItem('userId', data.userId)
        // localStorage.setItem('token', data.token);
        // localStorage.setItem('userId', data.userId);
        console.log("successfully logged in");
        setIsLoading(false);
        navigator.navigate('Home')
        // code to store token and navigate to next screen
      } catch (err) {
        // code to display error message
        console.log(err)
      }
    }
   
  return (<>
   <ImageBackground
            source={require('../assets/chatgirl.jpg')}
            style={styles.backgroundImage}
        >
            <BlurView
                intensity={50}
                style={styles.blurView}
            >
              <KeyboardAvoidingView style={tw`flex-1 items-center pt-8`}>
    <Logo/>
    <View style={tw`items-center text-xl pt-18`}>
  <View style={styles.inputContainer}>
  <AntDesign name="mail" size={24} color="white" style={styles.icon}/>
    <TextInput
      style={styles.input}
      placeholder="Enter your email"
      value={email}
      onChangeText={text => setemail(text)}
      placeholderTextColor="white"
      underlineColorAndroid="transparent"
      placeholderStyle={styles.placeholder}
    />
  </View>

  <View style={styles.inputContainer}>
    <AntDesign name="lock" size={24} color="white" style={styles.icon} />
    <TextInput
      style={styles.input}
      placeholder="Enter your password"
      value={password}
      onChangeText={text => setPassword(text)}
   //   secureTextEntry
      placeholderTextColor="white"
      underlineColorAndroid="transparent"
      placeholderStyle={styles.placeholder}
    />
  </View>
</View>
   <TouchableOpacity
   onPress={handleSignIn}
   style={[tw` w-70 h-14 mb-6 text-center rounded-xl bg-transparent border border-white border-2 mt-20 `,
   ]}
   disabled={incomplete}
   
   ><Text  style={[tw`text-center text-xl  mt-3 text-white font-bold`,
   incomplete ? tw `text-white text-center`:tw `text-cyan-500 text-center`]}
   >SIGN IN</Text></TouchableOpacity>

   <TouchableOpacity
   onPress={()=>{navigator.navigate('Register')}}><Text  style={{color:"#fff" ,fontSize:20}}>
   I don't have an account,<Text style={{fontSize:20}}>sign up.</Text></Text>
   </TouchableOpacity>
   </KeyboardAvoidingView>
   </BlurView>
   </ImageBackground>
    
    {isLoading ? <Loader/>:null}</>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
},
blurView: {
    flex: 1,
},
inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth:0,
  borderBottomWidth: 2,
  borderBottomColor: 'white',
  marginBottom: 30,
},
icon: {
  marginRight:-25,
  backgroundColor:"transparent"
},
input: {
  flex: 1,
  height: 60,
  justifyContent:'center',
  color: 'black',
  width:280,
  paddingLeft:30,
  backgroundColor:"transparent"
},
})