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
import FormInput from '../components/Forminput';
import FormButton from '../components/FormButton';
import NormalButton from '../components/NormalButtons';
const LoginScreen = (props, { navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submit = (e) => {
    // props.addCard()
    console.log(email, password);
    props.addTodo(email, password);
    setEmail();
    setPassword();
  }


  return (
    <View style={{ width: '100%' }}>

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Name"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Phone"
        iconType="phone"
        secureTextEntry={false}
      />

      <FormButton
        buttonTitle="Insert Member"
        onPress={submit}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    marginBottom: 50,
    flex: 1,
    backgroundColor: '#ccc'
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
    alignSelf: 'center',
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
