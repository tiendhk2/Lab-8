import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  Button,
  Modal,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

// const [showPopup, setShowPopup] = useState(false);
const banner = require("./assets/bachdang.jpg");
const avatar = require("./assets/bachdang.jpg");

const MenuScreen = ({ navigation }) => {
  const [showModel, setshowModel] = useState(false);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ borderBottomWidth: 1 }}>
        <View style = {{flexDirection: "row"}}>
          <Image source={banner} style={{ width: "100%", height: 250 }} />
          <View style = {{position: "absolute", marginLeft: '90%', marginTop: "6%"}}>
            <TouchableOpacity onPress={() => setshowModel(true)} >
              <Ionicons
                name="menu"
                size={35}
                style={{ marginTop: 20, marginEnd: 15, color: 'white'}}
              />
            </TouchableOpacity>
            <Modal
              visible={showModel}
              animationType="slide"
              transparent={true} // Để có nền trong suốt
              onRequestClose={() => setshowModel(false)} // Để có thể đóng modal bằng cách bấm nút back trên Android
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  marginEnd: 20,
                  marginTop: 40,
                }}
              >
                <View
                  style={{
                    width: 200,
                    height: 200,
                    backgroundColor: "white",
                    borderRadius: 10,
                    padding: 10
                  }}
                >
                  <Text>Menu:</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style = {{borderTopWidth: 1}}
                  >
                    <Text style = {{padding: 5}}>Đăng xuất</Text>
                  </TouchableOpacity>
                  <TouchableOpacity   style = {{borderTopWidth: 1}}  onPress={() => setshowModel(false)}>
                    <Text style = {{padding: 5}}>Đóng</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
        <View>
          <Image
            source={avatar}
            style={{
              width: 150,
              height: 150,
              borderRadius: 75,
              borderColor: "blue",
              borderWidth: 2,
              position: "absolute",
              top: -120,
              left: "20%",
              marginLeft: -75,
            }}
          />
        </View>
        <View style={{justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 40,
              marginLeft: 30,
              paddingBottom: 10,
            }}
          >
            ADMIN
          </Text>
          
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 20,
          borderBottomWidth: 1,
          borderTopWidth: 1,
          marginTop: 5,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            <Ionicons name="people" size={20} color="black" />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("NewPost")}
            style={{ marginLeft: 10 }}
          >
            <Text>Bạn đang nghĩ gì?</Text>
          </TouchableOpacity>
        </View>
        <Ionicons name="images" size={20} style={{ paddingEnd: 20 }} />
      </View>
    </ScrollView>
  );
};

export default MenuScreen;
