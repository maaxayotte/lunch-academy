import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import RecipeIndex from "./RecipeIndex"
import RecipeShow from "./RecipeShow"
import NewRecipeForm from './NewRecipeForm'
import AuthenticatedRoute from './authentication/AuthenticatedRoute'

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch (err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])
  
  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={RecipeIndex} />
        <Route exact path="/recipes" component={RecipeIndex} />
        <AuthenticatedRoute exact path='/recipes/new' component={NewRecipeForm} user={currentUser}/>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/recipes/:id">
          <RecipeShow user={currentUser} />
        </Route>
      </Switch>
    </Router>
  );
};

export default hot(App);
