import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SignInScreen from '../screens/auth/SignInScreen'
import SignUpScreen from '../screens/auth/SignUpScreen'

export default AuthStackScreens = () => {
    const AuthStack = createStackNavigator();

    return (
        <AuthStack.Navigator headerMode="none">
            <AuthStack.Screen name="SignUp" component={SignUpScreen} />
            <AuthStack.Screen name="SignIn" component={SignInScreen} />
        </AuthStack.Navigator>
    );
}
