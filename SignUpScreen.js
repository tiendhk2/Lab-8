import { Alert, Button, ImageBackground, Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import React from "react";
import { useState } from "react";



const LoginScreen = ({navigation}) => {
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setconfirmPass] = useState('');
    
    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ImageBackground  style = {{backgroundColor: 'pink',width: "100%", height: "100%", alignItems: "center", flex: 1, justifyContent: "center"}}>
            <Text style={{marginBottom: 50, fontSize: 35, fontWeight: "bold", color: 'blue'}}>ĐĂNG KÝ</Text>

            <TextInput
                value={mail}
                placeholder="Nhập Email"
                style={{ borderColor: "white", borderWidth: 1, height: 35, width: 300, marginBottom: 10, paddingHorizontal: 10}}
                onChangeText={(text) => setMail(text)}
            ></TextInput>

            <TextInput
                value={pass}
                placeholder="Nhập Pass"
                style={{borderColor: "white", borderWidth: 1, height: 35, width: 300, marginBottom: 10, paddingHorizontal: 10}}
                onChangeText={(text) => setPass(text)}
                secureTextEntry={true}   
            ></TextInput>

            <TextInput
                value={confirmPass}
                placeholder="Confirm Pass"
                style={{borderColor: "white", borderWidth: 1, height: 35, width: 300, marginBottom: 70, paddingHorizontal: 10}}
                onChangeText={(text) => setconfirmPass(text)}
                secureTextEntry={true}   
            ></TextInput>
            <View style = {{flexDirection: "row"}}>
                <View style = {{width: 145}}>
                    <Button title="Quay lại" onPress={() => {navigation.navigate('RegistrationInformation')}}></Button>
                </View>
                <View style = {{width: 145, marginLeft: 10}}>
                  
                </View>
            </View>
            
            </ImageBackground>
        </TouchableWithoutFeedback>
        
    )
}


export default LoginScreen