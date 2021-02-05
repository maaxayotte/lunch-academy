import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import SignOutButton from "../authentication/SignOutButton";
import NewRecipeForm from "./../NewRecipeForm"

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key='sign-in'>
      <Link id="sign-in-button" to='/user-sessions/new'>Sign In</Link>
    </li>,
    <li key='sign-up'>
      <Link to='/users/new' className='button' id="btn-sign">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key='sign-out' id='sign-in-menu'>
      <SignOutButton />
    </li>,
  ];

  const hamburgerMenu = () => {
    var burger = document.getElementById("hideToggle");
    if (burger.style.display === "block") {
      burger.style.display = "none";
    } else {
      burger.style.display = "block"
    }
  }

  return (
    <div className='top-bar' id='top-bar-color'>
      <div className='top-bar-left' >
        <ul className='menu' id='top-bar-colors'>
          <li className='menu-text'></li>
          <a href="javascript:void(0);" className="icon" onClick={hamburgerMenu}>
            <FontAwesomeIcon icon={ faBars } />
          </a>
          <li>
            <Link className="lunch-nav" to='/'>Lunch Academy</Link>
          </li>
          <div id='hideToggle'>
            <li id='menuItem' ><Link to='/recipes/new'>Add New Recipe</Link></li>
          </div>
        </ul>
      </div>
      <div className='top-bar-right'>
        <ul className='menu'>{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
