import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  SafeAreaView
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../apis/firebaseConfig";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const ListUser = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      // Sort the userList alphabetically by name
      userList.sort((a, b) => a.name.localeCompare(b.name));
  
      setUsers(userList);
    } catch (e) {
      console.error("Error fetching users: ", e);
    } finally {
      setLoading(false);
    }
  };
  

  useFocusEffect(
    useCallback(() => {
      fetchUsers();  // Fetch users when screen is focused
    }, [])
  );

  const renderUser = ({ item }) => (
    <View style={styles.container}>
      <Text style={styles.normalText}>
        {item.name} ({item.age})
      </Text>
      <Text>{item.email}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("UpdateUser", { user: item })}
      >
        <Text>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("DeleteUser", { userId: item.id })}
      >
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const toAddUser = () => {
    navigation.navigate("AddUser");
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.button} onPress={toAddUser}>
        <Text style={styles.buttonText}> Add User</Text>
      </Pressable>
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
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
    color: "black",
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
  addUserButton: {
    alignItems: "flex-end",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  normalText: {
    fontSize: 32,
  },
});

export default ListUser;
