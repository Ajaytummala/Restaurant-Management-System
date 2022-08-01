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
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';
// import {AuthContext} from '../navigation/AuthProvider';
import NormalButton from '../components/NormalButtons';

import LinearGradient from 'react-native-linear-gradient';
// import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({ navigation }) => {


  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { login } = useContext(AuthContext)
  // const {login, googleLogin, fbLogin} = useContext(AuthContext);

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#654ea3', '#973aa8']} style={styles.linearGradient}>
        {/* <Image
          source={require('../assets/swiller-img.png')}
          style={styles.logo}
        /> */}
        <Text style={styles.text}>SWILLER</Text>
        <Text style={styles.subtext}>DINING MADE SIMPLE</Text>

        <FormInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Email"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormInput
          labelValue={password}
          onChangeText={(userPassword) => setPassword(userPassword)}
          placeholderText="Password"
          iconType="lock"
          secureTextEntry={true}
        />
        <View style={styles.border}>
          <View style={styles.buttonSize}>
            <FormButton
              buttonTitle="Sign In"
              onPress={() => login(email, password)}
            />
          </View>
          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => { }}>
            <Text style={styles.navButtonText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {Platform.OS !== 'android' ? (
          <View>
            <SocialButton
              buttonTitle="Sign In with Facebook"
              btnType="facebook"
              color="#4867aa"
              backgroundColor="#e6eaf4"
              onPress={() => { }}
            />

            {/* <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
            <Text style={styles.buttonText}>
              Sign in with Facebook
            </Text>
          </LinearGradient> */}

            <SocialButton
              buttonTitle="Sign In with Google"
              btnType="google"
              color="#de4d41"
              backgroundColor="#f5e7ea"
              onPress={() => { }}
            />
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.forgotButtonn}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.navButtonText}>
            Don't have an acount? Create here
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,

    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 20,
    // paddingTop: 60,
    // backgroundColor: '#c6c6c6'
  },
  border: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  buttonSize: {
    width: '50%',
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 0,
    color: '#fff',
  },
  subtext: {
    fontSize: 14,
    marginBottom: 100,
    color: '#fff',
  },
  navButton: {
    marginTop: 5,
    borderRadius: 15,
  },
  forgotButton: {
    marginTop: 20,
    marginBottom: 0,
    marginLeft: 20,
  },
  forgotButtonn: {
    marginTop: 50,
    paddingBottom: 200,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 15,
  },
  linearGradient: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 160,
    marginBottom: 0,
  },
});