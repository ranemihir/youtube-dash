import { GoogleLogout } from "react-google-login";

export const GoogleSignOut = (props: { currentUserActions: any; }) => {
    const onClick = () => {
        props.currentUserActions.signOut();
    };

    const onSuccess = () => {
        props.currentUserActions.signOut_Success();
    };

    const onFailure = () => {
        props.currentUserActions.signOut_Failure('Something went wrong');
    };

    return (
        <GoogleLogout
            clientId='738803615765-8n769e8kuitvs86nmab9fpssa8t57pad.apps.googleusercontent.com'
            buttonText="Sign Out"
            icon={false}
            render={renderProps => <small onClick={() => {
                onClick();
                renderProps.onClick();
            }} style={{ cursor: 'pointer', fontSize: 13 }} className="text-muted m-0 p-0">Sign Out</small>}
            onLogoutSuccess={onSuccess}
            onFailure={onFailure}
        />
    );
};