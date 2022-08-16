import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit'
import React from 'react'
import './TableMonth.module.scss'

interface Props {
  program: string
}

export default function TableMonth(props: Props) {
  return (
    <MDBTable borderless>
      <MDBTableHead>
        <caption>{props.program}</caption>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
        </tr>
      </MDBTableBody>
    </MDBTable>
  )
}
