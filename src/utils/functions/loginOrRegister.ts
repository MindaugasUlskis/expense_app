import auth from '@react-native-firebase/auth';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../screens/rootStackParamList';
import { firestoreFunctions } from '../../api/database-requests';
import { extractNicknameFromEmail } from './nickname-extractor';


type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const loginOrRegister = async (email: string, password: string, navigation: ScreenNavigationProp): Promise<boolean> => {
  const nickname = extractNicknameFromEmail(email);

  try {
    await auth().createUserWithEmailAndPassword(email, password);
    console.log('User account created & signed in!');
    await firestoreFunctions.createNickname(nickname, firestoreFunctions.getCurrentUserId());
    navigation.navigate('Home');
    return true; 
  } catch (createUserError: any) {
    if (createUserError.code === 'auth/email-already-in-use') {
      try {
        await auth().signInWithEmailAndPassword(email, password);
        console.log('User signed in!');
        navigation.navigate('Home');
        return true; 
      } catch (signInError: any) {
        if (signInError.code === 'auth/wrong-password') {
          throw new Error('Wrong password. Please check your password.');
        } else {
          throw new Error('Error signing in user. Please try again.');
        }
      }
    } else if (createUserError.code === 'auth/invalid-email') {
      throw new Error('That email address is invalid!');
    } else {
      throw new Error('Error creating user account. Please try again.');
    }
  }
};
