import React, { useContext, useState, useEffect } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Button } from "react-native";
import FormButton from "../components/FormButton";
import { AuthContext } from "../navigation/AuthProvider";
// import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
// import Icon from '../node_modules/react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ImagePicker from "react-native-image-crop-picker";
import firestore from '@react-native-firebase/firestore';

// "image": "file:///storage/emulated/0/Android/data/com.venkat.venky/files/Pictures/2429c303-c876-44d6-860a-90ac3337f9d3.jpg",
const ProfileScreen = ({ navigation }) => {
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
  }, [userDetails])

  let userEmail = user.email;
  userEmail = userEmail.slice(0, userEmail.lastIndexOf('@'));
  console.log(userEmail);

  // const [name, setName] = useState(userEmail[0].toUpperCase() + userEmail.slice(1));

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
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#654ea3', '#973aa8']} style={styles.linearGradient}>
        <View style={styles.Imgcontainer}>
          <Image source={{ uri: userDetails.userImg }} style={styles.userImg}></Image>
        </View>
        <Text style={styles.name}>{userDetails.name}</Text>
        <Text style={styles.email}>{userDetails.email}</Text>
        {userDetails.about == '' ? null : <Text style={styles.about}>{userDetails.about}</Text>}
        {/* <Text style={styles.text}>Welcome {user.uid}</Text> */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => {
              navigation.navigate('EditProfile');
            }}>
            <Text style={styles.userBtnTxt}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
            <Text style={styles.userBtnTxt}>Logout</Text>
          </TouchableOpacity>
          {/* <FormButton style={styles.logout} buttonTitle="Logout" onPress={() => logout()} /> */}
        </View>
        <View style={styles.profileData}>
          <View style={styles.profileEach}><Text style={{ opacity: userDetails.phone == '' ? 0.5 : 1 }}>  Phone               :   {userDetails.phone == '' ? "Not Yet Updated" : userDetails.phone}</Text></View>
          <View style={styles.profileEach}><Text style={{ opacity: userDetails.city == '' ? 0.5 : 1 }}>  City                    :   {userDetails.city == '' ? "Not Yet Updated" : userDetails.city}</Text></View>
          <View style={styles.profileEach}><Text style={{ opacity: userDetails.country == '' ? 0.5 : 1 }}>  Country             :   {userDetails.country == '' ? "Not Yet Updated" : userDetails.country}</Text></View>
          <View style={styles.profileEach}></View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fff",
    width: '100%',
    height: '100%',
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // padding: 20,
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
  logout: {
    backgroundColor: '#10002b',
    borderRadius: 25,
    borderColor: '#fff',
    borderWidth: 2,
    marginTop: 10,
    padding: 10,
  },
  linearGradient: {
    // justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    // paddingHorizontal: 30,
    paddingTop: 40,
    marginBottom: 50,
  },
  cardContainer: {
    marginTop: 15,
    marginBottom: 15,
    paddingHorizontal: 30,
    width: '100%',
  },
  cardsContainer: {
    width: '100%',
  },
  tileContainer: {
    alignItems: 'center',
  },
  tiletext: {
    flexDirection: 'column'
  },
  textCont: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#e0aaff',
    borderRadius: 20,
    // borderTopLeftRadius: 20,
    flexDirection: 'row',
    paddingVertical: 35,
    // paddingHorizontal: 0,
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
  profileImage: {
    // padding: 40,
    width: '100%',
    height: '40%',
    // backgroundColor: 'white',
  },
  userImg: {
    marginTop: 50,
    height: 150,
    width: 150,
    borderRadius: 75,
    // borderRadius: 75,
    borderWidth: 2,
    borderColor: '#fff',
    // borderBottomColor: '#fff',
    padding: 10,
    padding: 10,
    resizeMode: 'cover',
  },

  image: {
    height: '100%',
    flex: 1,
    justifyContent: "center"
  },
  editBtn: {
    borderRadius: 25,
    backgroundColor: '#2e64e5',
    marginBottom: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: 'white',
    elevation: 50,
  },
  name: {
    fontSize: 25,
    fontWeight: '700',
    color: '#000',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 3,
    // position: 'absolute',
    // backfaceVisibility: 0.5,
    // opacity: 0.5,
    // Bor
  },
  email: {
    fontSize: 15,
    fontWeight: '200',
    color: '#000',
    alignItems: 'center',
    letterSpacing: 1.5,
    opacity: 0.5,
  },
  about: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
    alignItems: 'center',
    letterSpacing: 0.5,
    opacity: 0.9,
    paddingTop: 5,
  },
  userBtn: {
    borderColor: '#000',
    backgroundColor: '#8010002b',
    borderWidth: 2,
    borderRadius: 3,
    marginVertical: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    // alignItems: 'flex-start',
    borderColor: '#fff',
    paddingTop: 15,
  },
  userBtnTxt: {
    color: '#000',
  },
  profileData: {
    alignSelf: 'flex-start',
    // marginHorizontal: 30,
    marginVertical: 70,
    width: '100%',
  },
  profileEach: {
    borderRadius: 1,
    marginHorizontal: 30,
    paddingVertical: 15,
    fontSize: 15,
    borderColor: '#fff',
    borderStyle: 'dotted',
    borderTopWidth: 1,
  }
});



// import React, {useState, useEffect, useContext} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
// } from 'react-native';
// import FormButton from '../components/FormButton';
// import {AuthContext} from '../navigation/AuthProvider';

// import firestore from '@react-native-firebase/firestore';
// // import PostCard from '../components/PostCard';

// const ProfileScreen = ({navigation, route}) => {
//   const {user, logout} = useContext(AuthContext);

//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deleted, setDeleted] = useState(false);
//   const [userData, setUserData] = useState(null);

//   const fetchPosts = async () => {
//     try {
//       const list = [];

//       await firestore()
//         .collection('posts')
//         .where('userId', '==', route.params ? route.params.userId : user.uid)
//         .orderBy('postTime', 'desc')
//         .get()
//         .then((querySnapshot) => {
//           // console.log('Total Posts: ', querySnapshot.size);

//           querySnapshot.forEach((doc) => {
//             const {
//               userId,
//               post,
//               postImg,
//               postTime,
//               likes,
//               comments,
//             } = doc.data();
//             list.push({
//               id: doc.id,
//               userId,
//               userName: 'Test Name',
//               userImg:
//                 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
//               postTime: postTime,
//               post,
//               postImg,
//               liked: false,
//               likes,
//               comments,
//             });
//           });
//         });

//       setPosts(list);

//       if (loading) {
//         setLoading(false);
//       }

//       console.log('Posts: ', posts);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const getUser = async() => {
//     await firestore()
//     .collection('users')
//     .doc( route.params ? route.params.userId : user.uid)
//     .get()
//     .then((documentSnapshot) => {
//       if( documentSnapshot.exists ) {
//         console.log('User Data', documentSnapshot.data());
//         setUserData(documentSnapshot.data());
//       }
//     })
//   }

//   useEffect(() => {
//     getUser();
//     fetchPosts();
//     navigation.addListener("focus", () => setLoading(!loading));
//   }, [navigation, loading]);

//   const handleDelete = () => {};

//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
//       <ScrollView
//         style={styles.container}
//         contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
//         showsVerticalScrollIndicator={false}>
//         <Image
//           style={styles.userImg}
//           source={{uri: userData ? userData.userImg || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}
//         />
//         <Text style={styles.userName}>{userData ? userData.fname || 'Test' : 'Test'} {userData ? userData.lname || 'User' : 'User'}</Text>
//         {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}
//         <Text style={styles.aboutUser}>
//         {userData ? userData.about || 'No details added.' : ''}
//         </Text>
//         <View style={styles.userBtnWrapper}>
//           {route.params ? (
//             <>
//               <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
//                 <Text style={styles.userBtnTxt}>Message</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
//                 <Text style={styles.userBtnTxt}>Follow</Text>
//               </TouchableOpacity>
//             </>
//           ) : (
//             <>
//               <TouchableOpacity
//                 style={styles.userBtn}
//                 onPress={() => {
//                   navigation.navigate('EditProfile');
//                 }}>
//                 <Text style={styles.userBtnTxt}>Edit</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
//                 <Text style={styles.userBtnTxt}>Logout</Text>
//               </TouchableOpacity>
//             </>
//           )}
//         </View>

//         <View style={styles.userInfoWrapper}>
//           <View style={styles.userInfoItem}>
//             <Text style={styles.userInfoTitle}>{posts.length}</Text>
//             <Text style={styles.userInfoSubTitle}>Posts</Text>
//           </View>
//           <View style={styles.userInfoItem}>
//             <Text style={styles.userInfoTitle}>10,000</Text>
//             <Text style={styles.userInfoSubTitle}>Followers</Text>
//           </View>
//           <View style={styles.userInfoItem}>
//             <Text style={styles.userInfoTitle}>100</Text>
//             <Text style={styles.userInfoSubTitle}>Following</Text>
//           </View>
//         </View>


//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   userImg: {
//     height: 150,
//     width: 150,
//     borderRadius: 75,
//   },
//   userName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   aboutUser: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#666',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   userBtnWrapper: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     width: '100%',
//     marginBottom: 10,
//   },
//   userBtn: {
//     borderColor: '#2e64e5',
//     borderWidth: 2,
//     borderRadius: 3,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     marginHorizontal: 5,
//   },
//   userBtnTxt: {
//     color: '#2e64e5',
//   },
//   userInfoWrapper: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     marginVertical: 20,
//   },
//   userInfoItem: {
//     justifyContent: 'center',
//   },
//   userInfoTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     textAlign: 'center',
//   },
//   userInfoSubTitle: {
//     fontSize: 12,
//     color: '#666',
//     textAlign: 'center',
//   },
// });