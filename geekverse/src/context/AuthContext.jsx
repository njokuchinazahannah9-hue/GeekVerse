import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function createUserProfile(user) {
    const userRef = doc(db, "users", user.uid);

    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || "",
        email: user.email || "",
        phone: "",
        country: "",
        bio: "",
        avatar: "",
        wallet: 0,
        geekCoins: 0,
        premium: false,
        membership: "Free",
        role: "Customer",
        status: "Active",
        orders: 0,
        purchaseHistory: [],
        createdAt: serverTimestamp(),
      });
    }
  }

  async function register(name, email, password) {
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(result.user, {
      displayName: name,
    });

    await sendEmailVerification(result.user);

    await createUserProfile({
      ...result.user,
      displayName: name,
    });

    return result;
  }

  function login(email, password) {
    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  }

  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(
      auth,
      provider
    );

    await createUserProfile(result.user);

    return result;
  }

  function logout() {
    return signOut(auth);
  }

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  async function changePassword(
    currentPassword,
    newPassword
  ) {
    if (!auth.currentUser) return;

    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword
    );

    await reauthenticateWithCredential(
      auth.currentUser,
      credential
    );

    await updatePassword(
      auth.currentUser,
      newPassword
    );
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (user) {
          await createUserProfile(user);
        }

        setCurrentUser(user);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    register,
    login,
    logout,
    loginWithGoogle,
    forgotPassword,
    changePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}