import { create } from "zustand";
import app from "../config/firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  DocumentData,
  collection,
  doc,
  getFirestore,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "@/components/ui/use-toast";
import { FirebaseError } from "firebase/app";

type UserDetails = {
  uid: string;
  email: string | null;
};
interface IFirebase {
  currentUser: UserDetails | null;
  posts: DocumentData;
  successFetch: boolean;
  loadingFetch: boolean;
  username: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => void;
  initializeAuthStateListener: () => void;
  addPost: (content: string) => void;
  setPosts: ({ posts }: { posts: object }) => void;
  setSuccessFetch: ({ status }: { status: boolean }) => void;
  setLoadingFetch: ({ status }: { status: boolean }) => void;
  deletePost: (uid: string | undefined, postId: number) => void;
  setUsername: (username: string) => void;
}

const auth = getAuth(app);
export const db = getFirestore(app);

export const useFirebaseServices = create<IFirebase>((set) => ({
  currentUser: null,
  posts: [],
  successFetch: false,
  loadingFetch: false,
  username: null,
  signIn: async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: `Signed in successfully`,
      });
    } catch (error) {
      const firebaseError = error as FirebaseError;
      toast({
        title: `Sign in failed. Error: ${firebaseError.code}`,
      });
      console.log(error);
    }
  },
  signUp: async (email: string, password: string, username: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          const uid = user.uid;
          setDoc(doc(db, "users", uid), {
            username: username,
            uid: uid,
            email: email,
            password: password,
            createdAt: serverTimestamp(),
          })
            .then(() => {
              toast({
                title: `Account successfully created`,
              });
            })
            .catch((error) => {
              toast({
                title: `Account creation failed. Error: ${error}`,
              });
            });
        }
      );
    } catch (error) {
      const firebaseError = error as FirebaseError;
      toast({
        title: `Sign up failed. Error: ${firebaseError.code}`,
      });
      console.log(error);
    }
  },
  signOut: async () => await signOut(auth),
  initializeAuthStateListener: () => {
    onAuthStateChanged(auth, (user) => {
      set({ currentUser: user });
    });
  },
  addPost: async (content: string) => {
    const user = useFirebaseServices.getState().currentUser;
    try {
      const uid = user?.uid;
      const postId = Date.now().toString();
      const colRef = collection(db, "users");
      const docRef = doc(colRef, uid, "posts", postId);
      const postData = {
        created_at: new Date(),
        content: content,
        postId: postId,
      };
      await setDoc(docRef, postData);
    } catch (error) {
      console.log(error);
    }
  },
  setPosts: ({ posts }: { posts: object }) => {
    set({ posts });
  },
  setSuccessFetch: ({ status }: { status: boolean }) => {
    set({ successFetch: status });
  },
  setLoadingFetch: ({ status }: { status: boolean }) => {
    set({ loadingFetch: status });
  },
  deletePost: async (uid: string | undefined, postId: number) => {
    try {
      await deleteDoc(doc(db, `users/${uid}/posts/${postId}`));
      toast({
        title: `Deleted successfully`,
      });
    } catch (error) {
      const firebaseError = error as FirebaseError;
      toast({
        title: `Post deletion failed. Error: ${firebaseError.code}`,
      });
      console.log(error);
    }
  },
  setUsername: (username: string) => {
    set({ username: username });
  },
}));

useFirebaseServices.getState().initializeAuthStateListener();
