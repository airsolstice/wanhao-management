import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./index.less";
import Nav from "components/nav";
import OptNav from "components/rightOptNav";
import NavWorkbook from "components/workbook/NavWorkbook";
import { NavWorkbookConstant } from "store/constant_workbook";
import routes from "router";
const WorkbookLayout = (props) => {
  const { match } = props;
  return (
    <div className="WorkbookLayout">
      <header className="header">
        <div className="logo">万豪</div>
        <div className="navSide">
          <Nav match={match} />
          <OptNav history={props.history} path={props.match.path} />
        </div>
      </header>
      <div className="container">
        <section className="leftSide">
          <NavWorkbook match={match} />
        </section>
        <section className="rightContainer">
          <Switch>
            <Redirect
              from={`${props.match.url}`}
              exact
              to={`${props.match.url}/charge`}
            ></Redirect>
            {NavWorkbookConstant.map((i) => {
              return (
                <Route
                  path={`${props.match.url}/${i.to}`}
                  exact
                  key={i.key}
                  component={routes[i.key]}
                />
              );
            })}
          </Switch>
          <div></div>
        </section>
      </div>
    </div>
  );
};
export default WorkbookLayout;
