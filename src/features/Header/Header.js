import React, { useState } from 'react';
import { FaReddit, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './Header.css';

import {
  selectSelectedSubreddit,
  setPostSearchTerm,
} from '../SubredditPosts/subredditPostsSlice';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const selectedSubreddit = useSelector(selectSelectedSubreddit);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setPostSearchTerm(searchTerm));
    setSearchTerm('');
  };

  const handleSearchFormChange = ({ target }) => {
    setSearchTerm(target.value);
    dispatch(setPostSearchTerm(searchTerm));
  };

  return (
    <header className='header-ctr'>
      <Link to={selectedSubreddit}>
        <button
          className='logo-ctr'
          onClick={() => navigate(selectedSubreddit)}>
          <FaReddit className='main-logo' />
          <h1 className='logo-text'>
            <span>reddit</span>Mini
          </h1>
        </button>
      </Link>

      <form className='search-form' onSubmit={handleSearchSubmit}>
        <input
          type='text'
          className='search-box'
          placeholder='Search reddit'
          value={searchTerm}
          onChange={handleSearchFormChange}
        />
        <button type='submit' className='search-btn'>
          <FaSearch className='search-btn-icon' />
        </button>
      </form>
    </header>
  );
};

export default Header;
