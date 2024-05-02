import React from "react";
import {Nav, NavLink, Bars, NavMenu, NavBtn,NavBtnLink,} from './NavbarElements';

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />

                <NavMenu>
                    <NavLink to="/inventory" >
                        Inventory
                    </NavLink>
                    <NavLink to="/recipes" activeStyle>
                        Recipes
                    </NavLink>
                    <NavLink to="/employees" activeStyle>
                        Employees
                    </NavLink>
                    <NavLink to="/login" activeStyle>
                       Login
                    </NavLink>
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/login">
                        LogIn
                    </NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;