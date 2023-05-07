import React, { useState, useEffect } from "react";
import "../assets/stylesheets/style.css";
import background from "../assets/images/bg.jpg";

const risks = [
    { level: "Low Risk", range: [-25, 100] },
    { level: "Moderate Risk", range: [-100, 1000] },
    { level: "High Risk", range: [-500, 2500] },
    { level: "Severe Risk", range: [-3000, 5000] },
];

const currentDate = new Date().toLocaleString();

function MoneyButtonGame() {
    const [money, setMoney] = useState(500);
    const [chancesLeft, setChancesLeft] = useState(10);
    const [betRecord, setBetRecord] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        if (chancesLeft === 0) {
            setGameOver(true);
        }
    }, [chancesLeft]);

    const handleBet = (range, level) => {
        const betAmount = Math.floor(Math.random() * (range[1] - range[0] + 1) + range[0]);
        setMoney(money + betAmount);
        if (chancesLeft > 0) {
            setChancesLeft(chancesLeft - 1);
            const currentDate = new Date();
            setBetRecord([...betRecord, { level, betAmount, money: money + betAmount, chancesLeft: chancesLeft - 1, date: currentDate.toLocaleString() }]);
        }
    };

    const handleReset = (event) => {
        event.preventDefault();
        setMoney(500);
        setChancesLeft(10);
        setBetRecord([]);
        setGameOver(false);
    };

    return (
        <div style={{ 
            backgroundImage: `url(${background})`,
            height: '100vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <div className="container">
                <header>
                    <h1>Your money: ${money}</h1>
                    <form onSubmit={handleReset}>
                        <input type="submit" id="reset" value="Reset Game" />
                    </form>
                    <p id='chances'>Chances left: {chancesLeft}</p>
                </header>
                <main>
                    {risks.map((risk, index) => (
                        <div key={index} className="risk">
                            <p className="emphasis">{risk.level}</p>
                            <form className="button" onSubmit={(event) => {
                                event.preventDefault();
                                handleBet(risk.range, risk.level);
                            }}>
                                <input type="submit" value="Bet" className="bet" disabled={gameOver} />
                            </form>
                            <p className="range">by {risk.range[0]} up to {risk.range[1]}</p>
                        </div>
                    ))}
                </main>
                <footer>
                    <p className="game_host">Game Host:</p>
                    <div className="host_says">
                        <p>{currentDate} | Welcome to the Money Button Game!</p>
                        {betRecord.map((bet, index) => (
                            <p key={index} style={{ color: bet.betAmount > 0 ? "green" : "red" }}>
                                {bet.date} | You clicked '{bet.level}', value is ${bet.betAmount}. Current money is ${bet.money} with {bet.chancesLeft} chances left.
                            </p>
                        ))}
                        {gameOver && <strong>GAME OVER!!!</strong>}
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default MoneyButtonGame;
