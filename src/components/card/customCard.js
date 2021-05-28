import React, { useEffect, useState } from 'react';
import '../shared-styles/styles.css';

/**************** Import styles ****************/
/**************** Import Custom Components ****************/

/**************** Import images ****************/
import imgThumbUp from '../assets/img/thumbs-up.svg';
import imgThumbDown from '../assets/img/thumbs-down.svg';

/**************** Import metadata ****************/
/**************** Import external libraries ****************/
import swal from 'sweetalert';
import moment from 'moment';


function CustomCard(props)
{
    console.log(props.optionView)
    /*************** Variables ***************/
    const adressImage = require(`../assets/img/people/${props.picture}`);

    /*************** States ***************/

    const [percenTotalVotes, setPercenTotal] = useState(0);
    const [percenVotesPositive, setPercenPositive] = useState(0);
    const [percenVotesNegative, setPercenNegative] = useState(0);

    const [votesPositive, setVotesPositive] = useState(0);
    const [votesNegative, setVotesNegative] = useState(0);

    const [thumbUpSelected, settThumbUpSelected] = useState(false);
    const [thumbDownSelected, setThumbDownSelected] = useState(false);
    
    const [showVoteOption, setShowVoteOption] = useState(false);



    /************ UseEffect *************/
    useEffect(()=>
    {
        
        var positiveLocalSt = localStorage.getItem(`${props.name} Posi`);
        var negativeLocalSt = localStorage.getItem(`${props.name} Nega`);

        if(positiveLocalSt === null && negativeLocalSt === null)
        {
            var hundredPercen = props.votes.positive + props.votes.negative;
            var auxPercenPositive = (props.votes.positive/hundredPercen)*100;
            var auxPercenNegative = (props.votes.negative/hundredPercen)*100;

            setPercenTotal(hundredPercen);
            setPercenNegative(auxPercenNegative);
            setPercenPositive(auxPercenPositive);

            setVotesPositive(props.votes.positive);
            setVotesNegative(props.votes.negative);

            document.getElementById(`contPercenLike${props.index}`).style.width = `${percenVotesPositive}%`;
            document.getElementById(`contPercenDis${props.index}`).style.width = `${percenVotesNegative}%`;

            localStorage.setItem(`${props.name} Posi`, props.votes.positive);
            localStorage.setItem(`${props.name} Nega`, props.votes.negative);
        }
        else
        {
            var hundredPercen = parseInt(positiveLocalSt) + parseInt(negativeLocalSt);
            var auxPercenPositive = (positiveLocalSt/hundredPercen)*(100);
            var auxPercenNegative = (negativeLocalSt/hundredPercen)*(100);

            setPercenTotal(hundredPercen);
            setPercenNegative(auxPercenNegative);
            setPercenPositive(auxPercenPositive);

            setVotesPositive(positiveLocalSt);
            setVotesNegative(negativeLocalSt);

            // console.log(auxPercenNegative, props.name, "nega");
            // console.log(auxPercenPositive, props.name, "posi");
            
            document.getElementById(`contPercenLike${props.index}`).style.width = `${percenVotesPositive}%`;
            document.getElementById(`contPercenDis${props.index}`).style.width = `${percenVotesNegative}%`;
        }
    
    },[percenVotesPositive, percenVotesNegative, props.optionView])

    //////////////// operational functions
    const resetValuesAndStyle = () =>
    {
        setShowVoteOption(false);
    }
    const addPositive = () =>
    {
        document.getElementById(`buttonAdd${props.index}`).style.border = "2px solid white";
        document.getElementById(`buttonSubs${props.index}`).style.border = "none";

        settThumbUpSelected(true);
        setThumbDownSelected(false);
    }
    const subsPositive = () =>
    {
        document.getElementById(`buttonSubs${props.index}`).style.border = "2px solid white";
        document.getElementById(`buttonAdd${props.index}`).style.border = "none";

        settThumbUpSelected(false);
        setThumbDownSelected(true);
    }
    
    const handleVote = async () =>
    {
        var auxSumPosi = parseInt(localStorage.getItem(`${props.name} Posi`));
        var auxSumNega = parseInt(localStorage.getItem(`${props.name} Nega`));

        if(thumbUpSelected && !thumbDownSelected)
        {
            auxSumPosi++;
            document.getElementById(`buttonSubs${props.index}`).style.border = "none";
            document.getElementById(`buttonAdd${props.index}`).style.border = "none";
            swal("Extraordinary!", "Thank you for voting, your answer has been sent." , "success")
            .then(()=>{

                var hundredPercen = auxSumNega + auxSumPosi;
                var auxPercenPositive = (auxSumPosi/hundredPercen)*100;
                var auxPercenNegative = (auxSumNega/hundredPercen)*100;

                setPercenNegative(auxPercenNegative)
                setPercenPositive(auxPercenPositive)

                document.getElementById(`contPercenLike${props.index}`).style.width = `${percenVotesPositive}%`;
                document.getElementById(`contPercenDis${props.index}`).style.width = `${percenVotesNegative}}%`;
                
                localStorage.setItem(`${props.name} Posi`, auxSumPosi);
                setShowVoteOption(!showVoteOption);
                setVotesPositive(auxSumPosi);
                setThumbDownSelected(false);
                settThumbUpSelected(false);
            });
        }
        else if(!thumbUpSelected && thumbDownSelected)
        {
            auxSumNega++
            document.getElementById(`buttonSubs${props.index}`).style.border = "none";
            document.getElementById(`buttonAdd${props.index}`).style.border = "none";
            swal("Extraordinary!", "Thank you for voting, your answer has been sent." , "success")
            .then(()=>{
                var hundredPercen = auxSumNega + auxSumPosi;
                var auxPercenPositive = (auxSumPosi/hundredPercen)*100;
                var auxPercenNegative = (auxSumNega/hundredPercen)*100;

                setPercenNegative(auxPercenNegative)
                setPercenPositive(auxPercenPositive)

                document.getElementById(`contPercenLike${props.index}`).style.width = `${percenVotesPositive}%`;
                document.getElementById(`contPercenDis${props.index}`).style.width = `${percenVotesNegative}}%`;
                
                localStorage.setItem(`${props.name} Nega`, auxSumNega);
                setShowVoteOption(!showVoteOption);
                setVotesNegative(auxSumNega);
                setThumbDownSelected(false);
                settThumbUpSelected(false);

            });
        }
        else if(!thumbUpSelected && !thumbDownSelected)
        {
            swal("Oops!", "First select an option for this section. \n What's your opinion of "+props.name+"?","error")
        }
    }
    const renderVoteOption = () =>
    {
        return( showVoteOption ?      
                <div className="contVoteAgain" >              
                    <div className={"buttonVoteAgain "+props.optionView+"ButtonVote"} onClick = {() => { resetValuesAndStyle() }} >
                        <p className = "textVoteNow">Vote Again</p>
                    </div>
                </div>
            : 
                <>
                    <a className={"buttonLike "+props.optionView+"ButtonThumb"} id = {`buttonAdd${props.index}`} onClick = { () => addPositive()} >
                        <img className = "thumbButtonVotes" src={imgThumbUp} />
                    </a>
                    <a className={"buttonDis "+props.optionView+"ButtonThumb"} id = {`buttonSubs${props.index}`}  onClick = { () => subsPositive()}>
                        <img className = "thumbButtonVotes" src={imgThumbDown} />
                    </a>
                    <a  onClick = {() => { handleVote() }} className={"buttonVote "+props.optionView+"ButtonVote"}>
                        <p className = "textVoteNow">Vote Now</p>
                    </a>
                </>
                
        )
    }
    //////////////// functions returning components
    const renderButtonRate = () =>
    {
        return( percenVotesNegative > 50 ? 
            <div id = {`buttonRate${props.index}`} className={"buttonRateDis "+props.optionView+"ButtonRateDis"}>
                <img className = "thumbButtonVotes" src={imgThumbDown} />
            </div>

            :

            <div id = {`buttonRate${props.index}`} className={"buttonRateLike "+props.optionView+"ButtonRateLike"}>
                <img className = "thumbButtonVotes" src={imgThumbUp} />
            </div>
        );
    }

    return(
            <div
            style = {{
                backgroundImage: `url(${adressImage.default})`,
            }}
            className = {"contCard "+props.optionView+"ContCard"}>
                <div className={"contRowsCard "+props.optionView+"ContRowsCard"}>
                    {/* CONTAINER OF LIKES, IMG, TITLE, DESCRIPTION AND VOTES OPTIONS */}
                    <div className={"contFirtRow "+props.optionView+"ContFirtRow"}>
                        <div className={"contRate "+props.optionView+"ContRate"}>
                            {renderButtonRate()}
                            
                        </div>
                        <div className = {"fatherContVotesAndInfo "+props.optionView+"FatherContVotesAndInfo"}>
                            <div className={"contTitleDescri "+props.optionView+"ContTitleDescri"}>
                                <div className={"contTitleCard "+props.optionView+"ContTitleCard"}>
                                    <h1 className = "tituloCard">{props.name}</h1>
                                </div>
                                <div className={"contDescri "+props.optionView+"ContDescri"} >
                                    <p className = "descriCard">{props.description}</p>
                                </div>
                                
                            </div>
                            
                            <div className={"contVotes "+props.optionView+"ContVotes"}>
                                <div className={"contLastUpdated "+props.optionView+"ContLastUpdated"}>
                                    <p className={"textLastUpdated "+props.optionView+"TextLastUpdated"}>{moment(props.lastUpdated, moment.ISO_8601).fromNow()+" in " +props.category}</p>
                                </div>
                                <div className={"contButtons "+props.optionView+"ContButton"}>
                                    {renderVoteOption()}
                                </div>
                                
                            </div>
                        </div>
                       
                        
                    </div>

                    {/* CONTAINER OF VOTES PERCENTAGE */}
                    <div className={"contSecondRow "+props.optionView+"ContSecondRow"}>
                        <div className = "contPercenLike" id = {`contPercenLike${props.index}`}>
                            <img className = "thumbButtonPercen" src={imgThumbUp}/>
                            <p className = {"textPercent "+props.optionView+"TextPercent"}>{percenVotesPositive.toFixed(2)}%</p>

                        </div>

                        <div className = "contPercenDis" id = {"contPercenDis"+props.index}>
                            <img className = "thumbButtonPercen" src={imgThumbDown}/>
                            <p className = {"textPercent "+props.optionView+"TextPercent"}>{percenVotesNegative.toFixed(2)}%</p>

                        </div>
                    </div>
                </div>
                
            </div>
        
    );
}
export default CustomCard