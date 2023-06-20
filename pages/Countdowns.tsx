import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Countdown = () => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
    const now = moment();
    const newYear = moment('2023-07-11');

    const duration = moment.duration(newYear.diff(now));

    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    setCountdown(`${days} d : ${hours} h : ${minutes} m : ${seconds} s`);
    }, 1000);
    return () => clearInterval(interval);

  }, []);

  return (
    <div>
      <h2 style={{color: 'red'}}>{countdown}</h2>
    </div>
  );
};

export default Countdown;
