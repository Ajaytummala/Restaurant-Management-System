import React, { useContext, useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Platform,
    StyleSheet,
    ScrollView,
} from "react-native";

import FormButton from '../components/FormButton';
import Cards from "../components/Cards";
import AddCards from "./AddCards";
import Card from "../components/Card";
import firestore from '@react-native-firebase/firestore';

const StaffList = () => {
    let initTodo;
    initTodo = [
        {
            "sno": 1,
            "key": 1,
            "title": "Venkat",
            "desc": "+868814344",
        },
        {
            "sno": 2,
            "key": 2,
            "title": "Kalyan",
            "desc": "+868814344",
        },
        {
            "sno": 3,
            "key": 3,
            "title": "Sandeep",
            "desc": "+868814344",
        },
        {
            "sno": 4,
            "key": 4,
            "title": "Ajay",
            "desc": "+868814344",
        },
    ];

    const onDelete = (todo) => {
        console.log("Im on Delete of todo", todo);
        setTodos(
            todos.filter((e) => {
                return e !== todo;
            })
        );
    };

    const addTodo = (title, desc) => {
        console.log("I am add todo", title, desc);
        let sno = 0;
        if (todos.length === 0) sno = 1;
        else sno = todos[todos.length - 1].sno + 1;
        const myTodo = {
            sno: sno,
            title: title,
            desc: desc,
        };
        console.log("I am add todo", title, desc);
        // await firestore()
        //     .collection('staff')
        //     .add({
        //         sno: sno,
        //         title: title,
        //         desc: desc,
        //     })
        //     .then(() => {
        //         console.log('User added!');
        //     })
        //     .catch((error) => {
        //         console.log("here", error);
        //     });
        setTodos([...todos, myTodo]);
        console.log(myTodo);
    };

    const [todos, setTodos] = useState(initTodo);
    useEffect(() => {
        // todos.dispatch(setTodos(todos))
        console.log(todos);
    }, [todos]);
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* <AddCards addTodo={addTodo} /> */}
            <ScrollView style={styles.cardsContainer}>
                {todos.map((todo) => {
                    return (
                        <View key={todo.sno} style={styles.cardContainer}>
                            <View style={styles.textCont}>
                                <Text style={styles.tiletext}>Name : {todo.title}</Text>
                                <Text style={styles.tiletext}>Phone : {todo.desc}</Text>
                            </View>
                            <FormButton style={styles.btn} buttonTitle="Delete" onPress={() => onDelete(todo)} />
                        </View>
                    );
                })}
            </ScrollView>
        </ScrollView>
    );
};

export default StaffList;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 10,
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: 'center',
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
    textCont: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingVertical: 15,
    },
    text: {
        fontSize: 38,
        marginBottom: 15,
        color: "#051d5f",
    },
    btn: {
        backgroundColor: '#c9184a',
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingVertical: 10,
    },
});