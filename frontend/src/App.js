import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header';
import Login from './components/CustLogin';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import SignupCust from './components/SignupCust';
import CustLogin from './components/CustLogin';
import { useHistory } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        {/* <Login /> */}
        <Switch>
          <Route path ="/" exact component={Home}></Route>
          <Route path ="/signup" exact component={SignupCust}></Route>
          <Route path ="/login" exact component={CustLogin}></Route>  
        </Switch>
      </div>
    </Router>
  );
}

export default App;
