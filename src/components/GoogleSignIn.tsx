import { GoogleLogin } from 'react-google-login';

export const GoogleSignIn = (props) => {
    const onSuccess = (res) => {
        console.log(res);
    };

    const onFailure = (res) => {
        console.log(res);
    };

    return (
        <GoogleLogin
            clientId=''
            buttonText='Sign In'
            onSuccess={onSuccess}
            onFailure={onFailure}
        />
    );
};