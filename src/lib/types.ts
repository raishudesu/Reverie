import { User } from "firebase/auth";
import { z } from "zod";
import { DocumentData } from "firebase/firestore";

export interface IFirebase {
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
  uploadProfilePic: (imageUpload: File) => void;
  profilePicUrl: string | undefined;
  getProfilePic: (imageUrl: string) => void;
}

export const SignInSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export const SignUpSchema = z
  .object({
    username: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    email: z.string().email({
      message: "Enter a valid email.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

export const EditEmailSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email.",
  }),
});

export const EditUsernameSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be more than 3 characters.",
  }),
});

export const EditPostSchema = z.object({
  post: z.string().min(3, {
    message: "A post must be at least 3 characters.",
  }),
});

export const UpdatePwdSchema = z
  .object({
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });
