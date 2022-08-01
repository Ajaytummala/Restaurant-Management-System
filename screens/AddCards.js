import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import FormInput from "../components/Forminput";
import FormButton from "../components/FormButton";
import NormalButton from "../components/NormalButtons";
import ImagePicker from "react-native-image-crop-picker";

const AddCards = (props, { navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [image, setImage] = useState("file:///storage/emulated/0/Android/data/com.kalyan.kalaynn/files/Pictures/f5c02dc3-bebe-4f04-9438-0b6b1d322007.jpg");

  const submit = (e) => {
    // props.addCard()
    console.log(email, password, image);
    props.addTodo(email, password, image);
    setEmail();
    setPassword();
    setImage("file:///storage/emulated/0/Android/data/com.kalyan.kalaynn/files/Pictures/f5c02dc3-bebe-4f04-9438-0b6b1d322007.jpg");
  };

  const handlePhoto = () => {
    ImagePicker.openPicker({
      width: 780,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === "ios" ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  return (
    <View style={{ width: "100%" }}>
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

      <Button title="Choose Photo" onPress={handlePhoto} />
      {/* <Image style={{ width: 100, height: 100 }} source={{ uri: image }} /> */}
      {/* <Image
        style={{ width: 100, height: 100 }}
        source={{
          uri: "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
        }} */}
      {/* /> */}

      <FormButton buttonTitle="Insert Member" onPress={submit} />
    </View>
  );
};

export default AddCards;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    marginBottom: 50,
    flex: 1,
    backgroundColor: "#ccc",
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: "cover",
  },
  text: {
    fontSize: 28,
    marginBottom: 15,
    color: "#051d5f",
    alignSelf: "center",
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
    fontWeight: "500",
    color: "#2e64e5",
    marginBottom: 15,
  },
});
