import { useGoogleLogin } from "@react-oauth/google";
import { CurrentUser } from "../types";
import { useEffect, useState } from "react";

export const GoogleSignIn = (props: { currentUserActions: any }) => {
  const [user, setUser] = useState<any>([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => {
      console.log("Login Failed:", error);
      props.currentUserActions.signIn_Failure("Login Failed:", error);
    },
  });

  const saveCurrentUser = (res: any) => {
    console.log(res);

    const currentUser: CurrentUser = {
      id: res.googleId,
      email: res.profileObj.email,
      firstName: res.profileObj.givenName,
      lastName: res.profileObj.familyName,
      photoUrl: res.profileObj.imageUrl,
      authToken: res.accessToken,
    };

    props.currentUserActions.signIn_Success(currentUser);
  };

  const onError = () => {
    props.currentUserActions.signIn_Failure("Sign in error occurred");
  };

  useEffect(() => {
    if (user) {
      (async () => {
        const res = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        );

        if (res && user?.access_token) {
          const data: any = await res.json();
          console.log("data", data);
          props.currentUserActions.signIn_Success({
            id: data.id,
            email: data.email,
            firstName: data.given_name,
            lastName: data.family_name,
            photoUrl: data.picture,
            authToken: user.access_token,
          });
        }
      })();
    }
  }, [props.currentUserActions, user]);

  return (
    <button
      className="btn btn-outline-black rounded-0 border border-black border-2 text-uppercase"
      style={{
        fontSize: "14px",
      }}
      onClick={() => login()}
    >
      Sign In with Google
    </button>
  );
};
