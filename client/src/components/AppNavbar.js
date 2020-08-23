import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
}  from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import wow from '../assets/imgs/wow_logo.png';

class AppNavbar extends Component {
    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3"><strong>{ user ? `Přihlášen jako ${user.name}` : null }</strong></span>
                </NavItem>
                <NavItem>
                    <NavLink href="/upload">Upload</NavLink>
                </NavItem>
                {/* <NavItem>
                    <RegisterModal />
                </NavItem> */}
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        ); 

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        );

        return(
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/"><img src={wow} alt="wow logo" className="align-middle" style={{ height: '40px', paddingRight: '10px' }}/>DKP List</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                { isAuthenticated ? authLinks : guestLinks }
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);