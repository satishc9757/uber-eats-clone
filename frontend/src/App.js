import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Login from './components/Login';
import SignupUser from './components/SignupUser';

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Login /> */}
      <SignupUser />
    </div>
  );
}

export default App;
