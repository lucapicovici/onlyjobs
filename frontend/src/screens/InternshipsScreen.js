import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const InternshipsScreen = ({ history }) => {
  // Student's page for searching internships

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [userInfo, history]);

  return (
    <div>
      List of available internships - student's page
    </div>
  )
}

export default InternshipsScreen
