import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Body.css';

const Body = props => {
  return (
    <div className="col-md-3 col-sm-6">
      <div className={classes.thumbnail}>
        <img className={classes.img} alt="" src={props.obj.image} />
        <div className={classes.caption}>
          <h4>{props.obj.name}</h4>
        </div>

        <p>
          <Link
            to={'/campgrounds/' + props.obj._id + '/show'}
            className="btn btn-primary"
          >
            Show
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Body;
