import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';//install
import * as Notifications from 'expo-notifications';//install?
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';//install?

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import FeedScreen from './main/post/Feed';


const Tab = createMaterialBottomTabNavigator();

function Main(props) {
    const [unreadChats, setUnreadChats] = useState(false)
    const [lastNot, setLastNot] = useState(false)

    const lastNotificationResponse = Notifications.useLastNotificationResponse();

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Tab.Navigator initialRouteName="Feed"

                labeled={false}
                tabBarOptions={{
                    showIcon: true, showLabel: false, indicatorStyle: {
                        opacity: 0
                    }
                }}
                barStyle={{ backgroundColor: '#ffffff' }}>
                <Tab.Screen key={Date.now()} name="Feed" component={FeedScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        ),
                    }} />
            </Tab.Navigator>
        </View>

    )
}

export default Main;
