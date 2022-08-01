import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { AuthContext } from './AuthProvider';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import ClientStack from './ClientStack';

const Routes = () => {

  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);



  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  let uidd = "0";
  let email;
  let userEmail = "0";
  if (user) {
    uidd = user.uid;
    // const userEmail = auth().currentUser;
    // if (userEmail) {
    //  console.log('User email: ', user.email);
    // }
    userEmail = user.email;
  }
  console.log("User Id :", uidd, "User email : ", userEmail);
  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? (uidd == "TAzcPXcmyDXxNeCk67X6yGBTIPd2" ? <AppStack /> : <ClientStack />) : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
