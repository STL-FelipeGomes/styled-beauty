import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import firebaseConfig from './config';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
export default auth;
