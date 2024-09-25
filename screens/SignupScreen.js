import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Pressable, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";  // Import Yup for validation
import { auth } from "../apis/firebaseConfig";  // Using Firebase Auth from your config
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTogglePasswordVisibility } from "../components/useTogglePasswordVisibility";
import { createUserWithEmailAndPassword } from "firebase/auth";

// Define a validation schema with Yup
const signupValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Please confirm your password"),
});

export const SignupScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState("");
  const {
    passwordVisibility,
    handlePasswordVisibility,
    rightIcon,
    handleConfirmPasswordVisibility,
    confirmPasswordIcon,
    confirmPasswordVisibility,
  } = useTogglePasswordVisibility();

  const handleSignup = async (values) => {
    const { email, password } = values;
    try {
      await createUserWithEmailAndPassword(auth, email, password);  // Firebase Auth method
      // Handle successful signup logic (e.g., navigate to another screen)
      console.log("Account created successfully!");
      Alert.alert("Success!","Account created successfully!");
      navigation.navigate("Login");
    } catch (error) {
      setErrorState(error.message);
      alert(error.message)
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <View style={styles.logoContainer}>
          <Text style={styles.screenTitle}>Create a new account!</Text>
        </View>
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={signupValidationSchema}
          onSubmit={(values) => handleSignup(values)}
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
              {/* Email Input */}
              <TextInput
                name="email"
                placeholder="Enter email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                style={styles.input}
              />
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              {/* Password Input */}
              <TextInput
                name="password"
                placeholder="Enter password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={passwordVisibility}
                textContentType="newPassword"
                rightIcon={rightIcon}
                handlePasswordVisibility={handlePasswordVisibility}
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                style={styles.input}
              />
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              {/* Confirm Password Input */}
              <TextInput
                name="confirmPassword"
                placeholder="Confirm password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={confirmPasswordVisibility}
                textContentType="password"
                rightIcon={confirmPasswordIcon}
                handlePasswordVisibility={handleConfirmPasswordVisibility}
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                style={styles.input}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}

              {/* Display any Firebase error messages */}
              {errorState !== "" && (
                <Text style={styles.errorText}>{errorState}</Text>
              )}

              {/* Signup button */}
              <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </Pressable>
            </>
          )}
        </Formik>
        <Pressable
          style={styles.borderlessButtonContainer}
          onPress={() => navigation.navigate("Login")} // Navigate to Login screen
        >
          <Text style={styles.borderlessButtonText}>Already have an account? Log in</Text>
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

export default SignupScreen;
