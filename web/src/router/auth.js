import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Route, Redirect } from 'react-router-dom'
class AuthorizedRoute extends Component {
    render() {
        const { component: Component, ...rest } = this.props;
        let _info = window.localStorage.getItem("userInfo")? JSON.parse(window.localStorage.getItem("userInfo")):'';
        const isLogin = _info && _info.username?true : false;
        return (
            <Route {...rest} render={props => {
                return isLogin
                    ? <Component {...props} />
                    : <Redirect to="/login" />
            }} />
        )
    }
}
export default withRouter(AuthorizedRoute);