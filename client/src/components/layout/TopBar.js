import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../authentication/SignOutButton';

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key='sign-in'>
      <Link to='/user-sessions/new'>Sign In</Link>
    </li>,
    <li key='sign-up'>
      <Link to='/users/new' className='button'>
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key='sign-out'>
      <SignOutButton />
    </li>,
  ];

  function hamburgerMenu() {
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
          <a href="javascript:void(0);" className="icon" onClick={hamburgerMenu}><i className="fa fa-bars"></i></a>
          <li>
            <Link className="lunch-nav" to='/'>Lunch Academy</Link>
          </li>
          <div id='hideToggle'>
            <li id='menuItem' className='menu'><Link to='/recipes/new'>Add New Recipe</Link></li>
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
