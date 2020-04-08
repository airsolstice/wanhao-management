import React, { Component }from 'react';
import { NavLink } from 'react-router-dom';
import { NavInfoConstant } from 'store/constant_info';
import './index.less';

class NavInfo extends Component {
    render() {
        return (
            <ul className="NavInfo">
                    {NavInfoConstant.map(i => {
                        return (
                            <li key={i.key} className="navShowList">
                                <NavLink to={`${this.props.match.url}/${i.to}`} activeClassName="navSelected"><span className="navLabel">{i.title}</span></NavLink>
                            </li>
                        )
                    })}
            </ul>
        )
    }
}


export default NavInfo;