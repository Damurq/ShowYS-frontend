import 'react-native-gesture-handler';//install

import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';

import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';//install
import { createStackNavigator } from '@react-navigation/stack';//install
import 'expo-asset';//install

import LoginScreen from './screens/auth/Login';
import RegisterScreen from './screens/auth/Register';
import { container } from './screens/styles';
import MainScreen from './screens/Main';

import { bindActionCreators } from 'redux';
import {checkAuthenticated} from './redux/actions/index'
import { connect } from 'react-redux';

const logo = require('./assets/logo.png')

const Stack = createStackNavigator();

const Root = (props) => {
    const [loaded, setLoaded] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        try {
            props.checkAuthenticated()
                .then(() => {
                    if (props.currentUser !== null) {
                        setLoaded(true);
                        setLoggedIn(true);
                    }
                    else {
                        setLoaded(true);
                        setLoggedIn(false);
                    }
                },
                    (e) => {
                        setLoaded(true);
                        setLoggedIn(false);
                    })
        } catch (e) {
            setLoaded(true);
            setLoggedIn(false);
        }
    }, [props.currentUser])


    if (!loaded) {
        return (
            <Image style={container.splash} source={logo} />
        )
    }
    if (!loggedIn) {

        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Register" component={RegisterScreen} navigation={props.navigation} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" navigation={props.navigation} component={LoginScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen key={Date.now()} name="Main" component={MainScreen} navigation={props.navigation} options={({ route }) => {
                    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

                    switch (routeName) {
                        case 'Camera': {
                            return {
                                headerTitle: 'Camera',
                            };
                        }
                        case 'Profile': {
                            return {
                                headerTitle: 'Profile',
                            };
                        }
                        case 'Search': {
                            return {
                                headerTitle: 'Search',
                            };
                        }
                        case 'Feed':
                        default: {
                            return {
                                headerTitle: 'ShowYS',
                            };
                        }
                    }
                }}
                />
                {/* <Stack.Screen key={Date.now()} name="Save" component={SaveScreen} navigation={props.navigation} />
            <Stack.Screen key={Date.now()} name="video" component={SaveScreen} navigation={props.navigation} />
            <Stack.Screen key={Date.now()} name="Post" component={PostScreen} navigation={props.navigation} />
            <Stack.Screen key={Date.now()} name="Edit" component={EditScreen} navigation={props.navigation} />
            <Stack.Screen key={Date.now()} name="Profile" component={ProfileScreen} navigation={props.navigation} />
            <Stack.Screen key={Date.now()} name="Comment" component={CommentScreen} navigation={props.navigation} />
            <Stack.Screen key={Date.now()} name="ProfileOther" component={ProfileScreen} navigation={props.navigation} />
            <Stack.Screen key={Date.now()} name="Blocked" component={BlockedScreen} navigation={props.navigation} options={{ headerShown: false }} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const mapStateToProps = (storage) => ({
    currentUser: storage.userState.currentUser
});

const mapDispatchProps = (dispatch) => bindActionCreators({ checkAuthenticated }, dispatch);

export default connect(mapStateToProps, mapDispatchProps )(Root);