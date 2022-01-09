import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listBusinessDetails } from '../store/actions/businessActions';

const BusinessScreen = ({ match }) => {
  const dispatch = useDispatch();
  const businessId = match.params.id;

  const businessDetails = useSelector(state => state.businessDetails);
  const { loading, error, business } = businessDetails;

  useEffect(() => {
    if (business._id !== businessId && !loading) {
      dispatch(listBusinessDetails(businessId));
    }
  }, [dispatch, business, businessId, loading])

  return (
    <>
    <Link className='btn btn-outline-secondary my-3' to='/businesses'>
      Go Back
    </Link>
    {loading ? (
      <Loader />
    ) : error ? (
      <Message variant='danger'>{error}</Message>
    ) : (
      <h1>{business.name}</h1>
    )}
    </>
  )
}

export default BusinessScreen
