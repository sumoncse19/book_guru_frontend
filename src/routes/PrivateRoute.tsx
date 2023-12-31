import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { user } = useAppSelector((state) => state.user);

  const { pathname } = useLocation();
  console.log(pathname, "pathname from private route");

  if (!user.email) {
    return <Navigate to="/auth/#login" state={{ path: pathname }} />;
  }

  return children;
}
