import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/landing";
import Navbar from "./components/layout/navbar";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import AlertComponent from "./components/layout/alertComponent";
import CreateProfile from "./components/profileForms/create-profile";
import Profiles from './components/profiles/profiles.component';
import Profile from './components/profile/profile.component';
import Posts from './components/posts/posts.component';
import Post from './components/post/post.component';
import EditProfile from "./components/profileForms/edit-profile"
import AddExperience from "./components/profileForms/add-experience";
import AddEducation from './components/profileForms/add-education';
import { loadUser } from "./reducers/actions/authAction";
import setAuthToken from "./utils/authToken";
import "./App.css";

//redux

import { Provider } from "react-redux";
import store from "./store";
import Dashboard from "./components/dashboard/dashbord.component";
import PrivateRoute from "./components/route/privateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />

          <section className="container">
            <AlertComponent />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path='/profile/:id' component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute exact path='/edit-profile' component={EditProfile} />
              <PrivateRoute exact path='/add-experience' component={AddExperience} />
              <PrivateRoute exact path='/add-education' component={AddEducation} />
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute exact path='/post/:id' component={Post} />
            </Switch>
          </section>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
