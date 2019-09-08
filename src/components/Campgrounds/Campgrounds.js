import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Body from './Body/Body';

const Campgrounds = props => {
  const [campground, setCampground] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios
      .get('https://yelp-papi-api.herokuapp.com/campgrounds')
      .then(response => {
        console.log(response.data);
        setCampground(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });

    if (localStorage.getItem('token')) {
      console.log('Call User feed');
    } else {
      setRedirect(false);
    }
  }, [props]);

  const tabRow = () => {
    return (
      campground &&
      campground.map(function(object, i) {
        return <Body obj={object} key={i} />;
      })
    );
  };

  const logout = () => {
    localStorage.setItem('token', '');
    localStorage.clear();
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={'/login'} />;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    return (
      <div className="container">
        <header className="jumbotron">
          <div className="container">
            <h1>Welcome To YelpCamp</h1>
            <p>View our hand picked campgrounds from all over the world</p>
            <p>
              <Link className="btn btn-primary btn-lg" to="/Register">
                To Add Campground, Please Register/Signin
              </Link>
            </p>
          </div>
        </header>

        <div
          className="row text-center"
          style={{ display: 'flex', flexWrap: 'wrap' }}
        >
          {tabRow()}
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <header className="jumbotron">
          <div className="container">
            <button onClick={logout} className="pull-right btn btn-success">
              logout
            </button>
            <h1>Welcome To YelpCamp</h1>
            <p>View our hand picked campgrounds from all over the world</p>
            <p>
              <Link className="btn btn-primary btn-lg" to="/campgrounds/new">
                Add New Campground
              </Link>
            </p>
          </div>
        </header>

        <div
          className="row text-center"
          style={{ display: 'flex', flexWrap: 'wrap' }}
        >
          {tabRow()}
        </div>
      </div>
    );
  }
};

export default Campgrounds;
