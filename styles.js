import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: "#B9D3EE",
        borderRadius: 10,
        flexDirection: "row", // Để các phần tử nằm cạnh nhau
        height: Dimensions.get("window").height / 8,
        marginTop: 5,
    },
    idText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    titleText: {
        marginTop: 5,
        fontSize: 14,
    },
    image: {
        borderRadius: 5,
        margin: 10,
        width: "20%",
        height: "80%",
    },
    textContainer: {
        flex: 1, // Để các phần tử trong textContainer có thể mở rộng theo chiều ngang
        marginLeft: 10, // Khoảng cách giữa hình ảnh và textContainer
        padding: 5,
        justifyContent: 'center'
    }, itemContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 25, // Để làm tròn hình ảnh
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    idText: {
        marginLeft:15,
        marginBottom:5,
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        borderWidth: 0.4,
        backgroundColor: "#a4cade"
    }, itemContainer: {
        flex: 1, // Đảm bảo các thành phần con có thể thay đổi kích thước tỷ lệ theo chiều ngang
        padding: 10,
    },
    idDangBai: {
        flexWrap: 'wrap', // Cho phép text tự động xuống dòng
        fontSize: 18
    }, customImage: {
        width: 50,
        height: 50,
      },
      customText: {
        fontSize: 16,
        color: 'blue',
      },
});

export default styles