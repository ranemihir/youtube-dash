import { BrowserRouter as Router, Route } from 'react-router-dom';


export const App = () => {
    return (
        <Router>
            <div>
                <Route path='/' component={} />
                <Route path='/:id' component={Dashboard} />
            </div>
        </Router>
    );
}; 