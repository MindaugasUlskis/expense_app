import auth from '@react-native-firebase/auth';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../screens/rootStackParamList';


type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// Function to handle user login
export const loginOrRegister = async (email: string, password: string, navigation: ScreenNavigationProp) => {
  auth()
    .createUserWithEmailAndPassword(email,  password)
    .then(() => {
      console.log('User account created & signed in!');
      navigation.navigate('Home')
    })
    .catch((error: { code: string; }) => {
      if (error.code === 'auth/email-already-in-use') {
        auth()
          .signInWithEmailAndPassword(email,  password)
          .then(() => {
            console.log('User signed in!');
            navigation.navigate('Home')
          })
          .catch(error => {
            if (error.code === 'auth/wrong-password') {
              // Handle the case where the password is wrong
              console.log('Wrong password. Please check your password.');
            } else {
              // Handle other sign-in errors
              console.error('Error signing in user:', error);
          }});
      }
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(error);
    });
};
