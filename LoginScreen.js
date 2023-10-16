import { Alert, Button, Pressable, Image, ImageBackground, Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { TextInput } from "react-native-gesture-handler"

import { ToastAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';

const URL_API = "https://652b8c9e4791d884f1fde040.mockapi.io/api/dangky"
const LoginScreen = ({ navigation }) => {
    const [taikhoan, setTaiKhoan] = useState('');
    const [matkhau, setMatKhau] = useState('');


    
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const getSinhVien = async () => {
        try {
            const response = await fetch(URL_API);
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSinhVien();
    }, []);

    var onClickItem = (item) => {
        alert(item.title)
    }

    const openGenderModal = () => {
        setShowGenderModal(true);
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ImageBackground style={{ backgroundColor: 'pink', width: "100%", height: "100%", alignItems: "center", flex: 1, justifyContent: "center" }}>
                <Text style={{ marginBottom: 50, fontSize: 35, fontWeight: "bold", color: 'blue' }}>ĐĂNG NHẬP</Text>

                <TextInput
                    value={taikhoan}
                    placeholder="Nhập tài khoản"
                    style={{ borderColor: "white", borderWidth: 1, height: 35, width: 300, marginBottom: 10, paddingHorizontal: 10, backgroundColor: 'white', borderRadius: 8 }}
                    onChangeText={(text) => setTaiKhoan(text)}
                ></TextInput>

                <TextInput
                    value={matkhau}
                    placeholder="Nhập mật khẩu"
                    style={{ borderColor: "white", borderWidth: 1, height: 35, width: 300, marginBottom: 70, paddingHorizontal: 10, backgroundColor: 'white', borderRadius: 8 }}
                    onChangeText={(text) => setMatKhau(text)}
                    secureTextEntry={true}
                ></TextInput>
                <View style={{ width: 300 }}>

                    <Button
                        title="Đăng nhập"
                        onPress={() => {
                            if (!taikhoan || !matkhau) {
                                console.log('Vui lòng điền đầy đủ thông tin');
                                ToastAndroid.show('Vui lòng điền đầy đủ thông tin', ToastAndroid.SHORT);
                            } else {
                                // Thực hiện kiểm tra tài khoản và mật khẩu trong API
                                fetch(`${URL_API}?taikhoan=${taikhoan}&matkhau=${matkhau}`, {
                                    method: "GET",
                                    headers: {
                                        Accept: "application/json",
                                    },
                                })
                                    .then((response) => response.json())
                                    .then((data) => {
                                        if (data && data.length > 0) {
                                            // Kiểm tra tài khoản và mật khẩu có tồn tại và khớp nhau
                                            const user = data[0];
                                            if (user.taikhoan === taikhoan && user.matkhau === matkhau) {
                                                console.log('Đăng nhập thành công');
                                                ToastAndroid.show('Đăng nhập thành công!', ToastAndroid.SHORT);
                                                // Chuyển đến màn hình khác sau khi đăng nhập thành công
                                                navigation.navigate('Quay lại');
                                            } else {
                                                console.log('Sai tài khoản hoặc mật khẩu');
                                                ToastAndroid.show('Sai tài khoản hoặc mật khẩu', ToastAndroid.SHORT);
                                            }
                                        } else {
                                            console.log('Tài khoản không hợp lệ');
                                            ToastAndroid.show('Tài khoản không hợp lệ', ToastAndroid.SHORT);
                                        }
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                    });
                            }
                        }}
                        style={{ marginLeft: 10 }}
                    />





                </View>
                <View style={{ margin: 20, flexDirection: "row" }}>
                    <Text>Đăng ký nếu bạn chưa có tài khoản? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('RegistrationInformation')}>
                        <Text style={{ color: "blue" }}> Đăng ký</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>


        </TouchableWithoutFeedback>

    )
}

export default LoginScreen