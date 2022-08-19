import React from 'react'
import axios from 'axios'
import infoJson from '../__private/info.json'

export default function GetData() {

  let data = {
    Site: infoJson.Site,
    Method: "GET",
    URI: `_api/web/lists/${infoJson.List}/items?$select=category,date,value&$top=5000`,
    Headers: {Accept: 'application/json;odata=nometadata'}
  }

  return axios.post(infoJson.URIFlow, data)  
}
