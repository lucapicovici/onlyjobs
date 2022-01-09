import React, {useState} from 'react'
import {Avatar} from "@mui/material";
import {useSelector} from "react-redux";
import {blue} from "@mui/material/colors";
import {Button, Card, Col, Container, Form, FormGroup, Row, Table} from "react-bootstrap";

const StudentProfileScreen = () => {

  const userLogin = useSelector(state => state.userLogin);
  const {userInfo} = userLogin;

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
    /**
     * Student Profile shall contain:
     *
     * Name
     * About
     * Profile picture
     * Form to update profile details (name, email, password, cv, about, images)
     * List of all businesses where student applied for internship
     *  The list can be a table with the collumns - BusinessName, CV
     *    Collumn BusinessName shall be a link to the actual business profile page
     */
    <div>

      <Container>
        <Row>
          <Col className="col-lg-3">
            <Card>
              <Card.Body>
                <div className="d-flex flex-column align-items-center text-center">
                  <Avatar sx={{bgcolor: blue[600], width: 100, height: 100, fontSize: 40}}>
                    {userInfo.name.split(' ')[0][0]}{userInfo.name.split(' ').length > 1 ? userInfo.name.split(' ')[1][0] : ''}
                  </Avatar>
                  <div style={{fontSize: 22}}><b>{userInfo.name}</b></div>
                  <div style={{fontSize: 22}}><i>{userInfo.email}</i></div>
                  <hr className="my-4"/>
                  <div className="fst-italic">
                    {userInfo.about ? "\"" + userInfo.about + "\"" : "No description yet! Edit your profile to add one."}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body">
                <Form onSubmit={onEditProfileSubmit}>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <Form.Control type="text" name="formName" value={profile.name}
                                    onChange={(e) => setProfile({...profile, name: e.target.value})}/>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <Form.Control type="text" name="formEmail" value={profile.email}
                                    onChange={(e) => setProfile({...profile, email: e.target.value})}/>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">About</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <Form.Control type="text" name="formAbout" value={profile.about}
                                    onChange={(e) => setProfile({...profile, about: e.target.value})}/>
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
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>#</th>
              <th>Company</th>
              <th>Offer</th>
              <th>Application CV</th>
            </tr>
            </thead>
            <tbody>
            {userInfo.applications.map((application, index) =>
              <tr>
                <td>{index + 1}</td>
                {/*TODO: StudentModel has business ID, not name, so this is not available.*/}
                <td>{application.id}</td>
                <td>{application.name}</td>
                {/*{TODO: Empty link}*/}
                <td><a href="#">{application.cv} </a></td>
              </tr>)}
            </tbody>
          </Table>
        </Row>
      </Container>
    </div>
  )
}

export default StudentProfileScreen
