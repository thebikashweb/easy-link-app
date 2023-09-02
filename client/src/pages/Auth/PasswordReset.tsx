import React from "react";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import { Link, useSearchParams } from "react-router-dom";

import "./auth.css";
import { resetPassword, verifyToken } from "../../Services/authServices";
const PasswordReset = () => {
  const [password, setPassword] = React.useState("");
  const [tokenVerified, setTokenVerified] = React.useState(false);
  const [isResetSuccess, setIsResetSuccess] = React.useState(false);
  const [resetToken, setResetToken] = React.useState("");
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const verify = async () => {
      const token = searchParams.get("resetToken");

      if (token) {
        setResetToken(token);
        setTokenVerified(await verifyToken(token));
      } else {
        setTokenVerified(false);
      }
    };
    verify();
  }, [searchParams]);

  return (
    <div className="auth">
      <div className="auth__container">
        <img src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt="" />
        {tokenVerified ? (
          <>
            <div className="auth__form">
              <TextInput
                label="Password"
                value={password}
                onChange={(val) => setPassword(val.toLocaleString())}
                type="password"
              />
            </div>
            <div className="auth__action">
              <Button
                label="Reset password"
                onClick={async () => {
                  const isResetDone = await resetPassword(resetToken, password);
                  if (isResetDone) {
                    setIsResetSuccess(true);
                  } else {
                    setIsResetSuccess(false);
                  }
                }}
              />
            </div>
            <div>
              {isResetSuccess && (
                <p>
                  Reset successfully <Link to="/login">Login</Link>{" "}
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="auth__form">
            <p>Invalid token</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
