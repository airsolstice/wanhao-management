import React, { Component } from 'react';
import './index.less';
import Nav from 'components/nav';
import OptNav from 'components/rightOptNav';

class HomeLayout extends Component {
    render() {
        return (
            <div className="HomeLayout">
                <header className="header">
                    <div className="logo">万豪</div>
                    <div className="navSide">
                        <Nav  match={this.props}/>
                        <OptNav history={this.props.history} path={this.props.match.path} />
                    </div>
                    
                </header>
                <div className="container">
                    <div>
                        首页展示聚合数据.
                    </div>
                </div>
            </div>
        )
    }
}
export default HomeLayout;