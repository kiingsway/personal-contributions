import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBContainer } from 'mdb-react-ui-kit';
import React from 'react';
import './App.css';
import CardContribution from './components/CardContribution';

function App() {
  return (
    <MDBContainer breakpoint='sm' className='p-4'>
      <CardContribution/>
    </MDBContainer>
  );
}

export default App;
