import React,  { Component ,Suspense, lazy} from 'react';
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import PageLoading from 'components/pageLoading/index';

const HomeLayout = lazy( () => import('layout/home/HomeLayout'));
const WorkbookLayout = lazy( () => import('layout/workbook/WorkbookLayout'));
const InfoLayout = lazy( () => import('layout/info/InfoLayout'));
const Login = lazy( () => import('views/login'));
const NotFound = lazy( () => import('views/notFound'));
const NotAuth = lazy( () => import('views/notAuth'));
const AuthorizedRoute = lazy( () => import('router/auth'));

class App extends Component{
  render(){
    return (
      <div className="App">
        <HashRouter>
          <Suspense fallback={PageLoading}>
              <Switch>
                <Redirect path='/' exact to="/home" />
                <AuthorizedRoute  path="/home" component={HomeLayout} />
                <AuthorizedRoute  path="/workbook" component={WorkbookLayout} />
                <AuthorizedRoute  path="/info" component={InfoLayout} />
                <Route path="/login" component={Login}></Route>
                <Route path="/notAuth" component={NotAuth}></Route>
                <Route component={NotFound} />
              </Switch>
          </Suspense>
        </HashRouter>
        
      </div>
    );
  }
}
export default App;
