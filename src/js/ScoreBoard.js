import React from "react";
import gameState from "./gameState";

class ScoreBoard extends React.Component {
    state = {
        miliseconds: 0,
        minutes: 0,
        seconds: 0,
    };

    componentDidMount() {
        this.startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.idInterval);
    }

    startTimer = () => {
        let minutes = 0,
            seconds = 0,
            miliseconds = 0;

        this.idInterval = setInterval(() => {
            miliseconds += 5;

            if (miliseconds >= 95) {
                miliseconds = 0;
                seconds++;
            }

            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            this.setState({
                miliseconds: miliseconds,
                seconds: seconds,
                minutes: minutes,
            })
        }, 50)
    };

    //clear interval if gameOver or returned
    gameOverClearInterval = () => {
        if (gameState.gameOver) {
            const {miliseconds, seconds, minutes} = this.state;
            const minutesToPrint = ('0' + minutes).slice(-2),
                secondsToPrint = ('0' + seconds).slice(-2),
                milisecondsToPrint = ("0" + miliseconds).slice(-2);

            clearInterval(this.idInterval);

            gameState.timeScore = `${minutesToPrint}:${secondsToPrint}:${milisecondsToPrint}`
            gameState.moves = this.props.moves;
        }
    };

    render() {
        const {minutes, seconds, miliseconds} = this.state;

        this.gameOverClearInterval();

        return <div className="score-board">
            <p>{('0' + minutes).slice(-2)}:{('0' + seconds).slice(-2)}:{("0" + miliseconds).slice(-2)}</p>
            <p>moves: {this.props.moves}</p>
        </div>
    }


}

export default ScoreBoard;