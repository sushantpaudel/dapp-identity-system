import React, { Fragment } from 'react';
import {
  DropdownToggle,
  DropdownMenu,
  Nav,
  NavItem,
  NavLink,
  UncontrolledButtonDropdown,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import avatar1 from 'admin/assets/images/avatars/user-icon.png';
import { logout } from 'admin/redux/actions/authAction';
import { connect } from 'react-redux';
import ChangePassword from 'admin/views/Users/ChangePassword';

class UserBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      modalOpen: false,
    };
  }

  render() {
    return (
      <Fragment>
        <Modal isOpen={this.state.modalOpen} toggle={() => this.setState({ modalOpen: false })}>
          <ModalHeader>
            <window.t>Change Password</window.t>
          </ModalHeader>
          <ModalBody>
            <ChangePassword cancel={() => this.setState({ modalOpen: false })} />
          </ModalBody>
        </Modal>
        <div className="header-btn-lg pr-0">
          <div className="widget-content p-0">
            <div className="widget-content-wrapper">
              <div className="widget-content-left">
                <UncontrolledButtonDropdown>
                  <DropdownToggle color="link" className="p-0">
                    <img width={42} className="rounded-circle" src={avatar1} alt="" />
                    <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown} />
                  </DropdownToggle>
                  <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                    <Nav vertical>
                      {/* <NavItem className="nav-item-header">Activity</NavItem>
                      <NavItem>
                        <NavLink href="javascript:void(0);">
                          Chat
                          <div className="ml-auto badge badge-pill badge-info">
                            8
                          </div>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="javascript:void(0);">
                          Recover Password
                        </NavLink>
                      </NavItem> */}

                      <NavItem className="nav-item-header">My Account</NavItem>
                      {/* <NavItem>
                        <NavLink href="javascript:void(0);">
                          Settings
                          <div className="ml-auto badge badge-success">New</div>
                        </NavLink>
                      </NavItem> */}
                      <NavItem>
                        <NavLink href="#" onClick={() => this.setState({ modalOpen: true })}>
                          Change Password
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="#" onClick={() => this.props.dispatch(logout())}>
                          Logout
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div>
              {this.props.authUser && (
                <div className="widget-content-left  ml-3 header-user-info">
                  <div className="widget-heading">
                    {this.props.authUser.firstName} {this.props.authUser.lastName}
                  </div>
                  {this.props.authUser.roles && (
                    <div className="widget-subheading">{this.props.authUser.roles.map(role => role.name + ' ')}</div>
                  )}
                </div>
              )}

              {/* <div className="widget-content-right header-user-info ml-3">
                <Button
                  className="btn-shadow p-1"
                  size="sm"
                  onClick={this.notify2}
                  color="info"
                  id="Tooltip-1">
                  <FontAwesomeIcon className="mr-2 ml-2" icon={faCalendarAlt} />
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(state => ({
  authUser: state.authUser,
}))(UserBox);
