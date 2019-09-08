import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const NewCampground = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleNameChange = event => setName(event.target.value);
  const handlePriceChange = event => setPrice(event.target.value);
  const handleImageChange = event => setImage(event.target.value);
  const handleDescriptionChange = event => setDescription(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();
    const data = {
      name,
      price,
      image,
      description,
    };
    const token = localStorage.getItem('token');
    console.log(token);
    axios
      .post('https://yelp-papi-api.herokuapp.com/campgrounds', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setRedirect(true);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  if (redirect) {
    return <Redirect to={'/campgrounds'} />;
  }

  if (!localStorage.getItem('token')) {
    return <Redirect to={'/campgrounds'} />;
  }

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center' }}>Create a New Campground</h1>
      <div style={{ width: '40%', margin: '25px auto' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="price"
              value={price}
              onChange={handlePriceChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="image"
              value={image}
              onChange={handleImageChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCampground;
