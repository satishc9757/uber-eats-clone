import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import SignupCust from './components/Customer/SignupCust';
import CustLogin from './components/Customer/CustLogin';
import ResLogin from './components/Restaurant/ResLogin';
import ResSignup from './components/Restaurant/ResSignup';


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
          <Route path ="/res/login" exact component={ResLogin}></Route>  
          <Route path ="/res/signup" exact component={ResSignup}></Route>  
        </Switch>
      </div>
    </Router>
  );
}

export default App;
