import { Link, useLocation } from "react-router-dom";
import { CurrentUserState } from "../types";
import { GoogleSignIn } from "./GoogleSignIn";
import { GoogleSignOut } from "./GoogleSignOut";

export const NavBar = (props: { currentUserState: CurrentUserState, currentUserActions: any; }) => {
    const { pathname } = useLocation();

    return (
        <nav className="navbar navbar-light bg-white border-bottom shadow-sm">
            <div className="container-fluid px-3">
                {
                    (pathname && pathname !== '/') &&
                    <Link className="navbar-brand d-flex flex-rw align-items-center" to='/'>
                        <img src="/youtube-icon.svg" alt="YouTube Logo" width='40' />
                        <div className="vr ms-3 me-3"></div>
                        <span style={{
                            letterSpacing: 3,
                            fontWeight: 300
                        }}>DASHBOARD</span>
                    </Link>
                }
                {
                    (props.currentUserState.data && props.currentUserState.data != null)
                        ? (
                            <div className="d-flex flex-row align-items-center">
                                <img src={props.currentUserState.data.photoUrl} className="img-thumbnail rounded-circle shadow-sm me-2" alt={props.currentUserState.data.firstName + ' thimbnail'} width='48' />
                                <div className="d-flex flex-column">
                                    <div>{props.currentUserState.data.firstName + ' ' + props.currentUserState.data.lastName}</div>
                                    <GoogleSignOut currentUserActions={props.currentUserActions} />
                                </div>
                            </div>
                        )
                        : (
                            <GoogleSignIn currentUserActions={props.currentUserActions} />
                        )
                }
            </div>
        </nav>
    );
};