import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useCurrentUser } from '../hooks';
import { Dashboard } from './Dashboard';
import { Home } from './Home';
import { NavBar } from './NavBar';

export const App = () => {
    const { currentUserActions, currentUserState } = useCurrentUser();
    const authToken = (currentUserState && currentUserState.data && currentUserState.data.authToken) || null;

    return (
        <Router>
            <NavBar />
            <div className='container'>
                <Routes>
                    <Route path='/' element={<Home authToken={authToken} currentUserActions={currentUserActions} />} />
                    <Route path='/:id' element={<Dashboard authToken={authToken} />} />
                </Routes>
            </div>
        </Router>
    );
}; 