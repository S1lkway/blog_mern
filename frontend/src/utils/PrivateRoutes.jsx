import { Outlet, Navigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux";

function PrivateRoutes() {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  if (user != null) {
    return <Outlet />
  } else {
    const prevUrl = location.pathname;
    return <Navigate to="/login" state={{ 'prevUrl': prevUrl }} />
  }

}

export default PrivateRoutes