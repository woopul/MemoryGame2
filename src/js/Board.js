import React from "react";
import FadeIn from "react-fade-in";
import Card from "./Card";
import ScoreBoard from "./ScoreBoard";
import GameOver from "./GameOver";
import {view} from "react-easy-state";
import gameState from "./gameState";

//Generate board of cards depends of a level from props
class Board extends React.Component {
    state = {
        loaded:false,

        isFlipped: false,           // stores information if card was clicked
        firstClickedId: '',         // stores index of first clicked card
        numOfCardPairsToGenerate:0, // depends of level ( 6, 8, 15);

        flippedClassName:'',        // depends of level - responsible for sizing
        unflippedClassName:'',
        boardClassName:'',

        level: this.props.level,

        cards: [],                  // contain objects with generated card properties
        guessedCardsList: [],           // stores list of card indexes which were match
        temporaryFlippedCards: [],  // stores list of temp flipped cards (max 2)

        start:false,
        moves: 0,

    };

    //list of card imagaes used later with generating images
    easyImgSrcsTest = ["css3.svg", "angular.svg", "aurelia.svg", "backbone.svg", "ember.svg",
        "js-badge.svg", "vue.svg", "pinguin.svg", "nodejs2.svg", "visual-basic.svg"];

    // easyImgSrcs = ["css3.svg", "angular.svg", "aurelia.svg", "backbone.svg", "ember.svg",
    //     "js-badge.svg", "vue.svg", "pinguin.svg", "nodejs2.svg", "visual-basic.svg"];
    easyImgSrcs = [];
    mediumImgSrcs = [];
    hardImgSrcs = [];


    //generate and asign cards || generating table of source images for medium and hard level
    componentDidMount() {
        //put img sources of card itno the table
        for (let i = 1; i <= 50; i++) {
            const mediumSrc = `../../src/images/medium/(${i}).svg`;
            this.mediumImgSrcs.push(mediumSrc);

            const hardSrc = `../../src/images/hard/(${i}).svg`;
            this.hardImgSrcs.push(hardSrc);

        }

        this.easyImgSrcs = this.easyImgSrcsTest.map(src =>{
            return `../../src/images/${src}`
        });

        this.setState({
            cards: this.generateCards(this.props.level),
            loaded:true,
        });
    }


    //1st click - asign id of clicked card to temp var in state | change var isFlipped on true
    //2st click - check if id of second card is the same as first one
    //if true - save this id in the array of guessedId's - make further click on them not possible
    //at the end reset tempCardValue and isFlipped parameter
    handleCardClick = (currClickId, key) => {
        const {guessedCardsList, firstClickedId, isFlipped, temporaryFlippedCards} = this.state;

        this.setState({
            start: true,
        });

        //1st click
        if (isFlipped === false) {
            //set state on that it is flipped, store flipped card id, stored flipped card key in the memomry
            this.setState({
                isFlipped: true,
                firstClickedId: currClickId,
                temporaryFlippedCards: [key],
            });

        } else {    //2nd click
            //check if  flipped cards are the same
            if (firstClickedId === currClickId) {
                this.setState({
                    guessedCardsList: [...guessedCardsList, currClickId],
                    moves: this.state.moves+1,
                });
            }

            if (temporaryFlippedCards.length < 2) {
                this.setState({
                    temporaryFlippedCards: [...temporaryFlippedCards, key],
                    moves: this.state.moves+1,
                });
            }

            setTimeout(() => {
                this.resetTempValues();
            }, 500)
        }
    };

    resetTempValues = () => {
        this.setState({
            firstClickedId: "",
            isFlipped: false,
            temporaryFlippedCards: [],
        });
    };

    //Generate and shuffle cards
    generateCards = level => {
        let numOfCardPairsToGenerate; //depend of level - 6/10/16  easy/medium/hard
        let maxValueToIterate;        // for loop which choose sources from these in the array depend of level
        let imgSourceList;            // array of img sources, diffrent for each level

        let cardsArr = [];            // array of card objects with {imgSrc, id}
        let randomGenerated = [];     //arr of rundom generated numbs, for checking if chosen one were chosen before

        // level='easy';
        //depends of level sets parameters
        switch (level) {
            case 'easy':
                numOfCardPairsToGenerate = 6;
                maxValueToIterate = this.easyImgSrcs.length;
                imgSourceList = this.easyImgSrcs;

                this.setState({
                    numOfCardPairsToGenerate: 6,
                    flippedClassName:'card flip',        // depends of level - responsible for sizing
                    unflippedClassName:'card',
                    boardClassName:'board',
                });
                break;

            case 'medium':
                numOfCardPairsToGenerate = 10;
                maxValueToIterate = this.mediumImgSrcs.length;
                imgSourceList = this.mediumImgSrcs;

                this.setState({
                    numOfCardPairsToGenerate: 10,
                    flippedClassName:'card card-medium flip',   // depends of level - responsible for sizing
                    unflippedClassName:'card card-medium',
                    boardClassName:'board-medium',
                });
                break;

            case 'hard':
                numOfCardPairsToGenerate = 16;
                maxValueToIterate = this.hardImgSrcs.length;
                imgSourceList = this.hardImgSrcs;

                this.setState({
                    numOfCardPairsToGenerate: 16,
                    flippedClassName:'card card-hard flip',   // depends of level - responsible for sizing
                    unflippedClassName:'card card-hard',
                    boardClassName:'board-hard',
                });
                break;
        }
        //----------------------GENERATING CARDS ------------------------------
        for (let i = 0; i < numOfCardPairsToGenerate; i++) {
            let randomNum;

            // select (6 || 10 || 16) different random nums, where max value is picture arr length
            do {
                randomNum = Math.floor(Math.random() * (maxValueToIterate - 1) + 1)
            } while (randomGenerated.indexOf(randomNum) >=0 );

            randomGenerated.push(randomNum);

            const card = {
                id: i,
                imgSource: imgSourceList[randomNum],
            };

            cardsArr = [...cardsArr, card, card];
        }

        this.shuffle(cardsArr);

        return cardsArr;
    };

    shuffle = cardList => {
        for (let i = cardList.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [cardList[i - 1], cardList[j]] = [cardList[j], cardList[i - 1]];
        }
    };

    //flip clicked card if it's id is on the list on temporary flipped
    flipCard = cardKey => {
        const {temporaryFlippedCards,unflippedClassName,flippedClassName} = this.state;

        return  temporaryFlippedCards.indexOf(cardKey) >= 0 ? flippedClassName : unflippedClassName;
    };

    //check if current genereted card id is on the list of guessed
    isGuessed = cardId => {
        return this.state.guessedCardsList.indexOf(cardId) >= 0;
    };

    render() {

        const {guessedCardsList, boardClassName, flippedClassName, moves, start,loaded, numOfCardPairsToGenerate} = this.state;
        //create all of cards based on genereted before cards parameters array


        //for stoping interval in scoreboard
        if(loaded && guessedCardsList.length === numOfCardPairsToGenerate){
            gameState.gameOver = true;
        }

        const cardList = this.state.cards.map((card, index) => {
            //check if this card has flipped pair
            const isGuessed = this.isGuessed(card.id);
            //set flip state depends of if it's guessed, flipped or not flipped
            const className = isGuessed ? flippedClassName : this.flipCard(index);

            return <Card cardClicked={this.handleCardClick}
                         key={index}
                         index={index}
                         id={card.id}
                         level={this.props.level}
                         matched={isGuessed}
                         className={className}
                         imgSrc={card.imgSource}/>
        });

        return <div>
            {gameState.gameOver && <GameOver level={this.props.level}/>}
            {start && <FadeIn transitionDuration={800}> <ScoreBoard moves={moves}/></FadeIn>}
            <section className={boardClassName}>
                {cardList}
            </section>
        </div>
    }
}


export default view(Board);