let gameSeq=[];
let userSeq=[];

let btns=["red","yellow","green","purple"];

let started=false;
let level=0;

// Load from localStorage
let highestScore = localStorage.getItem("highestScore") || 0;
let gamesPlayed = localStorage.getItem("gamesPlayed") || 0;


let h2=document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started==false){
        console.log("game is started");
        started=true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    //random btn choose
    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx){

    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }
    else{
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        }, 150);
        // Update scores and storage
        if (level > highestScore) {
            highestScore = level;
            localStorage.setItem("highestScore", highestScore);
        }

        gamesPlayed++;
        localStorage.setItem("gamesPlayed", gamesPlayed);

        // Save score to leaderboard
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push(level);

    // Sort and keep top 5 scores
    leaderboard.sort((a, b) => b - a);
    leaderboard = leaderboard.slice(0, 5);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));


        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to restart.<br>Highest Score: <b>${highestScore}</b> | Games Played: <b>${gamesPlayed}</b>`;

        // Show leaderboard
    let leaderboardHTML = "<h3>🏆 Top 5 Scores:</h3><ol>";
    leaderboard.forEach(score => {
    leaderboardHTML += `<li>${score}</li>`;
    });
    leaderboardHTML += "</ol>";
    h2.innerHTML += leaderboardHTML;

        reset();
    }
}

function btnPress() {
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}


let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}


// --- MOBILE FRIENDLY START BUTTON SUPPORT ---

// Create a start button dynamically for mobile users
const mobileStartBtn = document.createElement("button");
mobileStartBtn.innerText = "Start Game";
mobileStartBtn.id = "mobileStartBtn";
mobileStartBtn.style.padding = "10px 20px";
mobileStartBtn.style.fontSize = "1.2rem";
mobileStartBtn.style.margin = "20px auto";
mobileStartBtn.style.display = "none";
mobileStartBtn.style.cursor = "pointer";
document.body.insertBefore(mobileStartBtn, document.querySelector(".btn-container"));

// If on mobile, show the start button
if (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
    mobileStartBtn.style.display = "inline-block";
}

// Hook up click event for mobile start
mobileStartBtn.addEventListener("click", function () {
    if (!started) {
        started = true;
        levelUp();
        mobileStartBtn.style.display = "none";
    }
});
