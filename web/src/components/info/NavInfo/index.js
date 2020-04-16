import React from "react";
import { NavLink } from "react-router-dom";
// import { Icon } from "antd";
// import { nav } from "store/constant";
import { NavInfoConstant } from 'store/constant_info';
import "./index.less";

const Nav = (props) => {
  return (
    <ul className="NavInfo">
      {NavInfoConstant.map((i) => {
        // return (
        //     <li key={i.key} className="navList">
        //         <NavLink to={`/${i.to}`} activeClassName="navSelected"><Icon type={i.icon} /><span className="navLabel">{i.title}</span></NavLink>
        //     </li>
        // )
        return (
          <li key={i.key} className="navShowList">
            <NavLink
              to={`${props.match.url}/${i.to}`}
              activeClassName="navSelected"
            >
              <i.icon />
              <span className="navLabel">{i.title}</span>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default React.memo(Nav);
