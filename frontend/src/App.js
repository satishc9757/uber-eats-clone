import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './App.css';
import Header from './components/Header';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import SignupCust from './components/Customer/SignupCust';
import CustLogin from './components/Customer/CustLogin';
import ResLogin from './components/Restaurant/ResLogin';
import ResSignup from './components/Restaurant/ResSignup';
import Dashboard from './components/Customer/Dashboard';
import ResDashboard from './components/Restaurant/ResDashboard';


function App() {
  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        {/* <Login /> */}
        <Switch>
          <Route path ="/" exact component={Home}></Route>
          <Route path ="/signup" exact component={SignupCust}></Route>
          <Route path ="/login" exact component={CustLogin}></Route>
          <Route path ="/home" exact component={Dashboard}></Route>  
          <Route path ="/res/login" exact component={ResLogin}></Route>  
          <Route path ="/res/signup" exact component={ResSignup}></Route>  
          <Route path ="/res/home" exact component={ResDashboard}></Route>  
        </Switch>
      </div>
    </Router>
  );
}

export default App;
