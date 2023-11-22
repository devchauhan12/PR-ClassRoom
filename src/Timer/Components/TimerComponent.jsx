import React, { useState, useRef } from 'react';

const TimerComponent = () => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    let interval

    const startTimer = () => {
        interval = setInterval(handleCountdown, 1000);
    };

    const handleCountdown = () => {
        let sec = seconds;
        let min = minutes;
        
        // setSeconds(sec == 0 ? sec : sec - 1);
        
        
        if (min >= 1 && sec == 0) {
            sec = 60;
            setMinutes(min - 1);
        } else {
            sec -= 1
            setSeconds(sec)
            console.log(seconds);
        }

        if (min == 0 && sec == 0) {
            clearInterval(interval);
        }

    };

    // const stopTimer = () => {
    //     clearInterval(interval);
    // };

    // const resetTimer = () => {
    //     setSeconds(0);
    //     setMinutes(0);
    // };

    return (
        <div>
            <label>
                Minutes:
                <input type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
            </label>
            <label>
                Seconds:
                <input type="number" value={seconds} onChange={(e) => setSeconds(e.target.value)} />
            </label>
            <button onClick={startTimer}>Start</button>
            {/* <button onClick={stopTimer}>Stop</button> */}
            {/* <button onClick={resetTimer}>Reset</button> */}
        </div>
    );
};

export default TimerComponent;
