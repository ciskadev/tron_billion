import React, { Component } from 'react';

export default class Timer extends React.Component {
    constructor() {
        super();
        this.state = { time: {}, seconds: 1111 };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        // this.setSeconds = this.setSeconds.bind(this);
        this.countDown = this.countDown.bind(this);
        //  this.setSeconds();
        this.startTimer();

    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
    }
    // setSeconds() {
    //     this.setState({ seconds: this.props.seconds });
    // }
    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }


    startTimer() {
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds == 0) {
            clearInterval(this.timer);
        }
    }

    render() {
        return (
            <div>
                {this.state.time.h < 10 ? ` 0${this.state.time.h}` : this.state.time.h}
                 : {this.state.time.m < 10 ? ` 0${this.state.time.m}` : this.state.time.m}
                 : {this.state.time.s < 10 ? ` 0${this.state.time.s}` : this.state.time.s}
            </div>
        );
    }
} 