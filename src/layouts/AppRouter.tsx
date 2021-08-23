import React from "react";

import {
  // See https://reacttraining.com/react-router/web/guides/quick-start for details
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
  RouteComponentProps,
} from "react-router-dom";

import { ReduxType } from "../container/Container";
import ThemeWrapper from "./ThemeWrapper";
import ErrorWrapper from "./ErrorWrapper";
import NotifyWrapper from "./NotifyWrapper";
import mainPage from './mainLayout/views/Page';
import requestsPage from "./requestsLayout/views/Page";
import calcPage from "./calc/layout/Page";
import palettePage from "./paletteLayout/views/Page";

interface IRoute {
  key?: number
  path: string
  component: React.Component
  exact: boolean
}

interface IRouteList extends Array<IRoute>{}

const routeList: IRouteList = [
  // {path: '', component: React.ComponentType, [exact]}
  { path: "/", component: mainPage, exact: true, },
  { path: "/requests", component: requestsPage, exact: true, },
  { path: "/calc", component: calcPage, exact: true, },
  { path: "/palette", component: palettePage, exact: true, },
];

//const AppRouter = (): JSX.Element => {
class AppRouter extends React.Component<ReduxType, any> {
  public render() {
    //console.log('AppRouter:'+JSON.stringify(this.props));
    return (
      <ThemeWrapper palette={this.props.palette}>
        <ErrorWrapper>
          <NotifyWrapper>
            <Router>
              <Switch>
                {routeList.map((route, i) => (
                  <Route
                    key={i}
                    render={(props: RouteComponentProps<{}>) => <route.component {...this.props}/>}
                    path={route.path}
                    exact={route.exact}
                  />
                ))}
                <Redirect to="/" />
              </Switch>
            </Router>
            </NotifyWrapper>
    		</ErrorWrapper>
      </ThemeWrapper>
    );
  }
}

export default AppRouter;