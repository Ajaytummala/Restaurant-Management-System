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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AdminPaymentsScreen = () => {

    const [orders, setOrders] = useState([]);

    const fetchData = async () => {
        try {
            const list = [];
            await firestore()
                .collection('orders')
                .get()
                .then((querySnapshot) => {
                    console.log('Total Payments : ', querySnapshot.size);
                    querySnapshot.forEach(doc => {
                        const { count, deliveryCharges, total, finalTotal, items, paid, postTime, table, userId } = doc.data();
                        list.push({
                            id: doc.id,
                            userID: userId,
                            totalItems: count,
                            foodAmount: total,
                            deliveryAmount: deliveryCharges,
                            totalAmount: finalTotal,
                            items: items,
                            paid: paid,
                            postTime: postTime,
                        })
                    })
                })
            setOrders(list);
            // console.log(orders);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchData();
    }, [orders])


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <LinearGradient colors={['#10002b', '#240046']} style={styles.linearGradient}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.cardsContainer}>
                    {orders.map((order) => {
                        if (order.paid == 1) {
                            return (
                                <View key={order.id} style={styles.cardContainer}>
                                    <LinearGradient colors={['#e0aaff', '#dee2ff']} style={{ borderRadius: 20 }}>
                                        <View style={styles.textCont}>
                                            <View style={styles.tiletext}>
                                                <Text> userId : {order.userID}</Text>
                                                <Text> count : {order.totalItems}</Text>
                                                <Text> total : {order.foodAmount}</Text>
                                                <Text> deliveryCharges : {order.deliveryAmount}</Text>
                                                <Text> finalTotal : {order.totalAmount}</Text>

                                            </View>
                                        </View>
                                    </LinearGradient>
                                </View>
                            );
                        }
                    })}
                </ScrollView>
            </LinearGradient>
        </ScrollView>
    );
}

export default AdminPaymentsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        alignItems: 'center',
        borderRadius: 20,
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
        paddingVertical: 10,
        paddingHorizontal: 10,
        shadowColor: 'white',
        elevation: 50,

    },
})
