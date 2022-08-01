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
import FormButton from '../components/FormButton';
const Card = ({ todo, onDelete }) => {
    return (
        <>
            <ScrollView>
                <Text>{todo.title}</Text>
                <Text>{todo.desc}</Text>
                {/* <FormButton
                    buttonTitle="Delete"
                    onPress={onDelete(todo)}
                /> */}
            </ScrollView>
        </>

    );
};

export default Card;

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
