import React  from "react";
import { NavLink } from "react-router-dom";
import { NavWorkbookConstant } from "store/constant_workbook";
import "./index.less";

const NavWorkBook = (props) => {
  return (
    <ul className="NavWorkBook">
      {NavWorkbookConstant.map((i) => {
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

export default NavWorkBook;
