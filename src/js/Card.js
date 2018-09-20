import React from "react";

class Card extends React.Component {


    handleClick = () => {
        //if clicked - set isFlipped on true , send this card's id up to the board component
        //If cards with this id are matched or card is flipped - function is no longer executed

        const {className, matched} = this.props;
        const flipped = (className === 'card flip'
            || className === 'card card-medium flip'
            || className === 'card card-hard flip');

        if (matched === false && flipped === false) {

            if (typeof this.props.cardClicked === 'function') {
                this.props.cardClicked(this.props.id, this.props.index);
            }
        }
    };


    render() {

        const {imgSrc, className} = this.props;

        return (
            <div onClick={this.handleClick} className={className}>
                <img className='front_face' src={imgSrc} alt={imgSrc + " logo"}/>
                <div className='back_face_container'><img className='back_face' src="../../src/images/react7.svg" alt="react logo"/></div>
            </div>
        )
    };
}

export default Card