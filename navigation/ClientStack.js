// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from '../screens/HomeScreen';
// import { StatusBar } from 'expo-status-bar';
// const Stack = createStackNavigator();

// const ClientStack = () => {
//     return (
//         <>
//             <Stack.Navigator>
//                 <Stack.Screen name="Home" options={{ header: () => null }} component={HomeScreen} />
//             </Stack.Navigator>
//             <StatusBar style="auto" />
//         </>
//     );
// }

// export default ClientStack;


import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddPostScreen from '../screens/AddPostScreen';
import MessagesScreen from '../screens/MessagesScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import StaffList from '../screens/StaffList';
import AddCards from '../screens/AddCards';
import MenuList from '../screens/MenuList';
import AddMenu from '../screens/AddMenu';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PaymentScreen from '../screens/PaymentScreen';
import UserHome from '../screens/UserHome';
import TableBooking from '../screens/TableBooking';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen
            name="Menu"
            component={UserHome}
            options={{
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: '#dee2ff',

                    fontFamily: 'Kufam-SemiBoldItalic',
                    fontSize: 24,
                },
                headerStyle: {
                    backgroundColor: '#10002b',
                    shadowColor: '#fff',
                    elevation: 0,
                },
                // headerRight: () => (
                //     <View style={{ marginRight: 10 }}>
                //         <FontAwesome5.Button
                //             name="plus"
                //             size={22}
                //             backgroundColor="#10002b"
                //             color="#dee2ff"
                //             onPress={() => navigation.navigate('AddPost')}
                //         />
                //     </View>
                // ),
            }}
        />
        <Stack.Screen
            name="AddPost"
            component={AddPostScreen}
            options={{
                title: '',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#2e64e515',
                    shadowColor: '#2e64e515',
                    elevation: 0,
                },
                headerBackTitleVisible: false,
                headerBackImage: () => (
                    <View style={{ marginLeft: 15 }}>
                        <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                    </View>
                ),
            }}
        />
        <Stack.Screen
            name="HomeProfile"
            component={ProfileScreen}
            options={{
                title: '',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                },
                headerBackTitleVisible: false,
                headerBackImage: () => (
                    <View style={{ marginLeft: 15 }}>
                        <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                    </View>
                ),
            }}
        />
        <Stack.Screen
            name="TableBook"
            component={TableBooking}
            options={{
                title: '',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                },
                headerBackTitleVisible: false,
                headerBackImage: () => (
                    <View style={{ marginLeft: 15 }}>
                        <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                    </View>
                ),
            }}
        />
        <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{
                title: 'Payment',
                titleColor: '#fff',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#10002b',
                    elevation: 0,
                },
                headerBackTitleVisible: false,
                headerBackImage: () => (
                    <View style={{ marginLeft: 15 }}>
                        <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                    </View>
                ),
            }}
            // options={{
            //     headerShown: true,
            // }}
        />
    </Stack.Navigator>
);

const MessageStack = ({ navigation }) => (
    <Stack.Navigator>
        {/* <Stack.Screen name="Message" component={MessagesScreen} /> */}
        <Stack.Screen
            name="Table Booking"
            component={TableBooking}
            options={{
                headerShown: false,
            }}
        // options={({ route }) => ({
        //     title: route.params.userName,
        //     headerBackTitleVisible: false,
        //     headerShown: false,
        // })}
        // options={{
        //     headerTitleAlign: 'center',
        //     headerTitleStyle: {
        //         color: '#dee2ff',

        //         fontFamily: 'Kufam-SemiBoldItalic',
        //         fontSize: 24,
        //     },
        //     headerStyle: {
        //         backgroundColor: '#10002b',
        //         shadowColor: '#fff',
        //         elevation: 0,
        //     },
        // headerRight: () => (
        //     <View style={{ marginRight: 10 }}>
        //         <FontAwesome5.Button
        //             name="plus"
        //             size={22}
        //             backgroundColor="#10002b"
        //             color="#dee2ff"
        //             onPress={() => navigation.navigate('AddMenu')}
        //         />
        //     </View>
        // ),
        // }}
        />
        <Stack.Screen
            name="AddMenu"
            component={AddMenu}
            options={{
                title: '',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#2e64e515',
                    shadowColor: '#2e64e515',
                    elevation: 0,
                },
                headerBackTitleVisible: false,
                headerBackImage: () => (
                    <View style={{ marginLeft: 15 }}>
                        <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                    </View>
                ),
            }}
        />
    </Stack.Navigator>
);

const ProfileStack = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen
            name="Profilee"
            component={ProfileScreen}
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{
                headerTitle: 'Edit Profile',
                headerBackTitleVisible: false,
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#654ea3',
                    shadowColor: '#fff',
                    elevation: 0,
                },
            }}
        />
    </Stack.Navigator>
);


const PaymentStack = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen
            name="Payments"
            component={PaymentScreen}
            // options={{
            //     headerTitleAlign: 'center',
            //     headerTitleStyle: {
            //         color: '#dee2ff',

            //         fontFamily: 'Kufam-SemiBoldItalic',
            //         fontSize: 24,
            //     },
            //     headerStyle: {
            //         backgroundColor: '#10002b',
            //         shadowColor: '#fff',
            //         elevation: 0,
            //     },
            // }}
            options={{
                headerShown: false,
            }}
        />
        {/* <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{
                headerTitle: 'Edit Profile',
                headerBackTitleVisible: false,
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                },
            }}
        /> */}
    </Stack.Navigator>
);

const ClientStack = () => {
    const getTabBarVisibility = (route) => {
        const routeName = route.state
            ? route.state.routes[route.state.index].name
            : '';

        if (routeName === 'Chat') {
            return false;
        }
        return true;
    };

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#dee2ff',
                tabBarActiveBackgroundColor: '#240046',
                tabBarInactiveBackgroundColor: '#240046',
                tabBarStyle: [
                    {
                        display: 'flex',
                    },
                    null
                ]
            }}>

            <Tab.Screen
                name="Home"
                component={FeedStack}

                options={({ route }) => ({
                    tabBarLabel: 'Home',

                    // tabBarVisible: route.state && route.state.index === 0,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="home-outline"
                            color={color}
                            size={size}
                        />
                    ),
                })}
            />
            <Tab.Screen
                name="Table Bookingg"
                component={MessageStack}
                options={({ route }) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    // Or Hide tabbar when push!
                    // https://github.com/react-navigation/react-navigation/issues/7677
                    // tabBarVisible: route.state && route.state.index === 0,
                    // tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            name="table-chair"
                            color={color}
                            size={size}
                        />
                    ),
                })}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    // tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default ClientStack;