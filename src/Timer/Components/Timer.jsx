import React, { useEffect, useState } from 'react'
import '../Assets/Timer.css'

export default function Timer() {
    let [hour, sethour] = useState(0),
        [min, setmin] = useState(0),
        [sec, setsec] = useState(0),
        [isActive, setIsActive] = useState(false),
        [values, setValues] = useState(false)
    let count = 1;

    const Clock = (e) => {
        let x = e.target
        x.placeholder = ''
        if (x.value > 0) {
            if (x.id === 'hour') {
                sethour(x.value)
            } else if (x.id === 'min') {
                if (x.value > 59) {
                    alert("Max input value is 59 Minutes.")
                } else {
                    setmin(x.value)
                }
            } else if (x.id === 'sec') {
                if (x.value > 59) {
                    alert("Max input value is 59 Seconds.")
                } else {
                    setsec(x.value)
                }
            }
            setValues(true)
        }
        x.value = ''
    };
    let interval;
    useEffect(() => {
        if (isActive) {
            interval = setInterval(() => {
                if (sec > 0) {
                    setsec(sec -= 1)
                } else if (min > 0) {
                    setmin(min -= 1);
                    setsec(59);
                } else if (hour > 0) {
                    sethour(hour -= 1);
                    setmin(59);
                    setsec(59);
                } else {
                    setIsActive(false)
                    setValues(false)
                    clearInterval(interval);
                    return
                }
                count++
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [hour, min, sec, isActive])

    function Interval() {
        if (values) {
            setIsActive(true)
        } else {
            alert("Enter a value")
        }
    }
    function reset() {
        setIsActive(false)
        setValues(false)
        sethour(0)
        setmin(0)
        setsec(0)
    }

    return (
        <>
            <div id="MyClockDisplay" className="clock">{hour < 10 ? "0" + hour : hour}:{min < 10 ? "0" + min : min}:{sec < 10 ? "0" + sec : sec}</div>
            <div>
                <input type="number" id="hour" onFocus={(e) => e.target.placeholder = "Hour"} onBlur={(e) => Clock(e)} disabled={isActive} />
                <input type="number" id="min" onFocus={(e) => e.target.placeholder = "Minutes"} onBlur={(e) => Clock(e)} disabled={isActive} />
                <input type="number" id="sec" onFocus={(e) => e.target.placeholder = "Seconds"} onBlur={(e) => Clock(e)} disabled={isActive} />
            </div>
            <div>
                <button onClick={Interval}>
                    S T A R T
                    <div id="clip">
                        <div id="leftTop" className="corner"></div>
                        <div id="rightBottom" className="corner"></div>
                        <div id="rightTop" className="corner"></div>
                        <div id="leftBottom" className="corner"></div>
                    </div>
                    <span id="rightArrow" className="arrow"></span>
                    <span id="leftArrow" className="arrow"></span>
                </button>
                <button onClick={() => setIsActive(false)}>
                    S T O P
                    <div id="clip">
                        <div id="leftTop" className="corner"></div>
                        <div id="rightBottom" className="corner"></div>
                        <div id="rightTop" className="corner"></div>
                        <div id="leftBottom" className="corner"></div>
                    </div>
                    <span id="rightArrow" className="arrow"></span>
                    <span id="leftArrow" className="arrow"></span>
                </button>
                <button onClick={reset}>
                    R E S E T
                    <div id="clip">
                        <div id="leftTop" className="corner"></div>
                        <div id="rightBottom" className="corner"></div>
                        <div id="rightTop" className="corner"></div>
                        <div id="leftBottom" className="corner"></div>
                    </div>
                    <span id="rightArrow" className="arrow"></span>
                    <span id="leftArrow" className="arrow"></span>
                </button>
            </div>
        </>
    )
}