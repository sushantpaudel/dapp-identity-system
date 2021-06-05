import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import MetisMenu from "react-metismenu";
import {connect} from "react-redux";
import {MainNav, SettingsNav, generateNavItems, AdminNav} from "./NavItems";

class Nav extends Component {
  state = {};

  render() {
    const p = this.props.p;
    return (
      <Fragment>
        <h5 className="app-sidebar__heading">Main</h5>
        <MetisMenu
          content={generateNavItems(MainNav, p)}
          activeLinkFromLocation
          className="vertical-nav-menu"
          iconNamePrefix=""
          classNameStateIcon="pe-7s-angle-down"
        />
        {(p.isAdmin || p.user || p.role) && (
          <>
            <h5 className="app-sidebar__heading">Settings</h5>
            <MetisMenu
              content={generateNavItems(SettingsNav, p)}
              activeLinkFromLocation
              className="vertical-nav-menu"
              iconNamePrefix=""
              classNameStateIcon="pe-7s-angle-down"
            />
          </>
        )}
        {p.isAdmin && (
          <>
            <h5 className="app-sidebar__heading">Admin</h5>
            <MetisMenu
              content={generateNavItems(AdminNav, p)}
              activeLinkFromLocation
              className="vertical-nav-menu"
              iconNamePrefix=""
              classNameStateIcon="pe-7s-angle-down"
            />
          </>
        )}
      </Fragment>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default connect((state) => ({
  p: state.permissions,
}))(withRouter(Nav));
