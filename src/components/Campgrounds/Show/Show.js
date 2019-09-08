import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table/Table';

const Show = props => {
  const [campground, setCampground] = useState(null);
  const [user, setUser] = useState('');

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem('user'));
    setUser(authUser);

    axios
      .get(
        'https://yelp-papi-api.herokuapp.com/campgrounds/' +
          props.match.params.id
      )
      .then(response => {
        setCampground(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, [props]);

  const tabRow = () => {
    return (
      campground && (
        <Table
          obj={campground}
          userId={user && user._id}
          key={campground._id}
        />
      )
    );
  };

  return <div className="container">{tabRow()}</div>;
};

export default Show;
