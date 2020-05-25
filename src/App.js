import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';

import { isAuthenticated } from "./services/auth";

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Admin/Login'));
const Register = React.lazy(() => import('./views/Admin/Register'));
const Page404 = React.lazy(() => import('./views/Admin/Page404'));
const ListaAnimais = React.lazy(() => import('./views/Cadastros/Animal/ListaAnimais'));
const Informar = React.lazy(() => import('./views/Cadastros/Animal/Informar'));

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/" name="Login Page" render={props => <Login {...props}/>} />
            <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
            <Route exact path="/list-animals" name="List Animais" render={props => <ListaAnimais {...props}/>} />
            <Route exact path="/informar/:id" name="Find Animal" render={props => <Informar {...props}/>} />
            <PrivateRoute path="/app" name="Home" component={props => <DefaultLayout {...props}/>} />
            <Route path="*" name="Page 404" render={props => <Page404 {...props}/>} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
