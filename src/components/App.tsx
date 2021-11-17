import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useCurrentUser, useSearch } from '../hooks';
import { Dashboard } from './Dashboard';
import { Home } from './Home';
import { NavBar } from './NavBar';

export const App = () => {
    const { currentUserActions, currentUserState } = useCurrentUser();
    const searchState = useSearch();
    const authToken = (currentUserState && currentUserState.data && currentUserState.data.authToken) || null;

    return (
        <Router>
            <NavBar currentUserState={currentUserState} currentUserActions={currentUserActions} />
            <Routes>
                <Route path='/' element={<Home authToken={authToken} searchState={searchState} />} />
                <Route path='/:channelId' element={<Dashboard authToken={authToken} />} />
            </Routes>
        </Router>
    );
}; 