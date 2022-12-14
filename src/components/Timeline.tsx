import { DateTime } from 'luxon';
import React from 'react'
import Cell from './Cell';
import styles from './Components.module.scss'
import Month from './Month';
import WeekDay from './WeekDay';

interface Props {
  data: any;
  title: any;
  colorFunc: any;
}

const totalDays: number = 369;

const startDate = DateTime.now().minus({ days: totalDays - 1 });
const dateRange = [startDate, DateTime.now().plus({ days: 1 })];

export default function Timeline(props: Props) {

    let startDate = dateRange[0];

    let cells = Array.from(new Array(Math.floor(totalDays)));
    let weekDays = Array.from(new Array(7));
    let months = Array.from(new Array(Math.floor(totalDays / 7)));
  
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
