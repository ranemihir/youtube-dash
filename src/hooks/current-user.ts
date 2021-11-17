import { useReducer, useEffect } from 'react';
import { CurrentUser, CurrentUserState } from '../types';

export function useCurrentUser() {
    const actionTypes = {
        // sign in
        signIn: '[Current User] Sign In',
        signIn_Success: '[Current User] Sign In (Success)',
        signIn_Failure: '[Current User] Sign In (Failure)',
        // sign out
        signOut: '[Current User] Sign Out',
        signOut_Success: '[Current User] Sign Out (Success)',
        signOut_Failure: '[Current User] Sign Out (Failure)'
    };

    // get initial data from localstorage if user is already signed in
    let data: CurrentUser | null;

    if (localStorage.getItem('currentUser') != null) {
        data = JSON.parse(localStorage.getItem('currentUser'));
    }

    const [currentUserState, currentUserDispatch] = useReducer((state: CurrentUserState, action: { type: string, data?: CurrentUser, error?: string; }): CurrentUserState => {
        if (action.type === actionTypes.signIn || action.type === actionTypes.signOut) {
            return {
                ...state,
                loading: true,
            };
        } else if (action.type === actionTypes.signIn_Success && action.data) {
            return {
                data: action.data,
                loading: false,
                error: null
            };
        } else if (action.type === actionTypes.signIn_Failure && action.error) {
            return {
                data: null,
                loading: false,
                error: action.error
            };
        } else if (action.type === actionTypes.signOut_Success) {
            return {
                data: null,
                loading: false,
                error: null
            };
        } else if (action.type === actionTypes.signOut_Failure && action.error) {
            return {
                data: null,
                loading: false,
                error: action.error
            };
        }

        return {
            ...state
        };
    }, {
        data,
        loading: false,
        error: null
    });

    const actions = {
        // sign in
        signIn: () => {
            currentUserDispatch({ type: actionTypes.signIn });
        },
        signIn_Success: (data: CurrentUser) => {
            currentUserDispatch({ type: actionTypes.signIn_Success, data });
        },
        signIn_Failure: (error: string) => {
            currentUserDispatch({ type: actionTypes.signIn_Failure, error });
        },
        // sign out
        signOut: () => {
            currentUserDispatch({ type: actionTypes.signOut });
        },
        signOut_Success: () => {
            currentUserDispatch({ type: actionTypes.signOut_Success });
        },
        signOut_Failure: (error: string) => {
            currentUserDispatch({ type: actionTypes.signOut_Failure, error });
        }
    };

    useEffect(() => {
        if (currentUserState.data && currentUserState.data != null) {
            localStorage.setItem('currentUser', JSON.stringify(currentUserState.data));
        } else {
            if (localStorage.getItem('currentUser') != null) {
                localStorage.removeItem('currentUser');
            }
        }
    }, [currentUserState.data]);

    return {
        currentUserActions: actions,
        currentUserState,
    };
}