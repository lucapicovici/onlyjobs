import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listBusinesses } from '../store/actions/businessActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Paginate from '../components/Paginate';
import Business from '../components/Business';
import { SEARCH_CRITERIA } from '../store/constants/businessConstants';

const BusinessListScreen = ({ match, history }) => {
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

  const searchCriteria = useSelector(state => state.searchCriteria);
  const { 
    keyword: keywordSearch, 
    city: citySearch, 
    domain: domainSearch
  } = searchCriteria;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(listBusinesses(pageNumber, keywordSearch, citySearch, domainSearch));

      if (keywordSearch) setKeyword(keywordSearch);
      if (citySearch) setCity(citySearch);
      if (domainSearch) setDomain(domainSearch);
    }
  }, [userInfo, history, dispatch, pageNumber, keywordSearch, citySearch, domainSearch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({ 
      type: SEARCH_CRITERIA,
      payload: {
        keyword,
        city,
        domain
      }
    });
    localStorage.setItem('searchCriteria', JSON.stringify({ keyword, city, domain }));
    history.push('/businesses');  // Set pageNumber back to 1
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
                <Form.Group className='mb-3'>
                  <Form.Label>Keyword</Form.Label>
                  <Form.Control 
                    type='text'
                    name='keyword'
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>City</Form.Label>
                  <Form.Control 
                    as="select"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value=''>Select city...</option>
                    <option value='Cluj-Napoca'>Cluj-Napoca</option>
                    <option value='Bucuresti'>Bucuresti</option>
                    <option value='Timisoara'>Timisoara</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Domain</Form.Label>
                  <Form.Control 
                    as="select"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                  >
                    <option value=''>Select domain...</option>
                    <option value='computer-science'>Computer Science</option>
                    <option value='construction-engineering'>Construction Engineering</option>
                    <option value='health'>Health</option>
                    <option value='marketing'>Marketing</option>
                  </Form.Control>
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
            {businesses.length === 0 && <h4>No results.</h4>}
            {businesses.map(business => (
              <Col key={business.user} className='businessListCol'>
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

export default BusinessListScreen
