import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import './index.less';
import Nav from './node_modules/components/nav';
import OptNav from './node_modules/components/rightOptNav';
import NavWorkbook from './node_modules/components/workbook/NavWorkbook';
import { NavInfo } from './node_modules/store/constant_info';
import routes from './node_modules/router';
console.log(routes)
class WorkbookLayout extends Component {
    render() {
        return (
            <div className="WorkbookLayout">
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
                        <NavWorkbook  match={this.props.match} />
                    </section>
                    <section className="rightContainer">
                    <Switch>
                        <Redirect from={`${this.props.match.url}`} exact to={`${this.props.match.url}/workbook`}></Redirect>
                        {NavInfo.map(i => {
                            return (
                                <Route path={`${this.props.match.url}/${i.to}`}  exact key={i.key} component={routes[i.key]} />
                            )
                        })}
                    </Switch>
                    </section>
                </div>
            </div>
        )
    }
}
export default WorkbookLayout;