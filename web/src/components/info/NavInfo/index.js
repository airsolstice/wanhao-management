import React, { Component }from 'react';
import { NavLink } from 'react-router-dom';
import { NavWorkbook } from 'store/nav_workbook';
import './index.less';

class NavWorkbook extends Component {
    render() {
        return (
            <ul className="navShow">
                    {NavWorkbook.map(i => {
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


export default NavWorkbook;