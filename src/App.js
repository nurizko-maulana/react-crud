import "./App.css";
import Create from "./components/create";
import Read from "./components/read";
import Update from "./components/update";
import Home from "./components/pages/Home";
import AddData from "./components/pages/AddData";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="main">
        <h2 className="main-header">React Redux CRUD Operation</h2>
        <Route exact path="/create" component={Create} />
        <Route exact path="/read" component={Read} />
        <Route exact path="/update" component={Update} />
        <Route exact path="/add" component={AddData} />
        <Route exact path="/" component={Home} />
      </div>
    </Router>
  );
}

export default App;
