import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Preload from "../screens/Preload";
import Signin from "../screens/Signin";
import Signup from "../screens/Signup";
import MainTab from "./MainTab";
import Personal from "../screens/Personal";

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        initialRouteName="Preload"
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="Preload" component={Preload} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="MainTab" component={MainTab} />
        <Stack.Screen name="Personal" component={Personal} />
    </Stack.Navigator>
);