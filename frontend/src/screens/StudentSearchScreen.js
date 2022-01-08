import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const StudentSearchScreen = ({ history }) => {
  // Business's page for searching students
  
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [userInfo, history]);

  return (
    <div>
      List of students - Business's page
    </div>
  )
}

export default StudentSearchScreen
