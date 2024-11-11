import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews, setPage } from './redux/newsSlice';
import Header from './components/Header';
import NewsList from './components/NewsList';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import LoginPage from './components/LoginPage'; // Import LoginPage Component
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const { articles, currentPage, totalPages, status, error } = useSelector(
    (state) => state.news
  );

  // Check if the user is already logged in when the app loads
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchNews({ query: 'react', page: currentPage }));
    }
  }, [dispatch, currentPage, isLoggedIn]);

  const handleSearch = (query) => {
    if (isLoggedIn) {
      dispatch(fetchNews({ query, page: 1 }));
    } else {
      alert("Please log in first!");
    }
  };

  const handlePageChange = (page) => {
    if (isLoggedIn) {
      dispatch(setPage(page));
      dispatch(fetchNews({ query: 'react', page }));
    } else {
      alert("Please log in first!");
    }
  };

  const handleLogin = (credentials) => {
    // In a real app, you'd verify credentials here with an API
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Persist login state
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false'); // Clear login state
  };

  return (
    <div>
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <>
          <Header />
          <SearchBar onSearch={handleSearch} />
          {status === 'loading' && <p>Loading...</p>}
          {status === 'failed' && <p>Error: {error}</p>}
          {status === 'succeeded' && <NewsList news={articles} />}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <button onClick={handleLogout}>Logout</button> {/* Logout button */}
        </>
      )}
    </div>
  );
};

export default App;
