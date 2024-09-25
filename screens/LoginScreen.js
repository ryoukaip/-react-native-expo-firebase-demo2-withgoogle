import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { app, provider } from "../apis/firebaseConfig";
import { onGoogleButtonPress } from "../components/socialSignIn";

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle login with email and password
  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoading(false);
        navigation.navigate("ListUser");
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Login Failed", errorMessage);
        setLoading(false);
      });
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      setLoading(false);
      Alert.alert("Login Success", `Welcome ${user.email}`);
      navigation.navigate("ListUser");
    } catch (error) {
      Alert.alert("Google Login Failed", error.message);
      setLoading(false);
    }
  };

  const handleGoogleServiceLogin = async () => {
    try {
      setLoading(true);
      await onGoogleButtonPress();
      setLoading(false);
      // Alert.alert("Login Success", `Welcome ${user.email}`);
      navigation.navigate("ListUser");
    } catch (error) {
      Alert.alert("Google Login Failed", error.message);
      setLoading(false);
    }
  }
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={{ width: 200, height: 200 }}
          source={require("../assets/flame.png")}
        />
        <Text style={styles.screenTitle}>Welcome!</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
      </View>

      <Button
        title={loading ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={loading}
      />

      <Text style={styles.signupText}>
        Don't have an account?{" "}
        <Text
          onPress={() => navigation.navigate("Signup")}
          style={styles.signupLink}
        >
          Sign Up
        </Text>
      </Text>

      <Text style={styles.signupText}>
        <Text
          onPress={() => navigation.navigate("ForgotPassword")}
          style={styles.signupLink}
        >
          Forgot password?
        </Text>
      </Text>

      {/* Circular buttons for social login */}
      <View style={styles.socialLoginContainer}>
        <Pressable
          style={[styles.socialButton, styles.appleButton]}
          onPress={() => Alert.alert("Apple login coming soon!")}
        >
          <Image
            style={styles.socialIcon}
            source={require("../assets/apple.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.socialButton, styles.googleButton]}
          onPress={handleGoogleServiceLogin}
        >
          <Image
            style={styles.socialIcon}
            source={require("../assets/google.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.socialButton, styles.facebookButton]}
          // onPress={() => Alert.alert("Facebook login coming soon!")}
          onPress={() => alert('none')}
        >
          <Image
            style={styles.socialIcon}
            source={require("../assets/facebook.png")}
          />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "black",
    paddingTop: 20,
    paddingBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    minWidth: "100%",
  },
  signupText: {
    marginTop: 20,
    textAlign: "center",
  },
  signupLink: {
    color: "#1E90FF",
    fontWeight: "bold",
  },
  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  googleButton: {
    backgroundColor: "white",
  },
  appleButton: {
    backgroundColor: "white",
  },
  facebookButton: {
    backgroundColor: "white",
  },
  socialButtonText: {
    fontSize: 30,
    color: "white",
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
});

export default LoginScreen;
