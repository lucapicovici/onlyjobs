import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Row } from 'react-bootstrap';

const HomeScreen = ({ history }) => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const redirect = () => {
    if (userInfo && userInfo.role === 'student') {
      history.push('/internships');
    } else if (userInfo && userInfo.role === 'business') {
      history.push('/students')
    } else {
      history.push('/login');
    }
  }

  return (
    /**
     * @TODO:
     * Add background image
     */
    <Row className='homeScreenRow'>
      <Col className='homeScreenCol'>
        <h1>OnlyJobs</h1>
        <Button id='homeBtn' onClick={redirect}>
          {!userInfo || userInfo?.role === 'student' 
            ? 'Search for internship'
            : 'Search students'
          }
        </Button>
      </Col>
    </Row>
  )
}

export default HomeScreen;