import {store} from 'react-easy-state';

const gameState = store({
    choosenLevel:"",

    gameOver: false,

    timeScore:"",
    moves:"",
});

export default gameState;