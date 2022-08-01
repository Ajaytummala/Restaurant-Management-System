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
    Button,
} from "react-native";

import FormButton from '../components/FormButton';
import Cards from "../components/Cards";
import AddCards from "./AddCards";
import Card from "../components/Card";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import LinearGradient from 'react-native-linear-gradient';
// import { mdiDelete } from '@mdi/js';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../navigation/AuthProvider';
import PaymentScreen from './PaymentScreen';
// import FormButton from "../components/FormButton";

const UserHome = ({ navigation, route }) => {
    const { user, logout } = useContext(AuthContext);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleted, setDeleted] = useState(false);
    const [totCount, setTotCount] = useState(0);
    const [total, setTotal] = useState(0);
    const size = 0;
    // const items = [];
    // const [items, setItems] = useState([]);
    const handleClick = () => {
        const items = [];
        console.log("ABD");
        posts.forEach(element => {
            if (element.count > 0) {
                // let temp = {name: element.userName, count: element.count, price: element.price};
                items.push({ name: element.userName, count: element.count, price: element.price })
                // setItems([...items,temp]);
            }
        })
        console.log("items : ", items);

        firestore()
            .collection('orders')
            .add({
                userId: user.uid,
                items: items,
                count: totCount,
                total: total,
                postTime: firestore.Timestamp.fromDate(new Date()),
                table: 0,
                paid: 0,
                deliveryCharges: 0,
                finalTotal: 0,
            })
            .then(() => {
                console.log('Order Added!');
                fetchData();
                setTotCount(0);
                setTotal(0);
                Alert.alert(
                    "Added to cart!",
                    "Click okay to continue",
                    [
                        { text: "Okay", onPress: () => navigation.navigate('Payment') }
                    ]
                );;

            })
            .catch((error) => {
                console.log('Something went wrong with added order to firestore.', error);
            });

    }

    const increase = (postId) => {
        console.log(postId);
        const index = posts.findIndex(el => el.id === postId);
        const c = posts[index].count + 1;
        posts[index] = { ...posts[index], count: c };
        setPosts(posts);
        setTotCount(totCount + 1);
        setTotal(total + parseFloat(posts[index].price))
        // firestore().collection('menu')
        // .doc(postId)
        // .get()
        // .then((query) => {
        //     const {price} = query.data();
        //     setTotal(total+parseFloat(price));
        // })
    }

    const decrease = (postId) => {
        // setPosts([...posts, posts[0]]);
        const index = posts.findIndex(el => el.id === postId);
        const c = posts[index].count - 1;
        if (c != -1) {
            posts[index] = { ...posts[index], count: c };
            setTotCount(totCount - 1),
                setTotal(total - parseFloat(posts[index].price))
            //     firestore().collection('menu')
            //     .doc(postId)
            //     .get()
            //     .then((query) => {
            //         const {price} = query.data();
            //         setTotal(total-parseFloat(price));
            // })
        };
    }


    const fetchData = async () => {
        try {
            setTotal(0);
            setTotCount(0);
            const list = [];
            await firestore()
                .collection('menu')
                .get()
                .then((querySnapshot) => {
                    console.log('Total Posts : ', querySnapshot.size);
                    querySnapshot.forEach(doc => {
                        const { post, postImg, postTime, price } = doc.data();
                        list.push({
                            id: doc.id,
                            userName: post,
                            price: price,
                            image: postImg,
                            postTime: postTime,
                            count: 0,
                        })
                    })
                })

            setPosts(list);
            console.log(posts);
            if (loading) {
                setLoading(false);
            }

        } catch (e) {
            console.log(e);
        }
    }

    // fetchData();
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <LinearGradient colors={['#10002b', '#240046']} style={styles.linearGradient}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.cardsContainer}>
                    {posts.map((post) => {
                        return (
                            <View key={post.id} style={styles.cardContainer}>
                                <LinearGradient colors={['#e0aaff', '#dee2ff']} style={{ borderRadius: 20 }}>
                                    <View style={styles.textCont}>
                                        <Image style={{ width: 70, height: 70, borderRadius: 10, borderColor: '#000', borderWidth: 1, marginRight: 25 }} source={{ uri: post.image }} />
                                        <View style={styles.tiletext}>
                                            <Text >Name : {post.userName.toString()}</Text>
                                            <Text >Price : {post.price}</Text>
                                        </View>
                                        <FormButton style={styles.btn} buttonTitle={<Icon name="minus-circle-outline" color='#000' size={25} />} onPress={() => decrease(post.id)} />
                                        <Text style={{ paddingHorizontal: 3, fontSize: 20 }}>{post.count}</Text>
                                        <FormButton style={styles.btn} buttonTitle={<Icon name="plus-circle-outline" color='#000' size={25} />} onPress={() => increase(post.id)} />
                                        {/* <FormButton style={styles.btn} buttonTitle={<Icon name="delete" color='#fff' size={23} />} onPress={() => onDelete(post.id) } /> */}
                                    </View>
                                </LinearGradient>
                            </View>
                        );
                    })}
                    {/* <Text style={{color: '#fff'}}>{totCount}</Text>
                                    <Text style={{color: '#fff'}}>{total}</Text> */}
                </ScrollView>
                {/* <PaymentScreen Items = {items}/> */}
                {totCount == 0 ? null : <TouchableOpacity
                    style={styles.footer}
                    onPress={() => {
                        handleClick();
                        //   navigation.navigate('Payment');
                    }}>

                    <View style={styles.footer}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text>{totCount} ITEMS</Text>
                            <Text style={{ fontSize: 30 }}><Icon1 name="rupee" size={30} /> {total}</Text>
                        </View>
                        <Text style={{ fontSize: 25, }}>Add to Cart <Icon1 name="arrow-circle-o-right" size={25} /></Text>
                    </View>
                </TouchableOpacity>}
            </LinearGradient>
        </ScrollView>
    );
};

export default UserHome;

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
        // paddingHorizontal: 30,
        paddingTop: 25,
        marginBottom: 0,
    },
    cardContainer: {
        marginTop: 15,
        marginBottom: 15,
        // width: '100%',
        marginHorizontal: 30,
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
        // backgroundColor: '#c9184a',
        // alignSelf: 'flex-end',
        // paddingVertical: 10,
        // paddingHorizontal: 10,
        // shadowColor: 'white',
        elevation: 50,

    },
    footer: {
        backgroundColor: '#fff',
        width: '100%',
        paddingHorizontal: 30,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});