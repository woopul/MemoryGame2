import React from "react";
import NavPanel from "./NavPanel";
import Board from "./Board";
import {view} from "react-easy-state"
import gameState from "./gameState"


//Render board game with choosen level
class Game extends React.Component {


    handleReturn = () => {
        gameState.gameOver = false;
        gameState.choosenLevel = "";
    };


    render() {
        let renderElement;

        if (gameState.choosenLevel === "") {
            renderElement = <div>
                <h1 className='game_title'>The memory game</h1>
                <p className='choose_level'>choose level</p>
                <NavPanel/>
            </div>
        } else {
            renderElement = <div>
                <div className="return-btn" onClick={this.handleReturn}></div>
                <Board level={gameState.choosenLevel}/>
            </div>
        }

        return <div className="game_field">
            {renderElement}
            <div className='signature'>W.Opulski</div>
        </div>
    }
}

export default view(Game);