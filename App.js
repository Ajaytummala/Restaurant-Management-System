import React from 'react';
import Providers from './navigation';
import { StatusBar } from 'expo-status-bar';
import UserHome from './screens/UserHome'
const App = () =>{
  return(
    <>
      {/* <UserHome/> */}
      <Providers />
      <StatusBar style="auto"/>
    </>
  );
}

export default App;
