import React, { useState } from 'react'
import styles from './CardContribution.module.scss'
import { DateTime } from 'luxon'
import GetData from '../services/GetData'

const DayNames: any = {
  1: 'Mon',
  3: 'Wed',
  5: 'Fri'
}

function Cell({ ...props }) {

  let style = {
    backgroundColor: props.color
  };

  // console.log(props)

  let poptext = `${props.value === 0 ? 'No contributions' : props.value + ` contribution${props.value >1 ? 's' : ''}`} on ${props.date.toFormat('DD')}`

  return (
    <div
      className={styles.timeline_cells_cell}
      style={style}
      title={poptext}
    />
  )
}



function Month({ ...props }) {

  let date = props.startDate.plus({ days: props.index * 7 });
  let monthName = date.toFormat('MMM');

  if (props.showedMonths[0] !== monthName) props.showedMonths.shift()

  if (props.showedMonths.includes(monthName)) {

    return (
      <div className={`${styles.timeline_months_month} ${monthName}`} />
    )
  } else {

    props.showedMonths.push(monthName)

    return (
      <div className={`${styles.timeline_months_month} ${monthName}`}>
        {monthName}
      </div>
    )
  }

}


function WeekDay({ ...props }) {

  return (

    <div className={styles.timeline_weekdays_weekday}>
      {DayNames[props.index]}
    </div>
  )
}

function Timeline({ ...props }) {

  let startDate = props.range[0];
  let endDate = props.range[1];

  let days: number = endDate.diff(startDate, 'days').toObject().days;
  let cells = Array.from(new Array(days as number));
  let weekDays = Array.from(new Array(7));
  let months = Array.from(new Array(Math.floor(days / 7)));

  let min = Math.min(0, ...props.data.map((d: any) => d.value));
  let max = Math.max(...props.data.map((d: any) => d.value));

  let colorMultiplier = 1 / (max - min);

  let showedMonths: any[] = [];

  return (
    <div className={styles.timeline}>

      <h1>{props.title}</h1>
      <hr />

      <div className={styles.timeline_months}>
        {months.map((_, index) => <Month key={index} index={index} startDate={startDate} showedMonths={showedMonths} />)}
      </div>

      <div className={styles.timeline_body}>

        <div className={styles.timeline_weekdays}>
          {weekDays.map((_, index) => <WeekDay key={index} index={index} startDate={startDate} />)}
        </div>

        <div className={styles.timeline_cells}>
          {cells.map((_, index) => {

            let date = startDate.plus({ days: index });
            let dataPoint = props.data.find((d: any) => date.toISODate() === d.date.toISODate());
            let alpha = colorMultiplier * dataPoint.value;
            let color = props.colorFunc({ alpha });

            return (
              <Cell
                key={index}
                index={index}
                date={date}
                color={color}
                value={dataPoint.value}
              />
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default function CardContribution() {

  const totalDays: number = 369;

  // 1 year range
  const startDate = DateTime.now().minus({ days: totalDays - 1 });
  let dateRange = [startDate, DateTime.now().plus({ days: 1 })];

  let blankData = Array.from(new Array(totalDays)).map((_, index) => {
    return {
      date: startDate.plus({ days: index }),
      value: 0
    };
  });

  const [timelines, setTimelines] = useState<JSX.Element[] | undefined>([])
  
  
  GetData().then((listContributions:any) => {
    const itensContributions = listContributions.data.value.map((item:any) => ({...item, date: DateTime.fromISO(item.date)}))
    
    const timelineData = blankData.map((blankItem:any) => {
      const valueSP = itensContributions.filter((item:any) => item.date.hasSame(blankItem.date, 'day'))[0]?.value

      if(valueSP) {
        return {
          ...blankItem,
          value: valueSP
        }
      } else return blankItem

    });

    const categories = [...Array.from(new Set([...itensContributions.map((item:any) => item.category)]))]

    for (let category of categories) {

      const tm = <Timeline key={category} title={category} range={dateRange} data={timelineData} colorFunc={({ alpha }: any) => `rgba(3, 160, 3, ${alpha})`} />

      setTimelines(oldArray => oldArray?.length ? [...oldArray, tm] : [tm]);

    }

  })

  console.log(timelines)

  return (
    <>
    {timelines?.map((tm:any) => tm)}
    </>
  )
}
