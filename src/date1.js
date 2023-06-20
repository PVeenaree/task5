import React, { useState } from 'react';
import moment from 'moment';
import './date.css';

const AgeCalculator = () => {
  const [dob, setDob] = useState('');
  const [age, setAge] = useState({ years: 0, months: 0 });
  const [showAge, setShowAge] = useState(false);
  const [dateWarning, setDateWarning] = useState(false);

  const calculateAge = () => {
    const currentDate = moment();
    const birthDate = moment(dob);

    if (!birthDate.isValid()) {
      setDateWarning(true);
      setShowAge(false);
      setDob(''); // Reset the input field
      return;
    }

    if (birthDate.isAfter(currentDate)) {
      setDateWarning(true);
      setShowAge(false);
      setDob(''); // Reset the input field
      return;
    }

    const yearsDiff = currentDate.diff(birthDate, 'years');
    birthDate.add(yearsDiff, 'years');
    const monthsDiff = currentDate.diff(birthDate, 'months');

    setAge({ years: yearsDiff, months: monthsDiff });
    setShowAge(true);
    setDateWarning(false);
  };

  const displayAge = () => {
    if (age.years < 1) {
      const months = age.months === 1 ? 'month' : 'months';
      return <p>You are {age.months} {months} old!</p>;
    } else {
      return (
        <h4>
          You are {age.years} years {age.months} months old!
        </h4>
      );
    }
  };

  return (
    <div className="div1">
      <h1>Age Calculator</h1>
      <h3>Enter your DOB</h3>
      {dateWarning && (
        <p className="warning">Please enter a valid date!!!</p>
      )}
      <input
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        className="inputField"
      />
      <br />
      <button onClick={calculateAge} className="calculateButton">
        Calculate Age
      </button>
      {showAge && <div>{displayAge()}</div>}
    </div>
  );
};

export default AgeCalculator;