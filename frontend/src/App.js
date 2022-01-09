import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import StudentProfileScreen from './screens/StudentProfileScreen.js';
import BusinessProfileScreen from './screens/BusinessProfileScreen.js';
import BusinessesScreen from './screens/BusinessesScreen';
import StudentSearchScreen from './screens/StudentSearchScreen';

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
          <Route path='/businesses' component={BusinessesScreen} />
          <Route path='/students' component={StudentSearchScreen} />
        </Container>
      </main>
    </Router>
  );
}

export default App;
