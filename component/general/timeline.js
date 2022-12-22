import React from 'react';

class Timeline extends React.Component {

    constructor() {
        super();
        this.state = {
            value: 0,
            percent: 0,
            color: "bg-primary",
            time: "00:00",
            firstTimePassed: "",
            secondTimePassed: "",
            thirdTimePassed: "",
        }
    }

    componentDidMount() {
        let timelineTimer = setInterval(
            function () {

                if (this.state.value == 300) {
                    this.setState({
                        firstTimePassed: 'first-time-passed'
                    })
                }

                if (this.state.value == 600) {
                    this.setState({
                        secondTimePassed: 'second-time-passed'
                    })
                }

                if (this.state.value == 900) {
                    this.setState({
                        thirdTimePassed: 'third-time-passed'
                    })
                }

                if (this.state.value >= 901) {
                    this.setState({
                        color: 'bg-success'
                    })
                    clearInterval(timelineTimer);
                } else {

                    let min = Math.floor(this.state.value / 60);
                    if (min < 10)
                        min = "0" + min;

                    let sec = Math.floor(this.state.value % 60);
                    if (sec < 10)
                        sec = "0" + sec;

                    this.state.value++;
                    this.setState({
                        percent: ((this.state.value + 1) * 100) / 900,
                        time: min + ':' + sec
                    })
                }
            }
                .bind(this),
            1000
        );
    }

    render() {

        return (
            <div className={'time-container'}>
                <span className="time__number-positioner">{this.state.time}</span>
                <div className="progress progress-timeline">
                    <div className={`progress-bar ${this.state.color}`} role="progressbar" style={{width: `${this.state.percent}%`}} aria-valuenow={this.state.value} aria-valuemin="0" aria-valuemax="900"></div>
                </div>
                <div className={`time-step ${this.state.firstTimePassed}`}></div>
                <div className={`time-step ${this.state.secondTimePassed}`}></div>
                <div className={`time-step ${this.state.thirdTimePassed}`}></div>
            </div>
        )
    }
}

export default Timeline;