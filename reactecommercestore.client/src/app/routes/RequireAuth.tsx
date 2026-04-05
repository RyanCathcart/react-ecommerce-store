import { Navigate, Outlet, useLocation } from "react-router";
import { useUserInfoQuery } from "../../features/account/accountApi";
import LoadingComponent from "../layout/LoadingComponent";

export default function RequireAuth() {
  const { data: user, isLoading } = useUserInfoQuery();
  const location = useLocation()

  if (isLoading) return <LoadingComponent message="Loading user..." />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <Outlet />
  );
}