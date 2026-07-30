import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { useAuth } from "./AuthContext";


const UserContext = createContext();

export function UserProvider({ children }) {
  const { currentUser } = useAuth();

 const [user, setUser] = useState({
  name:"",
  email:"",
  phone:"",
  bio:"",
  country:"",
  avatar:"",
  wallet:0,
  geekCoins:0,
  premium:false,
  orders:0,

  purchaseHistory:[]
});


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    

    async function loadUser() {
      try {
        const userRef = doc(db, "users", currentUser.uid);

        const snapshot = await getDoc(userRef);

        if (snapshot.exists()) {
  setUser(snapshot.data());
} else {
  const defaultUser = {
    uid: currentUser.uid,
    name: currentUser.displayName || "GeekVerse User",
    email: currentUser.email,
    phone: "",
    bio: "",
    country: "",
    avatar: "",
    wallet: 0,
    geekCoins: 0,
    premium: false,
    orders: 0,

    // 👇 Add this
    purchaseHistory: [],
  };

  await setDoc(userRef, defaultUser);

  setUser(defaultUser);
}
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    }

    loadUser();
  }, [currentUser]);

  async function updateUser(data) {
    if (!currentUser) return;

    const updatedUser = {
      ...user,
      ...data,
    };

    setUser(updatedUser);

    try {
      await updateDoc(
        doc(db, "users", currentUser.uid),
        data
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        loading,
      }}
    >
      {!loading && children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}