import React, { useEffect, useState } from 'react';
import './App.css';
import GetData from './services/GetData';
import { DateTime } from 'luxon';
import Timeline from './components/Timeline';
import infoJson from './__private/info.json'
import axios from 'axios'


const totalDays: number = 369;

const startDate = DateTime.now().minus({ days: totalDays - 1 });
const dateRange = [startDate, DateTime.now().plus({ days: 1 })];

const blankData = Array.from(new Array(totalDays)).map((_, index) => {
  return {
    date: startDate.plus({ days: index }),
    value: 0
  };
});

function App() {

  const [timelines, setTimelines] = useState<any>([]);
  const [contributions, setContributions] = useState<any[]>([]);

  useEffect(() => {

    const repos = 'https://api.github.com/users/kiingsway/events';
    const repos2 = 'https://api.github.com/graphql'


    const opts = {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + infoJson.SecretGithub },
      data: {
        query: `user(login: "orn0t") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  weekday
                  date
                }
              }
            }
          }`
      }
    }

    axios.get('https://skyline.github.com/kiingsway/2022.json').then((r:any) => console.log(r))

    fetch('https://skyline.github.com/kiingsway/2022.json').then((r:any) => console.log(r))

    // axios({
    //   method: 'post',
    //   url: repos2,
    //   headers: opts.headers,
    //   data: opts.data
    // }).then((r:any) => console.log(r.data))

    


    /*fetch(repos2, opts)
      .then((d: any) => d.json())
      .then((r: any) => {
        console.log(r)
        // for(let repo of r) {
          // fetch(repos + '/' + repo.name + '/statuses').then((r:any) => console.log(r))

        // }
      })*/

    GetData().then((listContributions: any) => {

      const itensContributions = listContributions.data.value.map((item: any) => ({ ...item, date: DateTime.fromISO(item.date) }))
      const categories = [...Array.from(new Set([...itensContributions.map((item: any) => item.category)]))];
      setTimelines(categories);

      for (let category of categories) {

        const timelineData = blankData.map((blankItem: any) => {
          const valueSP = itensContributions.filter((item: any) => item.date.hasSame(blankItem.date, 'day') && item.category === category)[0]?.value

          if (valueSP) return { ...blankItem, value: valueSP, category: category }
          else return { ...blankItem, category: category }

        });

        setContributions(prevCont => [...prevCont, ...timelineData])
      }
    });





  }, [])

  const colorFunc: any = {
    Duo: ({ alpha }: any) => `rgba(3, 160, 3, ${alpha})`
  }

  return (
    <>
      {
        timelines.map((tm: any) => <Timeline key={tm} title={tm} data={contributions.filter(item => item.category === tm)} colorFunc={colorFunc[tm]} />)
      }
    </>
  );
}

export default App;


