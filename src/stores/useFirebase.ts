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
  collection,
  doc,
  getFirestore,
  setDoc,
  deleteDoc,
  serverTimestamp,
  updateDoc,
  onSnapshot,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { toast } from "@/components/ui/use-toast";
import { FirebaseError } from "firebase/app";
import { v4 } from "uuid";
import { IFirebase } from "@/lib/types";

const auth = getAuth(app);
const storage = getStorage();
export const db = getFirestore(app);

export const useFirebaseServices = create<IFirebase>((set) => ({
  currentUser: null,
  posts: [],
  pblcPosts: [],
  username: undefined,
  profilePicUrl: undefined,
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
  signOut: async () => {
    await signOut(auth);
    set({ profilePicUrl: undefined });
  },
  initializeAuthStateListener: () => {
    onAuthStateChanged(auth, (user) => {
      set({ currentUser: user });
    });
  },
  signInWithGoogle: async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const uid = user.uid;

      const userDocRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userDocRef);

      // Check if the document exists
      if (userDocSnap.exists()) {
        toast({
          title: `Signed in successfully`,
        });
      } else {
        // Add new data if the document does not exist
        await setDoc(userDocRef, {
          username: user.displayName,
          uid: uid,
          email: user.email,
          createdAt: serverTimestamp(),
          providerId: user.providerData[0].providerId,
        });

        toast({
          title: `Signed in successfully`,
        });
      }
    } catch (error) {
      const credential = GoogleAuthProvider.credentialFromError(
        error as FirebaseError
      );
      console.log(credential);
      toast({
        title: `Sign in failed. Error: ${error}`,
      });
    }
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
  addPost: async (display: string, content: string) => {
    const user = useFirebaseServices.getState().currentUser;
    const username = useFirebaseServices.getState().username;
    const profPicUrl = useFirebaseServices.getState().profilePicUrl;

    try {
      const uid = user?.uid;
      const postId = Date.now().toString();

      const userPostsRef = collection(db, "users");
      const postsRef = collection(db, "posts");

      const postsDocRef = doc(postsRef, postId);
      const docRef = doc(userPostsRef, uid, "posts", postId);

      const postData = {
        created_at: new Date(),
        content: content,
        postId: postId,
        authorUsername: username,
        authorId: uid,
        authorEmail: user?.email,
        profPicUrl: profPicUrl,
        display: display,
      };

      await setDoc(docRef, postData);
      await setDoc(postsDocRef, postData);
    } catch (error) {
      console.log(error);
    }
  },
  getPublicPosts: () => {
    const { currentUser } = useFirebaseServices.getState();
    const postsRef = collection(db, "posts");

    const q = query(postsRef, where("display", "==", "public"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => doc.data());

      set({ pblcPosts: fetchedPosts }); // Update the posts in the state
    });

    // Unsubscribe from the listener when component unmounts
    return () => {
      if (currentUser) {
        unsubscribe();
      }
    };
  },
  setPosts: ({ posts }: { posts: object }) => {
    set({ posts });
  },
  deletePost: async (uid: string | undefined, postId: number) => {
    const postRef = doc(db, `users/${uid}/posts/${postId}`);
    const pblcPostRef = doc(db, `posts/${postId}`);
    try {
      await deleteDoc(postRef);
      await deleteDoc(pblcPostRef);
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
    const pblcPostRef = doc(db, `posts/${postId}`);
    try {
      await updateDoc(postRef, {
        content: updatedPost,
        editedAt: new Date(),
      });
      await updateDoc(pblcPostRef, {
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
  uploadProfilePic: async (imageUpload: File) => {
    const uid = useFirebaseServices.getState().currentUser?.uid;
    const userRef = doc(db, `users/${uid}`);

    if (imageUpload === null) return null;

    const imageRefUrl = `userProfPics/${imageUpload.name + v4()}`;
    const imageRef = ref(storage, imageRefUrl);

    try {
      await uploadBytes(imageRef, imageUpload);
      await updateDoc(userRef, {
        profPicUrl: imageRefUrl,
      });
      toast({
        title: `Profile picture updated`,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getProfilePic: async (imageUrl: string | undefined) => {
    if (imageUrl) {
      const imageRef = ref(storage, imageUrl);

      try {
        const url = await getDownloadURL(imageRef);
        set({ profilePicUrl: url });
      } catch (error) {
        console.log(error);
      }
    } else {
      // Clear the profile picture if imageUrl is undefined
      set({ profilePicUrl: undefined });
    }
  },
}));

// useFirebaseServices.getState().initializeAuthStateListener();
