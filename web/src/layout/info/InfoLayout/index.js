import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./index.less";
import Nav from "components/nav";
import OptNav from "components/rightOptNav";
import NavInfo from "components/info/NavInfo";
import { NavInfoConstant } from "store/constant_info";
import routes from "router";
console.log(routes);
const InfoLayout = (props) => {
  const { match } = props;
  return (
    <div className="InfoLayout">
      <header className="header">
        <div className="logo">万豪</div>
        <div className="navSide">
          <Nav match={match} />
          <OptNav history={props.history} path={props.match.path} />
        </div>
      </header>
      <div className="container">
        <section className="leftSide">
          <NavInfo match={props.match} />
        </section>
        <section className="rightContainer">
          <Switch>
            <Redirect
              from={`${props.match.url}`}
              exact
              to={`${props.match.url}/hotel`}
            ></Redirect>
            {NavInfoConstant.map((i) => {
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
export default InfoLayout;
