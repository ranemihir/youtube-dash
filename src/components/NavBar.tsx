import { Link, useLocation } from "react-router-dom";
import { CurrentUserState } from "../types";
import { GoogleSignIn } from "./GoogleSignIn";

export const NavBar = (props: {
  currentUserState: CurrentUserState;
  currentUserActions: any;
}) => {
  const { pathname } = useLocation();

  return (
    <nav className="navbar navbar-light bg-white border-bottom shadow-sm">
      <div className="container-fluid px-3">
        {pathname && pathname !== "/" ? (
          <Link
            className="navbar-brand d-flex flex-rw align-items-center"
            to="/"
          >
            <i
              className="bi bi-youtube"
              style={{
                color: "red",
                fontSize: "2rem",
              }}
            />
            <div className="vr ms-3 me-3"></div>
            <span
              style={{
                letterSpacing: 3,
                fontWeight: 300,
              }}
            >
              DASHBOARD
            </span>
          </Link>
        ) : (
          <div className="navbar-brand"></div>
        )}
        {props.currentUserState.data && props.currentUserState.data != null ? (
          <div className="d-flex flex-row align-items-center float-end">
            <img
              src={props.currentUserState.data.photoUrl}
              className="img-thumbnail rounded-circle shadow-sm me-2"
              alt={props.currentUserState.data.firstName + " thumbnail"}
              width="48"
            />
            <div className="d-flex flex-column">
              <div>
                {props.currentUserState.data.firstName +
                  " " +
                  props.currentUserState.data.lastName}
              </div>
            </div>
          </div>
        ) : (
          <GoogleSignIn currentUserActions={props.currentUserActions} />
        )}
      </div>
    </nav>
  );
};
