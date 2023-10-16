import { View, Text, TextInput, StyleSheet, Button, Modal, FlatList, ActivityIndicator, SafeAreaView, ScrollView, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import NewPostScreen from './NewPostScreen';
import { ToastAndroid } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from "react";
import styles from "./styles";
import Icon from 'react-native-vector-icons/FontAwesome';
const Stack = createStackNavigator();
const URL_API = "https://652b8c9e4791d884f1fde040.mockapi.io/api/dangky"
const handleLike = (item) => {
    ToastAndroid.show('Like', ToastAndroid.SHORT);
};

const handleComment = (item) => {
    ToastAndroid.show('comment', ToastAndroid.SHORT);
};

const handleShare = (item) => {
    ToastAndroid.show('share', ToastAndroid.SHORT);
};
const HomeScreen = ({ navigation, onSearch }) => {
    const [taikhoan, setTaiKhoan] = useState('');

    const [likes, setLikes] = useState({}); // Sử dụng một đối tượng để lưu trạng thái like cho mỗi mục

    const handleLike = (item) => {
        const itemId = item.id; // Thay 'id' bằng thuộc tính định danh của mục

        if (likes[itemId]) {
            // Nếu đã like, giảm đi một lượt like và chuyển màu về màu xám
            setLikes({ ...likes, [itemId]: false });
        } else {
            // Nếu chưa like, tăng thêm một lượt like và chuyển màu về màu xanh
            setLikes({ ...likes, [itemId]: true });
        }
    };
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [dangbai, setDangBai] = useState('');

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [text, setText] = useState('');

    const handleTextInputPress = () => {
        setIsModalVisible(true);
    };

    
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




    const handleSaveText = () => {

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
            .then((response) => {
                console.log(response.json());
                getSinhVien();
                setDangBai('');
                ToastAndroid.show('Đăng bài thành công', ToastAndroid.SHORT);
            })
            .then((data) => {
               

            });

        setIsModalVisible(false);
    };





    useEffect(() => {
        getSinhVien();
    }, []);

    var onClickItem = (item) => {
        alert(item.title)
    }
    const [shouldReloadData, setShouldReloadData] = useState(false);

    useEffect(() => {
        if (shouldReloadData) {

            setShouldReloadData(false);
        }
    }, [shouldReloadData]);
    return (<SafeAreaView style={{ flex: 1 }}>

        <View>
            <View style={{ backgroundColor: 'pink', height: 150, paddingTop: 40, paddingLeft: 20, paddingBottom: 20, borderBottomWidth: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Twitter</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: 'black', borderWidth: 1, height: 36, width: 250, justifyContent: 'space-between', borderRadius: 8, backgroundColor: 'white', marginLeft: 20 }}>
                        <TextInput placeholder='Search...'
                            onChangeText={text => setSearchText(text)}
                            value={searchText}
                            style={{ padding: 10, fontSize: 13 }} />
                        <TouchableOpacity onPress={() => {
                            if (searchText) {
                                onSearch(searchText)
                            }
                        }}>
                            <Ionicons name="search" size={14} color='black' style={{ padding: 10 }} />
                        </TouchableOpacity>
                    </View>
                </View>



                <View style={{ marginTop: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 40, height: 40, borderColor: 'black', borderWidth: 1, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                            <Ionicons name="people" size={20} color='black' onPress={() => navigation.navigate('User')} />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={handleTextInputPress}>
                                <Text style={{ borderColor: 'black', borderWidth: 1, padding: 10, width: 300 }}>
                                    {text || 'Bạn đang nghĩ gì'}
                                </Text>
                            </TouchableOpacity>

                            <Modal
                                visible={isModalVisible}
                                animationType="slide"
                                transparent={true}
                            >
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                    <View style={{ backgroundColor: 'white', width: 300, padding: 10, borderRadius: 10 }}>
                                        <TextInput
                                            style={{
                                                borderColor: 'black',
                                                borderWidth: 1,
                                                padding: 10,
                                                height: 100,
                                            }}
                                            multiline={true}
                                            placeholder="Viết bài viết..."

                                            value={dangbai}
                                            onChangeText={(text) => setDangBai(text)}
                                        />
                                        <Button title="Lưu" onPress={handleSaveText} />
                                    </View>
                                </View>
                            </Modal>
                        </View>


                    </View>
                    <View>
                        <Ionicons name="images" size={20} style={{ paddingEnd: 40 }} />
                    </View>
                </View>

            </View>



            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.idText}>{item.hoten}</Text>
                        <Image style={styles.image} source={{ uri: item.anhdaidien }} />
                        <View style={styles.textContainer}>

                            <View style={styles.itemContainer}>
                                <Text style={styles.idDangBai}>{item.dangbai}</Text>
                            </View>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={() => handleLike(item)}>
                                    <Icon
                                        name="thumbs-up"
                                        size={20}
                                        color={likes[item.id] ? 'blue' : 'gray'} // Sử dụng biến trạng thái để xác định màu
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleComment(item)}>
                                    <Icon name="comment" size={20} color="gray" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleShare(item)}>
                                    <Icon name="share" size={20} color="gray"  />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            />


        </View>
    </SafeAreaView>


    )
}

export default HomeScreen