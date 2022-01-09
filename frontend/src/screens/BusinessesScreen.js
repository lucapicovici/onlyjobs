import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listBusinesses } from '../store/actions/businessActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Paginate from '../components/Paginate';
import Business from '../components/Business';

const BusinessesScreen = ({ match, history }) => {
  // Student's page for searching internships

  const dispatch = useDispatch();
  const pageNumber = match.params.pageNumber || 1;

  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');
  const [domain, setDomain] = useState('');

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const businessList = useSelector(state => state.businessList);
  const { loading, error, count, businesses, page, pages } = businessList;

  const searchKeyword = '';

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(listBusinesses(pageNumber, searchKeyword));
    }
  }, [userInfo, history, dispatch, pageNumber, searchKeyword]);

  const submitHandler = () => {
  }

  return (
    <>
    {loading ? (
      <Loader />
    ) : error ? (
      <Message variant='danger'>{error}</Message>
    ) : (
      <>
      <Row>
        <Col lg={4} xl={3}>
          <Card style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title>Showing results for:</Card.Title>
              <Form onSubmit={submitHandler}>
                <Form.Group>
                  <Form.Label>Keyword</Form.Label>
                  <Form.Control 
                    type='text'
                    name='keyword'
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control 
                    type='text'
                    name='city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Domain</Form.Label>
                  <Form.Control
                    type='text' 
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                  />
                </Form.Group>
                <Button type='submit' variant='info'>
                  Search
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={8} xl={9}>
          <Row className='businessListRow'>
            {businesses.map(business => (
              <Col key={business._id} className='businessListCol'>
                <Business business={business}/>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Paginate pages={pages} page={page} />
      </>
    )}
    </>
  )
}

export default BusinessesScreen
