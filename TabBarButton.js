// HomeScreen.js
import React from "react";
import { View, Text, Button, FlatList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import HomeScreen from "./HomeScreen";
import VideoScreen from "./VideosScreen";
import NotificationScreen from "./NotificationScreen";
import MessageScreen from "./MessageScreen";
import UserScreen from "./UserScreen";
import NewPostScreen from "./NewPostScreen";

const Tab = createBottomTabNavigator();

const TabBarButton = ({ navigation }) => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen
          name="TrangChu"
          options={{
            headerShown: false,
            tabBarLabel: "Trang Chủ",
            title: "Trang Chủ",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        >
          {(props) => <HomeScreen {...props} navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen
          name="Videos"
          component={VideoScreen}
          options={{
            headerShown: false,
            tabBarLabel: "Videos",
            title: "Videos",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="videocam" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="ThongBao"
          component={NotificationScreen}
          options={{
            headerShown: false,
            tabBarLabel: "Thông Báo",
            title: "Thông Báo",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="notifications-off" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="TinNhan"
          component={MessageScreen}
          options={{
            headerShown: false,
            tabBarLabel: "Tin Nhắn",
            title: "Tin Nhắn",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="send" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="User"
          // component={UserScreen}
          options={{
            headerShown: false,
            tabBarLabel: "User",
            title: "User",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people" color={color} size={size} />
            ),
          }}
        >
          {(props) => <UserScreen {...props} navigation={navigation}/>}
          </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabBarButton;
