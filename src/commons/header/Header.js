import React, {Component} from 'react';
import {
    Collapse, DropdownItem, DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown
} from "reactstrap";
import AuthenService from "../../services/AuthenService";
import * as SocketService from "../../services/SocketService";
import * as roomApi from "../../api/room-api";

class Header extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    _handleLogout() {
        const userInfo = AuthenService.get();
        roomApi.closeRoom({room: userInfo.room_id});

        SocketService.disconnect();
        AuthenService.set(null);
    }

    // componentDidMount() {
    //     AuthenService.onChange(this, this.forceUpdate.bind(this));
    // }
    //
    // componentWillUnmount() {
    //     AuthenService.unChange(this);
    // }

    render() {
        const userInfo = AuthenService.get();

        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand>Logan</NavbarBrand>
                    <Nav navbar className="ml-auto">
                        {
                            userInfo ? (
                                <NavItem>
                                    <NavLink
                                        href="#"
                                        onClick={this._handleLogout.bind(this)}
                                    >Thoát</NavLink>
                                </NavItem>
                            ) : null
                        }
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default Header;
