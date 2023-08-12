import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useFirebaseServices } from "../stores/useFirebase";

const Protected = ({ children }: { children: ReactElement }) => {
  const { currentUser } = useFirebaseServices();

  if (!currentUser) {
    return <Navigate to="/" />;
  }
  return children;
};

export default Protected;
