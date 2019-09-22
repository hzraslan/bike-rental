import React from "react";
import "./App.css";
import Shop from './components/Shop';
import {  Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import Confirmation from './components/Confirmation'
import {HashRouter} from 'react-router-dom';
const history = createBrowserHistory()
class App extends React.Component{
    render(){
        return(
            <div>
                <HashRouter>
                <Router history={history}>
                    <Switch>
                        <Route exact path='/' component={Shop}/>
                        <Route exact path='/done' component={Confirmation}/>
                    </Switch>
                </Router>
                </HashRouter>
            </div>
        )
    }
}

export default App;