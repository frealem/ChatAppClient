import { Image, StyleSheet, Text, View,KeyboardAvoidingView, ImageBackground } from 'react-native'
import React, {useContext, useState } from 'react'
import tw from "twrnc";
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import Loader from '../components/loader'
import { BlurView } from 'expo-blur';
import Logo from '../components/logo';
import { AntDesign } from '@expo/vector-icons';

import {createAccount} from '../hooks/signalr'

const RegisterScreen = () => {
    const[email,setemail]=useState(null);
    const[userName,setuserName]=useState(null);
    const[password,setPassword]=useState(null);
    const[isLoading,setIsLoading]=useState(false);
    // const[name,setName]=useState(null);
    
    const navigator=useNavigation();
    const incomplete=!email||!password;

    
      const handleSignUp = async () => {
        try {
          setIsLoading(true)
          const data = await createAccount(userName,email, password);
          if(data === null){
            Alert.prompt("couldn't sign up");
          }
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          console.log("successfully logged in");
          setIsLoading(false)
          navigator.navigate('Home')          
        } catch (err) {
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
<AntDesign name="user" size={24} color="white" style={styles.icon} />
   <TextInput
       style={styles.input}
        placeholder="Enter your Full Name"
        value={userName}
        onChangeText={text=>setuserName(text)}
        placeholderTextColor="white"
        placeholderStyle={styles.placeholder}
    />
    </View>
    <View style={styles.inputContainer}>
    <AntDesign name="mail" size={24} color="white" style={styles.icon}/>
   <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={text=>setemail(text)}
        placeholderStyle={styles.placeholder}
        placeholderTextColor="white"
    />
    </View>
    <View style={styles.inputContainer}>
    <AntDesign name="lock" size={24} color="white" style={styles.icon} />
    <TextInput
         style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={text=>setPassword(text)}
        placeholderStyle={styles.placeholder}
        placeholderTextColor="white"
     //   secureTextEntry
    />
    </View>
   </View>
   <TouchableOpacity
   onPress={handleSignUp}
   style={[tw` w-70 h-14 mb-6 text-center rounded-xl bg-transparent border border-white border-2 mt-20`,
   ]}
   disabled={incomplete}
   
   ><Text  style={[tw`text-center text-xl  mt-3 text-white font-bold`, incomplete ? tw `text-white text-center`:tw `text-cyan-500 text-center`]}
   >SIGN UP</Text></TouchableOpacity>

   <TouchableOpacity
   onPress={()=>{navigator.navigate('Login')}}><Text  style={tw`flex text-xl  text-white`}>I have already an account,<Text style={{fontSize:20}}>sign in.</Text></Text></TouchableOpacity>
    
    </KeyboardAvoidingView></BlurView></ImageBackground>
    {isLoading ? <Loader/>:null}</>
  )
}

export default RegisterScreen

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
  backgroundColor:"transparent",
  borderBottomColor:"white",
},
})