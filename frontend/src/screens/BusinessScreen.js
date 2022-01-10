import React, { useEffect } from 'react'
import { Card, Col, Row, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listBusinessDetails } from '../store/actions/businessActions';
import {Avatar} from "@mui/material";
import {blue} from "@mui/material/colors";

const BusinessScreen = ({ match }) => {
  const dispatch = useDispatch();
  const businessId = match.params.userId;

  const businessDetails = useSelector(state => state.businessDetails);
  const { loading, error, business } = businessDetails;

  useEffect(() => {
    if (business.user !== businessId && !loading) {
      dispatch(listBusinessDetails(businessId));
    }
  }, [dispatch, business, businessId, loading])

  const countApplicantsAtInternship = (internship) => {
    if (business) {
      let count = 0;
      
      for (let application of business.applicants) {
        if (application.offer === internship) {
          count += 1;
        }
      }

      return count;
    } else return "Loading...";
  }

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
      <>
      <Row>
        <Col className="col-lg-5">
          <Card>
            <Card.Body>
              <div className="d-flex flex-column align-items-center text-center">
                <Avatar sx={{bgcolor: blue[600], width: 100, height: 100, fontSize: 40}}>
                  {business?.name?.split(' ')[0][0]}{business?.name?.split(' ').length > 1 ? business?.name?.split(' ')[1][0] : ''}
                </Avatar>
                <div style={{fontSize: 22}}><b>{business.name}</b></div>
                <div style={{fontSize: 18}}><i>{business.email}</i></div>
                <hr className="my-4"/>
                <div className="fst-italic" style={{fontSize: 16}}>
                  {business.about ? "\"" + business.about + "\"" : "No description yet! Edit your profile to add one."}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <div className="col-lg-7">
          <div className="card">
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0">Full Name</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {business.name}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0">Email</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {business.email}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0">City</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {business.city}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0">Domain</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {business.domain}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>
      <Row style={{paddingTop: 75}}>
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>#</th>
              <th>Available Internships</th>
              <th>Applicants</th>
              <th>Apply now</th>
            </tr>
            </thead>
            <tbody>
            {business?.internships?.map((internship, index) =>
              <tr>
                <td>{index + 1}</td>
                <td>{internship}</td>
                <td>
                  {countApplicantsAtInternship(internship)}
                </td>
                <td>Apply</td>
              </tr>
            )}
            </tbody>
          </Table>
        </Row>
      </>
    )}
    </>
  )
}

export default BusinessScreen
