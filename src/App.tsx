import './App.scss';
import { Animals } from './components/Animals';
import { Animal } from './components/Animal';
import { PageNotFound } from './components/PageNotFound';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';



function App() {
  return (
    <Router>
      <Switch>
        {/* Startsidan, alla djur listas */}
        <Route exact path="/">
          <Animals></Animals>
        </Route>
        {/* Ett individuellt djur presenteras, mer detaljer */}
        <Route path="/animal/:id">
          <Animal></Animal>
        </Route>
        {/* Om något går fel/sida kan inte hittas */}
        <Route path="*">
          <PageNotFound></PageNotFound>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
