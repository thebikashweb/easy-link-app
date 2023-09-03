import React, { ReactNode } from "react";
import { UserRole } from "../../../types";
import { getAuthUser } from "../../../util/useAuth";

type Props = {
  requiredRole: UserRole;
  message?: string;
  children: ReactNode;
};

const ProtectedComponent = ({ requiredRole, message, children }: Props) => {
  if (requiredRole !== getAuthUser()?.role) {
    return <>{Boolean(message) ? message : ""}</>;
  }

  return <div>{children}</div>;
};

export default ProtectedComponent;
