import React, { useState, useEffect } from 'react';
import {Avatar} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {blue} from "@mui/material/colors";
import {Button, Card, Col, Container, Form, FormGroup, Row, Table} from "react-bootstrap";
import { listBusinessDetails } from '../store/actions/businessActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const StudentProfileScreen = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const businessDetails = useSelector(state => state.businessDetails);
  const { loading, error, business } = businessDetails;

  useEffect(() => {
    if (userInfo && !loading) {
      dispatch(listBusinessDetails(userInfo._id));
    }
  }, []);

  //NOTE: Hardcoded data
  userInfo.applications = [{
    id: "Samsung",
    name: "Embedded software intern",
    cv: "cv_v1.0_8.01.2021"
  },
    {
      id: "Apple",
      name: "Cloud computing intern",
      cv: "cv_v1.0_8.01.2021"
    },
    {
      id: "Microsoft",
      name: "Machine learning internship",
      cv: "cv_v2.0_9.01.2021"
    }
  ]


  const [profile, setProfile] = useState({userInfo})
  const [, setUpdate] = useState(0);

  const onEditProfileSubmit = e => {
    e.preventDefault()

    /* 0 verificari de integritate, dar aia e. */

    userInfo.name = profile.name
    userInfo.email = profile.email
    userInfo.about = profile.about

    /* Refresh page. */
    setUpdate((value) => value + 1)

    //TODO: update selector state.
  }

  return (
    <>
    {loading ? (
      <Loader />
    ) : error ? (
      <Message variant='danger'>{error}</Message>
    ) : (
      <Container>
        <Row>
          <Col className="col-lg-5">
            <Card>
              <Card.Body>
                <div className="d-flex flex-column align-items-center text-center">
                  <Avatar sx={{bgcolor: blue[600], width: 100, height: 100, fontSize: 40}}>
                    {userInfo.name.split(' ')[0][0]}{userInfo.name.split(' ').length > 1 ? userInfo.name.split(' ')[1][0] : ''}
                  </Avatar>
                  <div style={{fontSize: 22}}><b>{userInfo.name}</b></div>
                  <div style={{fontSize: 18}}><i>{userInfo.email}</i></div>
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
                <Form onSubmit={onEditProfileSubmit}>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <Form.Control type="text" name="formName" value={business.name}
                                    onChange={(e) => setProfile({...profile, name: e.target.value})}/>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <Form.Control type="text" name="formEmail" value={userInfo.email}
                                    onChange={(e) => setProfile({...profile, email: e.target.value})}/>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">About</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <Form.Control type="text" name="formAbout" value={business.about}
                                    onChange={(e) => setProfile({...profile, about: e.target.value})}/>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">City</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <Form.Control type="text" name="formAbout" value={business.city}
                                    onChange={(e) => setProfile({...profile, about: e.target.value})}/>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Domains</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <Form.Control type="text" name="formAbout" value={business.domain}
                                    onChange={(e) => setProfile({...profile, about: e.target.value})}/>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Visibility</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {business?.available ? 'true' : 'false'}
                    </div>
                  </div>
                  <FormGroup>
                    <div className="row">
                      <div className="col-sm-3"/>
                        <div className="col-sm-9 text-secondary">
                          <Button type='submit' variant='warning'>Save Changes</Button>
                        </div>
                      </div>
                  </FormGroup>
                </Form>
              </div>
            </div>
          </div>
        </Row>
        <Row style={{paddingTop: 75}}>
          <Col>
            <div className="row mb-3" style={{display: 'flex', alignItems: 'center'}}>
              <div className="col-sm-2">
                <h6 className="mb-0">Add Internship</h6>
              </div>
              <div className="col-sm-6 text-secondary">
                <Form.Control type="text" name="formAbout" 
                              onChange={(e) => setProfile({...profile, about: e.target.value})}/>
              </div>
              <div className="col-sm-2 text-secondary">
                <a href="/business-profile">Add</a>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={{paddingTop: 15}}>
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>#</th>
              <th>Student</th>
              <th>Offer</th>
              <th>Applicant CV</th>
            </tr>
            </thead>
            <tbody>
            {business?.applicants?.map((applicant, index) =>
              <tr>
                <td>{index + 1}</td>
                <td>{applicant.name}</td>
                <td>{applicant.offer}</td>
                <td><a href="/business-profile">{applicant.cv}</a></td>
              </tr>
            )}
            </tbody>
          </Table>
        </Row>
      </Container>
    )}
    </>
  )
}

export default StudentProfileScreen
