import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function ProtectedAdminRoute({ children }) {

  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(true);

  const [allowed, setAllowed] = useState(false);

  useEffect(() => {

    async function checkRole() {

      if (!currentUser) {

        setLoading(false);

        return;

      }

      const snapshot = await getDoc(
        doc(db, "users", currentUser.uid)
      );

      if (
        snapshot.exists() &&
        snapshot.data().role === "Manager"
      ) {

        setAllowed(true);

      }

      setLoading(false);

    }

    checkRole();

  }, [currentUser]);

  if (loading) return <p>Loading...</p>;

  if (!allowed) {

    return <Navigate to="/" replace />;

  }

  return children;

}

export default ProtectedAdminRoute;