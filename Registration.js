import {
  Alert, Button, ImageBackground, Keyboard, Text, FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  DatePickerIOS,
  Modal
} from "react-native"
import { TextInput } from "react-native-gesture-handler"
import styles from "./styles";
// import React, { useEffect } from "react";
// import { useState } from "react";
// import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from "react";

import { ToastAndroid } from 'react-native';

const URL_API = "https://652b8c9e4791d884f1fde040.mockapi.io/api/dangky"



const RegistrationInformation = ({ navigation }) => {
  const [taikhoan, setTaiKhoan] = useState('');
  const [matkhau, setMatKhau] = useState('');
  const [hoten, setHoTen] = useState('');
  const [ngaysinh, setNgaySinh] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gioitinh, setGioiTinh] = useState('');
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  //dfadsf

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




  //hdhg
  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setNgaySinh(selectedDate);
      setShowDatePicker(false);
    } else {
      setShowDatePicker(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground source={require('./assets/image/backgroud.jpg')} style={{ width: "100%", height: "100%", alignItems: "center", flex: 1, justifyContent: "center" }}>
        <Text style={{ marginBottom: 50, fontSize: 35, fontWeight: "bold", color: 'blue' }}>ĐĂNG KÝ</Text>
        <TextInput
          value={taikhoan}
          placeholder="Nhập tài khoản"
          style={{ borderColor: "white", borderWidth: 1, height: 35, width: 300, marginBottom: 10, paddingHorizontal: 10 }}
          onChangeText={(text) => setTaiKhoan(text)}
        ></TextInput>

        <TextInput
          value={matkhau}
          placeholder="Nhập mật khẩu"
          style={{ borderColor: "white", borderWidth: 1, height: 35, width: 300, marginBottom: 10, paddingHorizontal: 10 }}
          onChangeText={(text) => setMatKhau(text)}
        ></TextInput>
        <TextInput
          value={hoten}
          placeholder="Nhập họ và tên"
          style={{ borderColor: "white", borderWidth: 1, height: 35, width: 300, marginBottom: 10, paddingHorizontal: 10 }}
          onChangeText={(text) => setHoTen(text)}
        ></TextInput>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={{ borderColor: "white", borderWidth: 1, height: 35, width: 300, marginBottom: 10, paddingHorizontal: 10, justifyContent: 'center' }}
        >
          <Text>{ngaysinh.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker value={ngaysinh} mode="date" onChange={handleDateChange} />
        )}


        <TouchableOpacity
          onPress={openGenderModal}
          style={{ borderColor: "white", borderWidth: 1, height: 35, width: 300, marginBottom: 10, paddingHorizontal: 10, justifyContent: 'center' }}
        >
          <Text>{gioitinh || "Chọn giới tính"}</Text>
        </TouchableOpacity>


        <Modal animationType="slide" transparent={true} visible={showGenderModal} onRequestClose={() => {
          setShowGenderModal(false);
        }}
        >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, width: 250, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Chọn giới tính</Text>
              <TouchableOpacity onPress={() => setGioiTinh("Nam")} style={{ borderTopWidth: 1, borderBottomWidth: 1, width: "100%" }}>
                <Text style={{ padding: 5, fontWeight: "bold", color: 'red', fontSize: 16 }}>Nam</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setGioiTinh("Nữ")} style={{ borderBottomWidth: 1, width: "100%" }}>
                <Text style={{ padding: 5, fontWeight: "bold", color: 'red', fontSize: 16 }}>Nữ</Text>
              </TouchableOpacity>

              <Button title="Đóng" onPress={() => setShowGenderModal(false)} style={{ marginTop: 10 }} />
            </View>
          </View>
        </Modal>


        <View style={{ flexDirection: "row" }}>
          <View style={{ width: 145 }}>
            <Button
              title="Đăng ký"
              onPress={() => {
                // Thực hiện kiểm tra validate trước khi đăng ký
                if (!taikhoan || !hoten || !ngaysinh || !gioitinh) {
                  // Hiển thị thông báo hoặc xử lý lỗi
                  console.log('Vui lòng điền đầy đủ thông tin');
                  ToastAndroid.show('Vui lòng điền đầy đủ thông tin', ToastAndroid.SHORT);
                } else if (matkhau.length < 3) {
                  // Kiểm tra nếu mật khẩu có ít hơn 3 ký tự
                  console.log('Mật khẩu phải có ít nhất 3 ký tự');
                  ToastAndroid.show('Mật khẩu phải có ít nhất 3 ký tự', ToastAndroid.SHORT);
                } else {
                  // Thực hiện kiểm tra tài khoản tồn tại
                  fetch(URL_API + `?taikhoan=${taikhoan}`, {
                    method: "GET",
                    headers: {
                      Accept: "application/json",
                    },
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      // Kiểm tra kết quả từ API, nếu tài khoản đã tồn tại
                      if (data && data.length > 0) {
                        ToastAndroid.show('Tài khoản đã tồn tại', ToastAndroid.SHORT);
                      } else {
                        // Nếu tài khoản không tồn tại và mật khẩu hợp lệ, thực hiện đăng ký
                        let newSV = {
                          taikhoan: taikhoan,
                          matkhau: matkhau,
                          hoten: hoten,
                          ngaysinh: ngaysinh,
                          gioitinh: gioitinh,
                        };

                        fetch(URL_API, {
                          method: "POST",
                          headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(newSV),
                        })
                          .then((response) => response.json())
                          .then((data) => {
                            console.log(data);
                            // Gọi hàm getSinhVien để cập nhật dữ liệu
                            getSinhVien();

                            ToastAndroid.show('Đăng ký thành công!', ToastAndroid.SHORT);
                            navigation.navigate('Login');
                          })
                          .catch((error) => {
                            console.error(error);
                            // Xử lý lỗi nếu cần
                          });
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
          <View style={{ width: 145, marginLeft: 10 }}>
            <Button title="Hủy" onPress={() => navigation.navigate('Login')} style={{ marginLeft: 10 }}></Button>
          </View>
        </View>



        {/* 
        <View style={{ padding: 20 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View>

            <Button title="Them SV" onPress={() => {

              let newSV = {
                hoten: 'Dương Hồng Tiến',
                ngaysinh: '2002',

              };

              fetch(URL_API, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newSV),
              })
                .then((response) => {
                  console.log(response.json())
                  getSinhVien()

                });
            }} />



            
            <FlatList
              data={data} 
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => {
                  alert(item.tensinhvien)
                }} >
                  <View style={styles.itemContainer}>      
                    <View style={styles.textContainer}>
                      <Text style={styles.idText}>{item.hoten}</Text>
                      <Text style={styles.titleText}>{item.ngaysinh}</Text>
                  
                    </View>
                  </View>

                </TouchableOpacity>
              )}
            />


          </View>
        )}
      </View> */}

      </ImageBackground>
    </TouchableWithoutFeedback>

  )
}


export default RegistrationInformation