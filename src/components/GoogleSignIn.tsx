import { GoogleLogin } from 'react-google-login';
import { CurrentUser } from '../types';

export const GoogleSignIn = (props: { currentUserActions: any; }) => {
    const onSuccess = (res: any) => {
        console.log(res);

        const currentUser: CurrentUser = {
            id: res.googleId,
            email: res.profileObj.email,
            firstName: res.profileObj.givenName,
            lastName: res.profileObj.familyName,
            photoUrl: res.profileObj.imageUrl,
            authToken: res.accessToken
        };

        props.currentUserActions.signIn_Success(currentUser);
    };

    const onFailure = (res: any) => {
        console.log(res);
        props.currentUserActions.signIn_Failure(res.toString());
    };

    return (
        <div className="m-4">
            <GoogleLogin
                clientId='738803615765-8n769e8kuitvs86nmab9fpssa8t57pad.apps.googleusercontent.com'
                buttonText='Sign In'
                scope='https://www.googleapis.com/auth/youtube.readonly'
                onSuccess={onSuccess}
                onFailure={onFailure}
            />
        </div>
    );
};