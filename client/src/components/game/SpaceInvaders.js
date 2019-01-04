import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import data from "./enemies.json";

class SpaceInvaders extends Component {
  constructor(props) {
    super(props);
    this.c = React.createRef();
    this.state = {
      endGame: this.props.gameState
    };
  }

  componentDidMount() {
    const canvas = this.c.current;
    const ctx = canvas.getContext("2d");
    const cH = ctx.canvas.height;
    const cW = ctx.canvas.width;

    //  Background stars ------------------------------------------------------------------------------------------------

    const stars = [];

    function addStar() {
      const x = Math.floor(Math.random() * cW + 1);
      const y = Math.floor(Math.random() * cH);
      const s = Math.floor(Math.random() * 10 + 1);
      if (stars.length < 1000) {
        stars.push({ x: x, y: y, s: s });
      }
    }
    function spaceFly(clr) {
      addStar();
      addStar();
      addStar();
      addStar();
      addStar();

      for (let i = 0; i < stars.length; i++) {
        ctx.fillStyle = clr;
        ctx.beginPath();
        //arc(x, y, radius, start-angle, endAngle, anticlockwise)
        ctx.arc(
          stars[i].x,
          (stars[i].y += stars[i].s * 0.03),
          stars[i].s * 0.09,
          0,
          Math.PI * 2,
          false
        );
        ctx.fill();
        if (stars[i].y > cH) {
          stars.splice(i, 1);
        }
      }
    }

    // Enemy objects ------------------------------------------------------------------------------------------------------

    const colors = ["#134b06", "#7c8f00", "#5d002c", "#81625d"];

    const yTen = data.yTen;
    const yForty = data.yForty;
    const ySeventy = data.ySeventy;
    const yHundred = data.yHundred;
    const yHundredThirty = data.yHundredThirty;
    const yHundredSixty = data.yHundredSixty;
    const yHundredNinety = data.yHundredNinety;
    const yTwoHundredTwenty = data.yTwoHundredTwenty;
    const yTwoHundredFifty = data.yTwoHundredFifty;

    let speed = 0.5;
    let enemyWidth = 43;
    let enemyColumns = 9;
    const xDeterminer =
      (cW - enemyColumns * enemyWidth) / (enemyColumns + 1) / cW;
    const xAdd = xDeterminer + enemyWidth / cW;

    let enemiesTemplate = [];
    let enemiesMap = [];
    enemiesMap.push.apply(enemiesMap, yTen);

    let enemies = [];

    function pushEnemies(level) {
      if (level === "two") {
        enemiesMap = enemiesTemplate.concat(yTen, yForty);
      }
      if (level === "three") {
        enemiesMap = enemiesTemplate.concat(yTen, yForty, ySeventy, yHundred);
      }
      if (level === "four") {
        enemiesMap = enemiesTemplate.concat(
          yTen,
          yForty,
          ySeventy,
          yHundredThirty,
          yHundredSixty
        );
      }
      if (level === "five") {
        enemiesMap = enemiesTemplate.concat(
          yTen,
          yForty,
          ySeventy,
          yHundredThirty,
          yHundredSixty,
          yHundredNinety
        );
      }
      if (level === "six") {
        enemiesMap = enemiesTemplate.concat(
          yTen,
          yForty,
          ySeventy,
          yHundredThirty,
          yHundredSixty,
          yHundredNinety
        );
      }
      if (level === "seven") {
        enemiesMap = enemiesTemplate.concat(
          yTen,
          yForty,
          ySeventy,
          yHundredThirty,
          yHundredSixty,
          yTwoHundredTwenty,
          yTwoHundredFifty
        );
      }
      if (level === "eight") {
        enemiesMap = enemiesTemplate.concat(
          yTen,
          yForty,
          ySeventy,
          yHundred,
          yHundredThirty,
          yHundredSixty,
          yHundredNinety
        );
      }
      if (level === "nine") {
        enemiesMap = enemiesTemplate.concat(
          yTen,
          yForty,
          ySeventy,
          yHundred,
          yHundredThirty,
          yHundredSixty,
          yHundredNinety,
          yTwoHundredTwenty
        );
      }
      if (level === "ten") {
        enemiesMap = enemiesTemplate.concat(
          yTen,
          yForty,
          ySeventy,
          yHundred,
          yHundredThirty,
          yHundredSixty,
          yHundredNinety,
          yTwoHundredTwenty,
          yTwoHundredFifty
        );
      }
    }

    function createEnemies() {
      enemies = enemiesMap.map(obj => ({
        x: cW * (xDeterminer + xAdd * obj.x),
        y: obj.y,
        w: enemyWidth,
        h: 15,
        clr: colors[Math.floor(Math.random() * colors.length)]
      }));
    }

    function Enemies(level) {
      for (var i = 0; i < enemies.length; i++) {
        const e = enemies[i];
        ctx.fillStyle = e.clr;
        ctx.fillRect(e.x, (e.y += speed), e.w, e.h);
        if (e.y >= cH) {
          lose(level);
        }
      }
    }

    // player object and render -----------------------------------------------------------------------------------------

    const playerOne = { x: cW * 0.5, y: cH - 40, w: 40, h: 20, dir: "" };
    function playerRender(level) {
      const p = playerOne;
      ctx.fillStyle = "#3e6f9d";
      ctx.fillRect(p.x, p.y, p.w, p.h);
      if (p.dir === "left" && p.x > -20) {
        p.x -= 10;
      }
      if (p.dir === "right" && p.x < cW - 20) {
        p.x += 10;
      }
      if (p.dir === "up" && p.y > -10) {
        p.y -= 5;
      }
      if (p.dir === "down" && p.y < cH - 10) {
        p.y += 5;
      }
      crashDetect(p.x, p.y, p.w, p.h, level);
    }

    // missile shot detection and projection ----------------------------------------------------------------------------

    let missiles = [];
    let shots = 0;
    let tempScore = 0;

    function Missile(level) {
      for (var i = 0; i < missiles.length; i++) {
        const m = missiles[i];
        ctx.fillStyle = "#ff5a00";
        ctx.fillRect(m.x, (m.y -= 8), m.w, m.h);
        // if (m.y < 0) {
        //   missiles.splice(i, 1);
        // }
        hitDetect(missiles[i], i, level);
      }
    }

    const hitDetect = (m, mi, level) => {
      for (var i = 0; i < enemies.length; i++) {
        const e = enemies[i];
        if (
          m.x + m.w >= e.x &&
          m.x < e.x + e.w &&
          m.y + m.h >= e.y &&
          m.y < e.y + e.h
        ) {
          missiles.splice(mi, 1);
          enemies.splice(i, 1);
          enemiesTemplate.splice(i, 1);
          tempScore += Math.round(10 - 0.025 * e.y);
          document.getElementById("score").innerHTML = "Score: " + tempScore;
        }
        if (enemies.length === 0) {
          win(level);
        }
      }
    };

    // crash detection and explosion ---------------------------------------------------------------------------------------

    function crashDetect(x, y, w, h, level) {
      for (var i = 0; i < enemies.length; i++) {
        const e = enemies[i];
        if (
          x + w - 3 >= e.x &&
          x + 3 < e.x + e.w &&
          y + h - 3 >= e.y &&
          y + 3 < e.y + e.h
        ) {
          explosion(x + w * 0.5, y + h * 0.5);
          lose(level);
        }
      }
    }

    const negPos = [-1, 1];
    const shrapnel = [];
    const fireColor = [
      "rgba(255, 203, 5, 1)",
      "rgba(211, 84, 0, .9)",
      "rgba(248, 148, 6, 1)",
      "rgba(255, 203, 5, 1)",
      "rgba(242, 38, 19, 1)",
      "rgba(207, 0, 15, 1)"
    ];

    function makeShrapnel(x, y) {
      shrapnel.push({
        x: x,
        y: y,
        r: Math.random() * 3 + 1,
        xD: Math.random() * negPos[Math.floor(Math.random() * negPos.length)],
        yD: Math.random() * negPos[Math.floor(Math.random() * negPos.length)],
        clr: fireColor[Math.floor(Math.random() * fireColor.length + 0.1)]
      });
    }

    function explosion(x, y) {
      function explode() {
        makeShrapnel(x, y);
        makeShrapnel(x, y);
        makeShrapnel(x, y);
        makeShrapnel(x, y);
        for (var i = 0; i < shrapnel.length; i++) {
          const s = shrapnel[i];
          ctx.fillStyle = s.clr;
          ctx.beginPath();
          ctx.arc(
            (s.x += s.xD),
            (s.y += s.yD),
            s.r * 0.3,
            0,
            Math.PI * 2,
            false
          );
          ctx.fill();
          if (s.x < 0) {
            shrapnel.splice(i, 1);
          }
          if (s.x > cW) {
            shrapnel.splice(i, 1);
          }
          if (s.y < 0) {
            shrapnel.splice(i, 1);
          }
          if (s.y > cH) {
            shrapnel.splice(i, 1);
          }
        }
      }

      setInterval(explode, 5);
    }

    // animation functions -----------------------------------------------------------------------------------------------
    function animate(colour, level) {
      ctx.clearRect(0, 0, cW, cH);
      spaceFly(colour);
      playerRender(level);
      Missile(level);
      Enemies(level);
    }

    let starColor = "rgba(255,255,255,0.75";
    let levelDeterminer = "one";

    let animateInit = setInterval(
      () => animate(starColor, levelDeterminer),
      30
    );

    let animateInitTwo = "";
    let animateInitThree = "";
    let animateInitFour = "";
    let animateInitFive = "";
    let animateInitSix = "";
    let animateInitSeven = "";
    let animateInitEight = "";
    let animateInitNine = "";
    let animateInitTen = "";

    // Movement controls ------------------------------------------------------------------------------------------------

    document.addEventListener("keyup", function(event) {
      let keyStop = event.keyCode;
      if (keyStop !== 32) {
        playerOne.dir = "";
      }
      if (keyStop === 32) {
        missiles.push({
          x: playerOne.x + playerOne.w * 0.5,
          y: playerOne.y,
          w: 3,
          h: 7
        });
        shots = shots + 1;
      }
    });

    document.addEventListener("keydown", function(event) {
      const keyNum = event.keyCode;
      if (keyNum === 37) {
        playerOne.dir = "left";
      }

      if (keyNum === 39) {
        playerOne.dir = "right";
      }

      if (keyNum === 38) {
        playerOne.dir = "up";
      }
      if (keyNum === 40) {
        playerOne.dir = "down";
      }
    });

    window.addEventListener("load", createEnemies());

    // lose and win functions -------------------------------------------------------------------------------------------

    const lose = level => {
      this.props.updateScore(tempScore);
      if (level === "one") {
        clearInterval(animateInit);
      }
      if (level === "two") {
        clearInterval(animateInitTwo);
      }
      if (level === "three") {
        clearInterval(animateInitThree);
      }
      if (level === "four") {
        clearInterval(animateInitFour);
      }
      if (level === "five") {
        clearInterval(animateInitFive);
      }
      if (level === "six") {
        clearInterval(animateInitSix);
      }
      if (level === "seven") {
        clearInterval(animateInitSeven);
      }
      if (level === "eight") {
        clearInterval(animateInitEight);
      }
      if (level === "nine") {
        clearInterval(animateInitNine);
      }
      if (level === "ten") {
        clearInterval(animateInitTen);
      }
      ctx.fillStyle = "red";
      ctx.font = "bold 60px Arial, sans serif";
      ctx.fillText("You lose!", cW * 0.2, cH * 0.3, 400);
      ctx.fillStyle = "white";
      ctx.font = "bold 40px Arial, sans serif";
      ctx.fillText(`You scored ${tempScore} points`, cW * 0.2, cH * 0.45);
      ctx.fillStyle = "blue";
      ctx.font = "bold 30px Arial, sans serif";
      ctx.fillText("Press enter to continue", cW * 0.2, cH * 0.55, 400);

      document.addEventListener("keydown", event => {
        const key = event.keyCode;
        if (key === 13) {
          setTimeout(
            this.setState({
              endGame: true
            }),
            1000
          );
        }
      });
    };

    const win = level => {
      ctx.font = "bold 40px Arial, sans serif";
      ctx.fillStyle = "red";
      ctx.fillText(`Level ${level} complete!`, cW * 0.5 - 200, cH * 0.4, 400);
      ctx.fillStyle = "blue";
      ctx.font = "bold 30px Arial, sans serif";
      ctx.fillText("Press enter to continue", cW * 0.5 - 200, cH * 0.6, 400);
      missiles.splice(0, missiles.length);

      // level initialisation --------------------------------------------------------------------------------------

      if (level === "one") {
        clearInterval(animateInit);
        speed += 0.08;
        document.addEventListener("keydown", function(event) {
          const key = event.keyCode;
          if (key === 13 && levelDeterminer === "one") {
            levelDeterminer = "two";
            pushEnemies(levelDeterminer);
            animateInitTwo = setInterval(
              () => animate(starColor, levelDeterminer),
              30
            );
            createEnemies();
          }
        });
      }

      // level Three initialisation ---------------------------------------------------------------------------------------

      if (level === "two") {
        clearInterval(animateInitTwo);
        speed += 0.08;
        document.addEventListener("keydown", function(event) {
          const key = event.keyCode;
          if (key === 13 && levelDeterminer === "two") {
            levelDeterminer = "three";
            pushEnemies(levelDeterminer);
            animateInitThree = setInterval(
              () => animate(starColor, levelDeterminer),
              30
            );
            createEnemies();
          }
        });
      }

      // level Four initialisation ----------------------------------------------------------------------------------------
      if (level === "three") {
        clearInterval(animateInitThree);
        speed += 0.08;
        document.addEventListener("keydown", function(event) {
          const key = event.keyCode;
          if (key === 13 && levelDeterminer === "three") {
            levelDeterminer = "four";
            pushEnemies(levelDeterminer);
            animateInitFour = setInterval(
              () => animate(starColor, levelDeterminer),
              30
            );
            createEnemies();
          }
        });
      }

      // level Five initialisation ----------------------------------------------------------------------------------------

      if (level === "four") {
        clearInterval(animateInitFour);
        speed += 0.08;
        document.addEventListener("keydown", function(event) {
          const key = event.keyCode;
          if (key === 13 && levelDeterminer === "four") {
            levelDeterminer = "five";
            pushEnemies(levelDeterminer);
            animateInitFive = setInterval(
              () => animate(starColor, levelDeterminer),
              30
            );
            createEnemies();
          }
        });
      }

      // level Six initialisation ----------------------------------------------------------------------------------------

      if (level === "five") {
        clearInterval(animateInitFive);
        speed += 0.08;
        starColor = "rgba(207, 0, 15, 0.75)";
        document.addEventListener("keydown", function(event) {
          const key = event.keyCode;
          if (key === 13 && levelDeterminer === "five") {
            levelDeterminer = "six";
            pushEnemies(levelDeterminer);
            animateInitSix = setInterval(
              () => animate(starColor, levelDeterminer),
              30
            );
            createEnemies();
          }
        });
      }

      // level Seven initialisation ---------------------------------------------------------------------------------------

      if (level === "six") {
        clearInterval(animateInitSix);
        speed += 0.08;
        document.addEventListener("keydown", function(event) {
          const key = event.keyCode;
          if (key === 13 && levelDeterminer === "six") {
            levelDeterminer = "seven";
            pushEnemies(levelDeterminer);
            animateInitSeven = setInterval(
              () => animate(starColor, levelDeterminer),
              30
            );
            createEnemies();
          }
        });
      }

      // level Eight initialisation ----------------------------------------------------------------------------------------

      if (level === "seven") {
        clearInterval(animateInitSeven);
        speed += 0.08;
        document.addEventListener("keydown", function(event) {
          const key = event.keyCode;
          if (key === 13 && levelDeterminer === "seven") {
            levelDeterminer = "eight";
            pushEnemies(levelDeterminer);
            animateInitEight = setInterval(
              () => animate(starColor, levelDeterminer),
              30
            );
            createEnemies();
          }
        });
      }

      // level Nine initialisation -----------------------------------------------------------------------------------------

      if (level === "eight") {
        clearInterval(animateInitEight);
        speed += 0.08;
        document.addEventListener("keydown", function(event) {
          const key = event.keyCode;
          if (key === 13 && levelDeterminer === "eight") {
            levelDeterminer = "nine";
            pushEnemies(levelDeterminer);
            animateInitNine = setInterval(
              () => animate(starColor, levelDeterminer),
              30
            );
            createEnemies();
          }
        });
      }

      // level Ten initialisation -----------------------------------------------------------------------------------------

      if (level === "nine") {
        clearInterval(animateInitNine);
        speed += 0.08;
        document.addEventListener("keydown", function(event) {
          const key = event.keyCode;
          if (key === 13 && levelDeterminer === "nine") {
            levelDeterminer = "ten";
            pushEnemies(levelDeterminer);
            animateInitTen = setInterval(
              () => animate(starColor, levelDeterminer),
              30
            );
            createEnemies();
          }
        });
      }

      if (level === "Ten") {
        clearInterval(animateInit);
        levelDeterminer = "win";
        document.addEventListener("keydown", event => {
          const key = event.keyCode;
          if (key === 13 && levelDeterminer === "win") {
            ctx.clearRect(0, 0, cW, cH);
            ctx.fillText(
              "You are victorious! Congratulations!",
              cW * 0.5 - 200,
              cH * 0.4,
              400
            );
            setTimeout(
              this.setState({
                endGame: true
              }),
              2000
            );
          }
        });
      }
    };
  }

  render() {
    if (this.state.endGame === true) {
      return <Redirect exact to="/game/input" />;
    }
    return (
      <div className="game-screen">
        <canvas
          id="game-canvas"
          ref={this.c}
          width="700"
          height="500"
          style={{ background: "black" }}
        />
        <h3 id="score">Score: 0</h3>
      </div>
    );
  }
}

export default SpaceInvaders;
