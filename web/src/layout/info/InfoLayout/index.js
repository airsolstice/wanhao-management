import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import './index.less';
import Nav from 'components/nav';
import OptNav from 'components/rightOptNav';
import NavInfo from 'components/info/NavInfo';
import { NavInfoConstant } from 'store/constant_info';
import routes from 'router';
console.log(routes)
class InfoLayout extends Component {
    render() {
        return (
            <div className="InfoLayout">
                <header className="header">
                    <div className="logo">万豪</div>
                    <div className="navSide">
                        <Nav />
                        <OptNav history={this.props.history} path={this.props.match.path} />
                    </div>
                    
                </header>
                <div className="container">
                    <section className="leftSide">
                        <h1></h1>
                        <NavInfo  match={this.props.match} />
                    </section>
                    <section className="rightContainer">
                    <Switch>
                        <Redirect from={`${this.props.match.url}`} exact to={`${this.props.match.url}/workbook`}></Redirect>
                        {NavInfoConstant.map(i => {
                            return (
                                <Route path={`${this.props.match.url}/${i.to}`}  exact key={i.key} component={routes[i.key]} />
                            )
                        })}
                    </Switch>

                <div>
                        asdasdasd

                </div>
                    </section>
                </div>
            </div>
        )
    }
}
export default InfoLayout;