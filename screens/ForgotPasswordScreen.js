import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Pressable, Alert } from "react-native";
import { ErrorMessage, Formik } from "formik";
import { auth } from "../apis/firebaseConfig";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPasswordScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState("");

  const handlePasswordReset = async (values) => {
    const { email } = values;
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Password Reset", "Check your email for a password reset link.");
      navigation.navigate("Login"); // Navigate to the login screen after successful reset
    } catch (error) {
      setErrorState(error.message);
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <View style={styles.logoContainer}>
          <Text style={styles.screenTitle}>Forgot Password?</Text>
        </View>
        <Formik
          initialValues={{ email: "" }}
          // validationSchema={forgotPasswordValidationSchema} // Add validation schema if needed
          onSubmit={(values) => handlePasswordReset(values)}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleSubmit,
            handleBlur,
          }) => (
            <>
              {/* Input fields */}
              <TextInput
                name="email"
                placeholder="Enter your email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                style={styles.input}
              />
              
              {/* Display Screen Error Messages */}
              {errorState !== "" && (
                <Text style={styles.errorText}>{errorState}</Text>
              )}
              
              {/* Reset Password button */}
              <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Reset Password</Text>
              </Pressable>
            </>
          )}
        </Formik>
        {/* Button to navigate to Login screen */}
        <Pressable
          style={styles.borderlessButtonContainer}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.borderlessButtonText}>Back to Login</Text>
        </Pressable>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: "center",
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
    backgroundColor: 'orange',
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

export default ForgotPasswordScreen;
