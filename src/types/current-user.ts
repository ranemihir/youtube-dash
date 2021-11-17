export type CurrentUser = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    photoUrl: string;
    authToken: string;
};

export type CurrentUserState = {
    data: CurrentUser | null;
    loading: boolean;
    error: string | null;
};