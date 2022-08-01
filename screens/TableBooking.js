import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Button, Alert } from 'react-native'

import LinearGradient from 'react-native-linear-gradient';

import SelectDropdown from 'react-native-select-dropdown'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/Foundation';
import Icon1 from 'react-native-vector-icons/Entypo';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

const TableBooking = ({ navigation }) => {
    const { user, logout } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [slots, setSlots] = useState('');
    const [table, settable] = useState('');
    const [slotNum, setSlotNum] = useState('');
    const charge = 50;
    const [charges, setCharges] = useState(0);
    const fetchData = async () => {
        try {
            setSlots('');
            settable('');
            setCharges(0);
            const list = [];
            await firestore()
                .collection('tables')
                .get()
                .then((querySnapshot) => {
                    console.log('Total Posts : ', querySnapshot.size);
                    querySnapshot.forEach(doc => {
                        const { isBooked1, isBooked2, isBooked3 } = doc.data();
                        list.push({
                            id: doc.id,
                            slot1: isBooked1,
                            slot2: isBooked2,
                            slot3: isBooked3,
                            selected1: "false",
                            selected2: "false",
                            selected3: "false",
                        })
                    })
                })
            setPosts(list);
            console.log(posts);

        } catch (e) {
            console.log(e);
        }
    }


    const updateValue = async (docid, variable) => {
        await firestore()
            .collection('tables')
            .doc(docid)
            .update({
                isBooked1: variable,
            })
            .then(() => {
                console.log(variable);
            });
    }



    const [color1, setcolor1] = useState("#dee2ff");
    const [color2, setcolor2] = useState("#dee2ff");
    const [color3, setcolor3] = useState("#dee2ff");

    const handleSlot1 = () => {
        setSlots("slot1");
        setcolor1("#ff4d6d");
        setcolor2("#dee2ff");
        setcolor3("#dee2ff");
    }

    const handleSlot2 = () => {
        setSlots("slot2");
        setcolor2("#ff4d6d");
        setcolor1("#dee2ff");
        setcolor3("#dee2ff");
    }

    const handleSlot3 = () => {
        setSlots("slot3");
        setcolor3("#ff4d6d");
        setcolor1("#dee2ff");
        setcolor2("#dee2ff");
    }

    const handleSlot = (docid) => {
        console.log("Handle SLot : ", slots[docid], docid)
        slots.forEach(slot => {
            if (slot.sno == docid) {
                if (slot.isBooked == "false") {
                    if (slot.selected == "false") {
                        slot.selected = "true";
                    }
                    else {
                        slot.selected = "false";
                    }
                } else {
                    slot.selected = "false";
                }
            } else {
                slot.selected = "false";
            }
        });
        setSlots([...slots]);
    }

    const handleColor = async (docid, slotg) => {
        console.log("Slot Given: ", slotg.slots);
        let j = 1;
        if (slotg.slots == "slot1") {
            posts.forEach(post => {
                if (post.id == docid) {
                    if (post.slot1 == "false") {
                        if (post.selected1 == "false") {
                            post.selected1 = "true";
                            settable(j);
                            setCharges(charge);
                        }
                    } else {
                        post.selected1 = "false";
                        settable('');
                        setCharges(0);
                    }
                } else {
                    post.selected1 = "false";
                }
                post.selected2 = "false";
                post.selected3 = "false";
                j++;
            })
            setPosts([...posts]);
        }
        else if (slotg.slots == "slot2") {
            posts.forEach(post => {
                if (post.id == docid) {
                    if (post.slot2 == "false") {
                        if (post.selected2 == "false") {
                            post.selected2 = "true";
                            settable(j);
                            setCharges(charge);
                        }
                    } else {
                        post.selected2 = "false";
                        settable('');
                        setCharges(0);
                    }
                } else {
                    post.selected2 = "false";
                }
                post.selected1 = "false";
                post.selected3 = "false";
                j++;
            })
            setPosts([...posts]);
        }
        else if (slotg.slots == "slot3") {
            posts.forEach(post => {
                post.selected1 = "false";
                post.selected2 = "false";
                if (post.id == docid) {
                    if (post.slot3 == "false") {
                        if (post.selected3 == "false") {
                            post.selected3 = "true";
                            settable(j);
                            setCharges(charge);
                        }
                    } else {
                        post.selected3 = "false";
                        settable('');
                        setCharges(0);
                    }
                } else {
                    post.selected3 = "false";
                }
                j++;
            })
            setPosts([...posts]);

        }
        console.log("POSTS : ", posts);

    }

    useEffect(() => {
        fetchData();

    }, []);

    const handleSubmit = () => {
        if (slots != "" && table != "") {
            console.log(posts[table - 1].slot1);
            console.log(table, slots);

            console.log(posts[table - 1].id);

            const postId = posts[table - 1].id;

            if (slots == 'slot1') {
                setSlotNum(1);
                firestore()
                    .collection('tables')
                    .doc(postId)
                    .update({
                        isBooked1: 'true',
                    })
            }
            if (slots == 'slot2') {
                setSlotNum(2);
                firestore()
                    .collection('tables')
                    .doc(postId)
                    .update({
                        isBooked2: 'true',
                    })
            }
            if (slots == 'slot3') {
                setSlotNum(3);
                firestore()
                    .collection('tables')
                    .doc(postId)
                    .update({
                        isBooked3: 'true',
                    })
            }

            firestore()
                .collection('tableBooking')
                .add({
                    userId: user.uid,
                    tableNum: table,
                    SlotNum: slots.slice(slots.lastIndexOf('t') + 1, slots.length),
                    postTime: firestore.Timestamp.fromDate(new Date()),
                    charges: charges,
                })
                .then(() => {
                    fetchData();
                    console.log('Booking Done')
                    Alert.alert(
                        "Payment Successful",
                        `You have successffully booked table ${table}`,
                        [
                            { text: "Okay", onPress: () => navigation.navigate('Menu') }
                        ]
                    );
                })
                .catch((error) => {
                    console.log('Something went wrong with added post to firestore.', error);
                });

        }
        else if (slots == "" && table == "") {
            Alert.alert(
                "Please Select a slot and a table",
            );
        }
        else if (table == "") {
            Alert.alert(
                "Please Select a table",
            );
        }
    }

    let i = 1;
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <LinearGradient colors={['#10002b', '#240046']} style={styles.linearGradient}>
                <View>
                    <View style={styles.slotContainer}>
                        <View style={styles.slot}>
                            <TouchableOpacity onPress={() => { handleSlot1() }}>
                                <Icon1 name="time-slot" size={55} color={color1} backgroundColor={"#fff"} />
                            </TouchableOpacity>
                            <Text style={{ color: "#fff" }}> Slot: 1</Text>
                        </View>
                        <View style={styles.slot}>
                            <TouchableOpacity onPress={() => { handleSlot2() }}>
                                <Icon1 name="time-slot" size={55} color={color2} backgroundColor={"#fff"} />
                            </TouchableOpacity>
                            <Text style={{ color: "#fff" }}> Slot: 2</Text>
                        </View>
                        <View style={styles.slot}>
                            <TouchableOpacity onPress={() => { handleSlot3() }}>
                                <Icon1 name="time-slot" size={55} color={color3} backgroundColor={"#fff"} />
                            </TouchableOpacity>
                            <Text style={{ color: "#fff" }}> Slot: 3</Text>
                        </View>
                    </View>

                    <View style={styles.tableContainer}>
                        {posts.map((s) => {

                            return (
                                <View key={s.id} style={styles.table}>
                                    <View>
                                        <TouchableOpacity onPress={() => handleColor(s.id, { slots })}>
                                            {slots == "slot1" ? <Icon name="social-delicious" size={60} color={s.slot1 == "true" ? "#ccc" : (s.selected1 == "true" ? "#ff4d6d" : "#dee2ff")} backgroundColor={s.slot1 == "true" ? "#fff" : "#000"} />
                                                : slots == "slot2" ? <Icon name="social-delicious" size={60} color={s.slot2 == "true" ? "#ccc" : (s.selected2 == "true" ? "#ff4d6d" : "#dee2ff")} backgroundColor={s.slot2 == "true" ? "#fff" : "#000"} />
                                                    : slots == "slot3" ? <Icon name="social-delicious" size={60} color={s.slot3 == "true" ? "#ccc" : (s.selected3 == "true" ? "#ff4d6d" : "#dee2ff")} backgroundColor={s.slot3 == "true" ? "#fff" : "#000"} />
                                                        : <View></View>}
                                            {slots == '' ? <View></View> : <Text style={{ color: "#fff" }}> Table:{i++} </Text>}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })}
                    </View>

                    {charges == 0 ? null :
                        <>
                            <LinearGradient colors={['#e0aaff', '#dee2ff']} style={{ borderRadius: 20, marginVertical: 20, width: '100%' }}>
                                <View style={styles.textCont}>
                                    <Text>{slots}</Text>
                                    <Text>table: {table}</Text>
                                    <Text>   Reservation Charges:   {charges}</Text>
                                </View>
                            </LinearGradient>
                            <FormButton
                                buttonTitle="Confirm & Pay!"
                                onPress={() => handleSubmit()}
                            />
                        </>
                    }
                </View>
            </LinearGradient>
        </ScrollView>
    );
}

export default TableBooking;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tableBox: {
        // backgroundColor: { },

    },
    slot: {
        marginHorizontal: 15,
    },

    linearGradient: {
        alignItems: 'center',
        height: '100%',
        paddingHorizontal: 30,
        paddingTop: 25,
        marginBottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cardContainer: {
        marginTop: 15,
        marginBottom: 15,
        width: '100%',
    },
    cardsContainer: {
        width: '100%',
    },
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 50,
        // alignItems: 'center',
        justifyContent: 'center',
    },
    slotContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    table: {
        marginHorizontal: 15,

    },
    tiletext: {
        flexDirection: 'column',
        flex: 1,
    },
    textCont: {
        alignItems: 'center',
        borderRadius: 20,
        width: '100%',
        flexDirection: 'column',
        paddingVertical: 35,
        paddingHorizontal: 25,
    },
    text: {
        fontSize: 38,
        marginBottom: 15,
        color: "#051d5f",
    },
    btn: {
        borderRadius: 25,
        backgroundColor: '#c9184a',
        paddingVertical: 10,
        paddingHorizontal: 10,
        shadowColor: 'white',
        elevation: 50,

    },
})