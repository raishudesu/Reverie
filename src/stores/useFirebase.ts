import { create } from "zustand";
import app from "../config/firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateEmail,
  User,
  updatePassword,
  deleteUser,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  DocumentData,
  collection,
  doc,
  getFirestore,
  setDoc,
  deleteDoc,
  serverTimestamp,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { toast } from "@/components/ui/use-toast";
import { FirebaseError } from "firebase/app";
interface IFirebase {
  currentUser: User | null;
  posts: DocumentData;
  username: string | undefined;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => void;
  signInWithGoogle: () => void;
  initializeAuthStateListener: () => void;
  fetchPosts: () => void;
  addPost: (content: string) => void;
  setPosts: ({ posts }: { posts: object }) => void;
  deletePost: (uid: string | undefined, postId: number) => void;
  setUsername: (username: string) => void;
  updatePost: (postId: number, updatedPost: string) => void;
  updateUsername: (uid: string | undefined, newUsername: string) => void;
  updateUserEmail: (email: string) => void;
  updateUserPwd: (password: string) => void;
  deleteUserAcc: () => void;
}

const auth = getAuth(app);
export const db = getFirestore(app);

export const useFirebaseServices = create<IFirebase>((set) => ({
  currentUser: null,
  posts: [],
  username: undefined,
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
            createdAt: serverTimestamp(),
            providerId: user.providerData[0].providerId,
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
  signInWithGoogle: () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const uid = user.uid;
        setDoc(doc(db, "users", uid), {
          username: user.displayName,
          uid: uid,
          email: user.email,
          createdAt: serverTimestamp(),
          providerId: user.providerData[0].providerId,
        })
          .then(() => {
            toast({
              title: `Signed in successfully`,
            });
          })
          .catch((error) => {
            toast({
              title: `Sign in failed. Error: ${error}`,
            });
          });
      })
      .catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
      });
  },
  fetchPosts: () => {
    const { currentUser } = useFirebaseServices.getState();
    const uid = currentUser?.uid;
    const postsRef = collection(db, `users/${uid}/posts`);

    const unsubscribe = onSnapshot(postsRef, (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => doc.data());

      set({ posts: fetchedPosts }); // Update the posts in the state
    });

    // Unsubscribe from the listener when component unmounts
    return () => {
      if (currentUser) {
        unsubscribe();
      }
    };
  },
  addPost: async (content: string) => {
    const user = useFirebaseServices.getState().currentUser;
    const username = useFirebaseServices.getState().username;
    try {
      const uid = user?.uid;
      const postId = Date.now().toString();
      const colRef = collection(db, "users");
      const docRef = doc(colRef, uid, "posts", postId);
      const postData = {
        created_at: new Date(),
        content: content,
        postId: postId,
        authorUsername: username,
        authorId: uid,
        authorEmail: user?.email,
      };
      await setDoc(docRef, postData);
    } catch (error) {
      console.log(error);
    }
  },
  setPosts: ({ posts }: { posts: object }) => {
    set({ posts });
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
  updatePost: async (postId: number, updatedPost: string) => {
    const uid = useFirebaseServices.getState().currentUser?.uid;
    const postRef = doc(db, `users/${uid}/posts/${postId}`);
    try {
      await updateDoc(postRef, {
        content: updatedPost,
        editedAt: new Date(),
      });
      toast({
        title: `Post updated`,
      });
    } catch (error) {
      toast({
        title: `Post failed to update`,
      });
      console.log(error);
    }
  },
  updateUsername: async (uid: string | undefined, newUsername: string) => {
    const userRef = doc(db, `users/${uid}`);
    try {
      await updateDoc(userRef, {
        username: newUsername,
      });
      toast({
        title: `Username updated`,
      });
    } catch (error) {
      toast({
        title: `Username failed to update`,
      });
      console.log(error);
    }
  },
  updateUserEmail: (email: string) => {
    try {
      updateEmail(auth.currentUser as User, email);
      toast({
        title: `Email updated`,
      });
    } catch (error) {
      toast({
        title: `Email failed to update`,
      });
      console.log(error);
    }
  },
  updateUserPwd: (password: string) => {
    try {
      updatePassword(auth.currentUser as User, password);
      toast({
        title: `Password updated`,
      });
    } catch (error) {
      toast({
        title: `Password failed to update`,
      });
      console.log(error);
    }
  },
  deleteUserAcc: async () => {
    const user = useFirebaseServices.getState().currentUser;
    try {
      deleteUser(auth.currentUser as User);
      await deleteDoc(doc(db, `users/${user?.uid}`));
      toast({
        title: `Account deletion successful`,
      });
    } catch (error) {
      toast({
        title: `Account deletion failed`,
      });
      console.log(error);
    }
  },
}));

useFirebaseServices.getState().initializeAuthStateListener();
