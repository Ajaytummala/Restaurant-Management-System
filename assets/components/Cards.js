import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Platform,
    StyleSheet,
    ScrollView
} from 'react-native';
// import AddCards from './AddCards';
import Card from './Card';
const Cards = (props) => {
    return (
        <ScrollView>
            <Text>{props.Todos.length === 0 ? "No Staff to display" :
                props.Todos.map((todo) => {
                    return (<Card todo={todo} key={todo.sno} onDelete={props.onDelete} />)
                })}</Text>
        </ScrollView>
    );
};

export default Cards;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 60,
        flex: 1,
        backgroundColor: '#c6c6c6'
    },
    logo: {
        height: 200,
        width: 200,
        resizeMode: 'cover',
    },
    text: {
        fontSize: 28,
        marginBottom: 15,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 5,
        borderRadius: 15,
    },
    forgotButton: {
        marginVertical: 25,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
        marginBottom: 15,
    },
});
