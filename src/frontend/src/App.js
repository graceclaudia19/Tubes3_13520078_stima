// Import Components
import Home from './Home';
import Navbar from './Navbar';
import InputDisease from './InputDisease';
import SearchResult from './SearchResult';
import TestDisease from './TestDisease';

// Import Stylesheets
import './styles/App.css';

// Import Libs
import {
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
      <div className="App">
        <Navbar/>
        <div className="content">
              <Switch >
                  <Route exact path="/"  component={Home} />
                  <Route exact path="/inputDisease"  component={InputDisease} />
                  <Route exact path="/testDisease"  component={TestDisease} />
                  <Route exact path="/searchResult"  component={SearchResult} />
              </Switch >
        </div>
      </div>
  );
}

export default App;