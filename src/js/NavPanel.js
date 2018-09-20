import React from "react";
import gameState from "./gameState";
import {view} from "react-easy-state";

class LevelButton extends React.Component {

    handleClick = () => {
        // if (typeof this.props.LevelButtonClicked === 'function') {
        //     this.props.LevelButtonClicked(this.props.level);
        // }
        gameState.choosenLevel = this.props.level;
        console.log(gameState.choosenLevel);

    };

    render() {
        const {level} = this.props;
        return <div onClick={this.handleClick} className="nav_button"><span>{level.toUpperCase()}</span>
        </div>
    }
}

class NavPanel extends React.Component {

    render() {
        return <div className="nav_panel">
                <LevelButton  level="easy"/>
                <LevelButton  level="medium"/>
                <LevelButton  level="hard"/>

        </div>
    }
}

export default view(NavPanel);