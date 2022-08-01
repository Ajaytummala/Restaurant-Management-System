import React, { useContext, useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Platform,
    StyleSheet,
    ScrollView,
    Alert,
} from "react-native";

import FormButton from '../components/FormButton';
import Cards from "../components/Cards";
import AddCards from "./AddCards";
import Card from "../components/Card";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import LinearGradient from 'react-native-linear-gradient';
// import { mdiDelete } from '@mdi/js';
import { Icon } from 'react-native-elements';
// import Icon from '../node_modules/react-native-vector-icons/dist/MaterialCommunityIcons';
// import Icon from '../node_modules/react-native-vector-icons/dist/MaterialCommunityIcons';

const StaffList = () => {

    const [posts, setPosts ] = useState([]);
    const [loading, setLoading ] = useState(true);
    const [deleted, setDeleted] = useState(false);


    const fetchData = async() => {
        try{
            const list = [];
            await firestore()
            .collection('menu')
            .get()
            .then((querySnapshot) => {
                console.log('Total Posts : ', querySnapshot.size);
                querySnapshot.forEach(doc => {
                    const { post, postImg, postTime, price } = doc.data();
                    list.push({
                        id : doc.id,
                        userName : post,
                        price : price,
                        image: postImg,
                        postTime: postTime,
                    })
                })
            })

            setPosts(list);
            // console.log(posts);
            if(loading){
                setLoading(false);
            }

        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchData();
    },[posts])

    useEffect(() => {
        fetchData();
        setDeleted(false);
    }, [deleted]);

    const handleDelete = (postId) => {
        Alert.alert(
          'Delete post',
          'Are you sure?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed!'),
              style: 'cancel',
            },
            {
              text: 'Confirm',
              onPress: () => onDelete(postId),
            },
          ],
          {cancelable: false},
        );
    };


    const onDelete = (postId) => {
        console.log(postId);
        
        firestore().collection('menu')
        .doc(postId)
        .get()
        .then(documentSnapshot => {
            if( documentSnapshot.exists ){
                const { postImg } = documentSnapshot.data();
                if( postImg !== null){
                    const storageRef = storage().refFromURL(postImg);
                    const imageRef = storage().ref(storageRef.fullPath);

                    imageRef
                    .delete()
                    .then(() => {
                        console.log(`${postImg} has been deleted SuccessfulllY!`);
                        deleteFirestoreData(postId);
                    })
                    .catch((e) =>{
                        console.log("Error while deleting the image");
                    })
                }
            }
        })
    };      

    const deleteFirestoreData= (postId) =>{
        firestore()
        .collection('menu')
        .doc(postId)
        .delete()
        .then(() => {
            Alert.alert(
                'Member deleted',
                'The person is no longer in staff',
            );  
            // deleted = true;
        })
        .catch( e => console.log('Error', e));
    }

    const addTodo = (title, desc, image) => {
        console.log("I am add todo", title, desc);
        let sno = 0;
        if (todos.length === 0) sno = 1;
        else sno = todos[todos.length - 1].sno + 1;
        const myTodo = {
            sno: sno,
            title: title,
            desc: desc,
            image: image,
        };
        console.log("I am add todo", title, desc, image);
        setTodos([...todos, myTodo]);
        console.log(myTodo);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <LinearGradient colors={['#10002b', '#240046']} style={styles.linearGradient}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.cardsContainer}>
                    {posts.map((post) => {
                        return (
                            <View key={post.id} style={styles.cardContainer}>
                                <LinearGradient colors={['#e0aaff', '#dee2ff']} style={{borderRadius: 20}}>
                                <View style={styles.textCont}>
                                    <Image style={{ width: 70, height: 70, borderRadius: 10, borderColor: '#000', borderWidth: 1, marginRight: 25}} source={{ uri: post.image }} />
                                    <View style={styles.tiletext}>
                                    <Text >Name : {post.userName.toString()}</Text>
                                    <Text >Price : {post.price}</Text>
                                    </View>
                                    <FormButton style={styles.btn} buttonTitle={<Icon name="delete" color='#fff' size={23} />} onPress={() => onDelete(post.id) } />
                                    </View>
                                </LinearGradient>
                            </View>
                        );
                    })}
                </ScrollView>
            </LinearGradient>
        </ScrollView>
    );
};

export default StaffList;

const styles = StyleSheet.create({
    container: {
        // padding: 20,
        // paddingTop: 10,
        flex: 1,
        // backgroundColor: "#fff",
        // justifyContent: "center",
        // alignItems: 'center',
    },
    linearGradient: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        paddingHorizontal: 30,
        paddingTop: 25,
        marginBottom: 0,
    },
    cardContainer: {
        marginTop: 15,
        marginBottom: 15,
        width: '100%',
    },
    cardsContainer: {
        width: '100%',
    },
    tileContainer: {
        alignItems: 'center',
    },
    tiletext: {
        flexDirection: 'column',
        flex: 1,
    },
    textCont: {
        // justifyContent: 'space-evenly',
        alignItems: 'center',
        // backgroundColor: '#e0aaff',
        borderRadius: 20,
        // borderTopLeftRadius: 20,
        flexDirection: 'row',
        paddingVertical: 35,
        paddingHorizontal: 25,
    },
    text: {
        fontSize: 38,
        marginBottom: 15,
        color: "#051d5f",
    },
    btn: {
        borderRadius: 25,
        backgroundColor: '#c9184a',
        // alignSelf: 'flex-end',
        paddingVertical: 10,
        paddingHorizontal: 10,
        shadowColor: 'white',
        elevation: 50,

    },
});