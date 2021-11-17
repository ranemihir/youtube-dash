import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useCurrentUser } from '../hooks';
import { Dashboard } from './Dashboard';
import { Home } from './Home';
import { NavBar } from './NavBAr';

export const App = () => {
    const { currentUserActions, currentUserState } = useCurrentUser();
    const authToken = currentUserState.data.authtoken;

    return (
        <>
            <NavBar />
            <Router>
                <Routes>
                    <Route path='/' element={<Home authToken={authToken} />} />
                    <Route path='/:id' element={<Dashboard authToken={authToken} />} />
                </Routes>
            </Router>
        </>
    );
}; 