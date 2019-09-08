import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const Table = props => {
  const [redirect, setRedirect] = useState(false);

  const deleted = () => {
    const token = localStorage.getItem('token');

    axios
      .delete(
        'https://yelp-papi-api.herokuapp.com/campgrounds/' + props.obj._id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(response => {
        setRedirect(true);
      })
      .catch(err => console.log(err));
  };

  if (redirect) {
    return <Redirect to={'/campgrounds'} />;
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-9">
          <div className="thumbnail">
            <img
              style={{ width: '100%' }}
              alt=""
              className="img-responsive"
              src={props.obj.image}
            />
            <div className="caption-full">
              <h4 className="pull-right">₦{props.obj.price}</h4>
              <h4>{props.obj.name}</h4>
              <p>{props.obj.description}</p>

              {props.userId === props.obj.owner && (
                <p>
                  <Link
                    style={{ marginRight: '10px' }}
                    to={'/campgrounds/' + props.obj._id + '/edit'}
                    className="btn btn-primary"
                  >
                    Edit
                  </Link>
                  <button onClick={deleted} className="btn btn-danger">
                    Delete
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
