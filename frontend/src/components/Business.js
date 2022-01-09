import React from 'react';
import { Link } from 'react-router-dom';

const Business = ({ business }) => {
  return (
    <div className="card mb-3 businessListCard">
      <div className="row no-gutters">
        <Link className="col-md-4 imgWrapper" to={`/businesses/${business._id}`}>
          <img src={business.images?.[0]?.src} alt={business.name} />
        </Link>
        <div className="col-md-8">
          <div className="card-body">
            <div className="card-title-wrap">
              <Link className="card-title" to={`/businesses/${business._id}`}>
                <span>{business.name}</span>
              </Link>
            </div>
            <p className="card-text type">Internship</p>
            <p className="card-text description">{business.about}</p>
            <p className="card-text city"><small className="text-muted">{business.city}</small></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Business
