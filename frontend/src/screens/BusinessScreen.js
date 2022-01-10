import React, { useEffect } from 'react'
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listBusinessDetails, studentApplyForInternship } from '../store/actions/businessActions';
import { studentApply } from '../store/actions/studentActions';
import {Avatar} from "@mui/material";
import {blue} from "@mui/material/colors";

const BusinessScreen = ({ match }) => {
  const dispatch = useDispatch();
  const businessId = match.params.userId;

  const businessDetails = useSelector(state => state.businessDetails);
  const { loading, error, business } = businessDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

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

  const applyForInternship = (event) => {
    if (userInfo) {
      let cv = document?.getElementById('upload-cv')?.value;
      let businessName = business.name;
      let studentUserId = userInfo._id;
      let offer = event.target.getAttribute('data-arg1');

      // Call action creator
      dispatch(studentApply({ 
        businessId, 
        studentUserId, 
        name: businessName, 
        cv, 
        offer 
      }));

      console.log(userInfo.name + ' applied to ' + offer);

      // Post data to business model as well
      dispatch(studentApplyForInternship({ 
        studentId: studentUserId, 
        businessUserId: business.user, 
        name: userInfo.name, 
        cv, 
        offer 
      }));

      console.log('Updating business table...');
    }
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
              <th>Upload CV</th>
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
                <td>
                  <Form.Control size="sm" type="text" id="upload-cv" placeholder="Select file..." />
                </td>
                <td>
                  <Button size='sm' onClick={applyForInternship} data-arg1={internship}>Apply</Button>
                </td>
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
