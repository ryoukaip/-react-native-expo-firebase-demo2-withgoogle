import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { auth } from "../apis/firebaseConfig";
import { signOut, getAuth } from "firebase/auth";
export const HomeScreen = ( { navigation } ) => {
  const handleLogout = () => {
    signOut(getAuth()).then(() => {
      console.log("Signed out");
    }).catch((error) => {
      console.error("Sign out error")
    });
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} title="Sign Out" onPress={handleLogout}>
        <Text style={styles.textButton}>Log Out</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
  },
  textButton: {
    color: 'white',
  }
});