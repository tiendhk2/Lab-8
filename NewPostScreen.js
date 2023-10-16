import { View, Button, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
const URL_API = "https://652b8c9e4791d884f1fde040.mockapi.io/api/dangky"
import React, { useEffect, useState } from "react";
import { ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const NewPostScreen = ({ navigation }) => {
  const [dangbai, setDangBai] = useState('');
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
    <View style={{ padding: 20 }}>
      {isLoading ? (<ActivityIndicator />) : (
        <View style={{ margin: 10 }}>

          <TextInput value={dangbai}
            onChangeText={(text) => setDangBai(text)}
            style={{
              borderColor: 'white',
              borderWidth: 1,
              height: 100,
              padding: 10,
              fontSize: 20

            }}
            placeholder="Viết bài viết..."
            multiline={true}
          />
          <Button
          title="Đăng bài"
            onPress={() => {
              if (!dangbai || dangbai.trim() === '') {
                // Kiểm tra nếu `dangbai` trống rỗng hoặc chỉ chứa khoảng trắng
                ToastAndroid.show('Nội dung bài viết không được để trống', ToastAndroid.SHORT);
              } else {
                // Ngược lại, thực hiện đăng bài viết

                let newSV = {
                  dangbai: dangbai
                };

                fetch(URL_API, {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newSV),
                })
                  .then((response) =>{
                    console.log(response.json())
                  getSinhVien()
                  })
                  .then(() => {
                    navigation.navigate('Quay lại');
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }
            }}
            style={{
              backgroundColor: 'aqua',
              borderRadius: 5,
              marginTop: 15,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
            }}
          />

        </View>
      )}
    </View>

  )
}

export default NewPostScreen