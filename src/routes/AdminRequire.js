import { Navigate, useLocation } from "react-router-dom";
import { decodeToken } from "../utils/jwt";

function AdminRequire({ children }) {
  const accessToken = localStorage.getItem('accessToken');
  const location = useLocation();

  const decodedToken = decodeToken(accessToken);

  if (decodedToken?.role !== "admin") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default AdminRequire;