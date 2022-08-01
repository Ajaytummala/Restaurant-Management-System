import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({ selected }) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View
            style={{
                width: 6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text style={{ fontSize: 16 }}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text style={{ fontSize: 16 }}>Next</Text>
    </TouchableOpacity>
);

const Done = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text style={{ fontSize: 16 }}>Done</Text>
    </TouchableOpacity>
);

const OnboardingScreen = ({ navigation }) => {
    return (
        <Onboarding
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            DotComponent={Dots}
            onSkip={() => navigation.replace("Login")}
            onDone={() => navigation.navigate("Login")}
            pages={[
                // imageContainerStyles : { width: 15, height: 20 },
                {
                    backgroundColor: '#a6e4d0',
                    // image: <Image style={styles.imgContainer} source={require('../static/images/dish.png')} />,
                    title: 'Become a part of Swiller',
                    subtitle: 'We bring You the Flavour of Food',
                    // imageContainerStyles: { width: 15, height: 20 }
                },
                {
                    backgroundColor: '#e9bcbe',
                    // image: <Image style={styles.imgContainer} source={require('../static/images/food-location.png')} />,
                    title: 'Unlock the Destination',
                    subtitle: "We are here to delivery the food",
                },
                {
                    backgroundColor: '#fdeb93',
                    // image: <Image style={styles.imgContainer} source={require('../static/images/fast-food.png')} />,
                    title: 'Share Your Favorites',
                    subtitle: 'Share Your Thoughts With Similar Kind of People',
                },
            ]}
        />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgContainer: {
        width: 300,
        height: 300,
    }
});
