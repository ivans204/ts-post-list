import PostList from './pages/PostList';
import PostContextProvider from './context/PostsContext';

import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import PostSingle from 'pages/PostSingle';

function App() {
    return (
        <PostContextProvider>
            <Router>
                <Switch>
                    <Route path="/posts" render={() => <PostList />} />
                    <Route path="/post/:id" render={() => <PostSingle />} />
                    <Route
                        exact
                        path="/"
                        render={() => <Redirect to="/posts" />}
                    />
                </Switch>
            </Router>
        </PostContextProvider>
    );
}

export default App;
