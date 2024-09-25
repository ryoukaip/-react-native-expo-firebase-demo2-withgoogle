import React, { useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../apis/firebaseConfig';

const DeleteUser = ({ route, navigation }) => {
  const { userId } = route.params;
  const { user } = route.params;
  const [loading, setLoading] = useState(false);

  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "users", userId));
      navigation.navigate('ListUser');
    } catch (e) {
      console.error("Error deleting user: ", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text style={styles.screenTitle}>Are you sure you want to delete this user?</Text>
      <Pressable  onPress={handleDeleteUser} style={styles.button}>
        <Text style={styles.buttonText}>Delete</Text>
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
    backgroundColor: 'red',
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

export default DeleteUser;
