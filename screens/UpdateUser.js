import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, Pressable } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../apis/firebaseConfig';

const UpdateUser = ({ route, navigation }) => {
  const { user } = route.params;
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);

  const handleUpdateUser = async () => {
    setLoading(true);
    try {
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, {
        name,
        age: parseInt(age)
      });
      navigation.goBack();
    } catch (e) {
      console.error("Error updating user: ", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text style={styles.screenTitle}>Update User</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input}/>
      <TextInput placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder='Email' value={email} onChangeText={setEmail} style={styles.input}/>
      <Pressable  onPress={handleUpdateUser} style={styles.button}>
        <Text>Update</Text>
      </Pressable>
      {loading && <ActivityIndicator size="large" />}
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
    color: 'black',
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
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: "700",
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  borderlessButtonText: {
    color: '#1E90FF',
    fontWeight: 'bold',
  },
});

export default UpdateUser;
