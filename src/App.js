import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OrderSummary from "./components/ordersummary/OrderSummary";
import Profile from "./components/profile/Profile";
import Header from "./components/header/Header";


export let myData = [];

function App() {

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/ordersummary" component={OrderSummary} />
          <Route exact path="/userprofile" component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
