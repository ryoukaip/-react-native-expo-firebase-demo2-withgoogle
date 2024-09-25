import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import StackNavigator from './components/route';
import { NavigationContainer } from '@react-navigation/native';
export default function App() {
  return (
    // <View style={styles.container}>
    //   {/* <Text>Open up App.js to start working on your app!</Text> */}
    //   <StatusBar style="auto" />
      <NavigationContainer style={styles.container}>
        <StackNavigator/>
      </NavigationContainer>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
