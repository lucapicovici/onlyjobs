import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import StudentProfileScreen from './screens/StudentProfileScreen.js';
import BusinessProfileScreen from './screens/BusinessProfileScreen.js';
import BusinessListScreen from './screens/BusinessListScreen';
import StudentSearchScreen from './screens/StudentSearchScreen';
import BusinessScreen from './screens/BusinessScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route exact path='/' component={HomeScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={StudentProfileScreen} />
          <Route path='/business-profile' component={BusinessProfileScreen} />
          <Route exact path='/businesses' component={BusinessListScreen} />
          <Route exact path='/businesses/page/:pageNumber' component={BusinessListScreen} />
          <Route exact path='/students' component={StudentSearchScreen} />
          <Route exact path='/businesses/:id' component={BusinessScreen} />
        </Container>
      </main>
    </Router>
  );
}

export default App;
