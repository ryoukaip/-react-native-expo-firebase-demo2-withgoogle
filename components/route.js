import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen"; // Correct path
import SignupScreen from "../screens/SignupScreen"; // Correct path
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import { HomeScreen } from "../screens/HomeScreen";
import AddUser from "../screens/AddUser";
import ListUser from "../screens/ListUser";
import UpdateUser from  "../screens/UpdateUser";
import DeleteUser from "../screens/DeleteUser"
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="AddUser" component={AddUser} />
      <Stack.Screen name="ListUser" component={ListUser} />
      <Stack.Screen name="UpdateUser" component={UpdateUser} />
      <Stack.Screen name="DeleteUser" component={DeleteUser} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
