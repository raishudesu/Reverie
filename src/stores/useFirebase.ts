import { create } from 'zustand'
import app from '../config/firebaseConfig';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

interface ISignIn {
  currentUser: object | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  initializeAuthStateListener: () => void;
}

const auth = getAuth(app);

export const useSignIn = create<ISignIn>((set) => ({
  currentUser: null,
  signIn: async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error)
    }
  },
  signUp: async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error)
    }
  },
  signOut: async () => await signOut(auth),
  initializeAuthStateListener: () => {
    onAuthStateChanged(auth, (user) => {
      set({ currentUser: user });
    });
  },
}));

useSignIn.getState().initializeAuthStateListener();