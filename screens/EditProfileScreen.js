
import React, { useContext, useState, useEffect } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Button, Alert } from "react-native";
import FormButton from "../components/FormButton";
import { AuthContext } from "../navigation/AuthProvider";
// import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
// import Icon from '../node_modules/react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ImagePicker from "react-native-image-crop-picker";
import firestore from '@react-native-firebase/firestore';
import FormInput from '../components/Forminput';
// import FormButton from "../components/FormButton";


const EditProfileScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const [image, setImage] = useState("file:///storage/emulated/0/Android/data/com.venkat.venky/files/Pictures/2429c303-c876-44d6-860a-90ac3337f9d3.jpg")
  const [userDetails, setUserDetails] = useState([]);
  console.log(user.uid);
  const fetchData = async () => {
    try {
      const list = [];
      await firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then((querySnapshot) => {
          console.log('Total Posts : ', querySnapshot.size);
          if (querySnapshot.exists) {
            console.log('User Data', querySnapshot.data());
            setUserDetails(querySnapshot.data());
          }
        })
      console.log("UserDetails: ", userDetails);

    } catch (e) {
      console.log(e);
    }
  }

  // fetchData();
  useEffect(() => {
    fetchData();
  }, [])

  const handleSubmit = () => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        name: userDetails.name,
        phone: userDetails.phone,
        email: userDetails.email,
        country: userDetails.country,
        city: userDetails.city,
        userImg: userDetails.userImg,
      })
      .then(() => {
        console.log('User Updated!');
        Alert.alert(
          'Profile Updated!',
          'Your profile has been updated successfully.'
        );
        navigation.navigate('Profilee');
      })
  }

  const handleImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      const imageUri = image.path;
      setUserDetails({ ...userDetails, userImg: imageUri });
      console.log(userDetails.userImg);
      // this.bs.current.snapTo(1);
    });
  }

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#654ea3', '#973aa8']} style={styles.linearGradient}>
        <TouchableOpacity onPress={() => handleImage()}>
          <View style={styles.userImg}>
            <Image source={{ uri: userDetails.userImg }} style={styles.userImg}></Image>
            <Icon name="camera" style={styles.editImg} />
          </View>
        </TouchableOpacity>
        <Text style={styles.name}>{userDetails.name}</Text>
        <View style={styles.updateData}>
          <FormInput
            labelValue={userDetails.name}
            // value={userDetails.name}
            onChangeText={(text) => setUserDetails({ ...userDetails, name: text })}
            placeholderText="Name"
            iconType="user"
          />
          <FormInput
            labelValue={userDetails.phone}
            onChangeText={(text) => setUserDetails({ ...userDetails, phone: text })}
            placeholderText="Phone"
            iconType="mobile1"
          />
          <FormInput
            labelValue={userDetails.email}
            onChangeText={(text) => setUserDetails({ ...userDetails, email: text })}
            placeholderText="email"
            iconType="mail"
          />
          <FormInput
            labelValue={userDetails.country}
            onChangeText={(text) => setUserDetails({ ...userDetails, country: text })}
            placeholderText="Country"
            iconType="earth"
          />
          <FormInput
            labelValue={userDetails.city}
            onChangeText={(text) => setUserDetails({ ...userDetails, city: text })}
            placeholderText="city"
            iconType="enviroment"
          />
          <View style={styles.btnContainer}>
            <FormButton onPress={() => handleSubmit()} buttonTitle="Submit" />
          </View>
        </View>

      </LinearGradient>
    </ScrollView>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userImg: {
    // marginTop: 30,
    marginBottom: 10,
    height: 150,
    width: 150,
    borderRadius: 75,
    // borderWidth: 2,
    // borderColor: '#fff',
    // borderBottomColor: '#fff',
    padding: 10,
    resizeMode: 'cover',
  },
  linearGradient: {

    alignItems: 'center',
    height: '100%',
    paddingTop: 10,
    marginBottom: 30,
  },
  name: {
    justifyContent: "center",
    fontSize: 25,
    fontWeight: '700',
    color: '#000',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 3,

  },
  updateLabels: {
    // width: '100%',
    flex: 1,
    padding: 10,
    paddingTop: 10,
    // height: 30,
  },
  updateData: {
    marginVertical: 10,
    marginHorizontal: 20,
    // width: '100%',
    alignItems: "center",

  },
  btnContainer: {
    height: 40,
    width: 350,
    borderRadius: 100,
  },
  btn: {
    borderRadius: 20,
    backgroundColor: '#000',
  },
  editImg: {
    fontSize: 30,
    backgroundColor: '#abcdef',
    borderRadius: 20,
    padding: 5,
    position: 'absolute',
    right: -10,
    bottom: -5,
  }
})

