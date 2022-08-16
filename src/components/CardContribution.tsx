import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit'
import React from 'react'
import RectangleCont from './RectangleCont'
import { DateTime } from 'luxon'
import './CardContribution.css'

function Cell() {
  return <div className='timeline-cell'></div>
}

function TimeLime() {
  let cells = Array.from(new Array(365));

  return (
    <div className='timeline'>
      {cells.map((cell: any, index: any) => (
        <Cell key={index} />
      ))}
    </div>
  )
}

export default function CardContribution() {

  return (
    <TimeLime />
  )
}
