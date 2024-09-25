import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../apis/firebaseConfig";

const AddUser = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddUser = async () => {
    setLoading(true);
    setError("");

    try {
      const docRef = await addDoc(collection(db, "users"), {
        name,
        email,
        age: parseInt(age),
      });
      console.log("User added with ID: ", docRef.id);
      navigation.navigate("ListUser");
    } catch (e) {
      setError("Error adding user: " + e.message);
      console.error("Error adding user: ", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Add New User</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />
      <Pressable onPress={handleAddUser} style={styles.button}>
        <Text>Add User</Text>
      </Pressable>
      {loading && <ActivityIndicator size="large" />}
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "black",
    paddingTop: 20,
    paddingBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "700",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  borderlessButtonText: {
    color: "#1E90FF",
    fontWeight: "bold",
  },
});

export default AddUser;
