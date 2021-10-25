let winingNumber = undefined;
let isChangedTime = false;
let showOutcome = false;
let showResultWindow = false;
let TimePressed = 0;
let IsWinOutcome = false;
let ResetGame = false;
let WinType = "No Win";
let WinningNumbers = {one: 0, two:0, three: 0};
const valueImages = [
    'assets/sym0.png',
    'assets/sym1.png',
    'assets/sym2.png',
    'assets/sym3.png',
    'assets/sym4.png',
    'assets/sym5.png',
    'assets/sym6.png',
    'assets/sym7.png',
    'assets/sym8.png',
    'assets/sym9.png'
]
const rollAudio = document.getElementById("rollAudio");
const loseAudio = document.getElementById("loseAudio");
const winAudio = document.getElementById("winAudio");
const pressAudio = document.getElementById("pressAudio");
const background = new Image();
const button = new Image();
const mystery = new Image();
const mysteryBackground = new Image();
const winImage = new Image();
const boxes = [
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image()
]

const onCanvasClickHandler = (e) => {

    const { x, y } = getMouseCoordinates(e);

    //checkBoxesEvent(x, y);
    checkButtonEvent(x, y);

}

const getMouseCoordinates = (e) => {
    let x;
    let y;
    if (e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
    }
    else {
        x = e.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    return { x, y }
}
const checkBoxesEvent = (x, y) => {
    boxes.forEach(box => {
        const r = 112;
        const dx = x - box.cx;
        const dy = y - box.cy;

        const d = Math.sqrt(dx * dx + dy * dy);

        if (d <= r) {
            box.changed = true;
            rollAudio.play();
        }
    });
}
const checkButtonEvent = (x, y) => {
    const buttonRadio = 90;
    const dx = x - button.cx;
    const dy = y - button.cy;
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d <= buttonRadio) {
        if(ResetGame == true)
            location.reload();
        pressAudio.play();
        isChangedTime = true;
        TimePressed =  Math.floor(Date.now()/1000) + 5;

        button.showResult = true;
        // if (button.showResult === true) {
        //     boxes.forEach(box => {
        //         box.src = valueImages[0];
        //         box.gameValue = 1;
        //     });
        //     winingNumber = undefined;
        //     button.showResult = false;

        //     loseAudio.pause();
        //     loseAudio.currentTime = 0;

        //     winAudio.pause();
        //     winAudio.currentTime = 0;
        // } else {
        //     button.showResult = true;
        //     const { max, min } = getResultRange();
        //     winingNumber = getWinningNumber(max, min);
        // }

    }
}
const initGameLoop = () => {
    button.src = 'assets/button.png';
    button.cx = 1073;
    button.cy = 454;
    button.showResult = false;
    mystery.src = 'assets/mystery.png';
    mystery.ang = 0;
    mysteryBackground.src = 'assets/blank.png'
    winImage.src = 'assets/win.png';
    background.src = 'assets/Background.png';
    boxes[0].src = 'assets/sym1.png';
    boxes[0].gameValue = 1;
    boxes[0].changed = false;
    boxes[0].cx = 396;
    boxes[0].cy = 251;

    boxes[1].src = 'assets/sym1.png';
    boxes[1].gameValue = 1;
    boxes[1].changed = false;
    boxes[1].cx = 672;
    boxes[1].cy = 250;

    boxes[2].src = 'assets/sym1.png';
    boxes[2].gameValue = 1;
    boxes[2].changed = false;
    boxes[2].cx = 938;
    boxes[2].cy = 252;

    // boxes[3].src = 'assets/sym1.png';
    // boxes[3].gameValue = 1;
    // boxes[3].changed = false;
    // boxes[3].cx = 938;
    // boxes[3].cy = 252;

    // boxes[4].src = 'assets/sym1.png';
    // boxes[4].gameValue = 1;
    // boxes[4].changed = false;
    // boxes[4].cx = 1210;
    // boxes[4].cy = 254;

    window.requestAnimationFrame(draw);
}
const draw = () => {

    boxes.forEach(box => {
        if (box.changed) {
            const newStuff = getNewImage(box.src);
            box.src = newStuff.image;
            box.gameValue = newStuff.value;
            box.changed = false;
        }
    });

    const canvas = document.getElementById('canvas');

    canvas.addEventListener("click", onCanvasClickHandler, false);
    var ctx = canvas.getContext('2d');

    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, canvas.width, canvas.height); // limpiar canvas

    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.strokeStyle = 'rgba(0,153,255,0.4)';
    ctx.save();
    ctx.translate(150, 150);

    var time = new Date();

    // La tierra
    // ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
    // ctx.translate(105, 0);
    // ctx.fillRect(0, -12, 50, 24); // Sombra

    ctx.drawImage(boxes[0], 130, -12, boxes[0].width * 0.9, boxes[0].height * 0.9);
    ctx.drawImage(boxes[1], 400, -12, boxes[0].width * 0.9, boxes[0].height * 0.9);
    ctx.drawImage(boxes[2], 670, -12, boxes[0].width * 0.9, boxes[0].height * 0.9);
    //ctx.drawImage(boxes[3], 670, -12, boxes[0].width * 0.9, boxes[0].height * 0.9);
    //ctx.drawImage(boxes[4], 940, -12, boxes[0].width * 0.9, boxes[0].height * 0.9);
    ctx.restore();

    if (button.showResult === false) {
        ctx.save();
        ctx.translate(670, 500);
        ctx.rotate(Math.PI / 180 * (mystery.ang += 5));
        ctx.drawImage(mystery, 0, 0);
        ctx.restore();

        ctx.save();
        ctx.translate(550, 400);
        ctx.scale(0.9, 0.9);
        mysteryBackground.src = 'assets/blank.png';
        ctx.drawImage(mysteryBackground, 0, 0);
        ctx.restore();
    } else {
        mysteryBackground.src = valueImages[winingNumber - 1];
        ctx.save();
        ctx.translate(550, 400);
        ctx.scale(0.9, 0.9);
        ctx.drawImage(mysteryBackground, 0, 0);
        ctx.restore();
    }

    ctx.save();
    ctx.translate(1000, 450);
    ctx.scale(0.9, 1);
    button.showResult === false ? button.src = 'assets/button.png' : button.src = 'assets/reset.png'
    ctx.drawImage(button, 0, 0);
    ctx.restore();
    // La luna
    ctx.save();
    //ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds());
    //ctx.translate(0, 28.5);
    //ctx.drawImage(moon, -3.5, -3.5);
    ctx.restore();

    ctx.restore();

    ctx.beginPath();
    //ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Órbita terrestre
    ctx.stroke();

    ctx.drawImage(background, 0, 0, 1400, 700);

    if(showOutcome && isChangedTime == false)
    {
        showOutcome = false;
       const url =  "http://localhost:5000/outcome/random";
       fetch(url).then((res, req) => {
           return res.json();
       }).then((data) => {
           WinningNumbers = {
               one: data.randomOne,
               two: data.randomTwo,
               three: data.randomThree
           }

           console.log("DATA", data);
           console.log(`BOXES ${boxes[0].gameValue} ${boxes[1].gameValue} ${boxes[2].gameValue}`);
           if(
                boxes[0].gameValue == data.randomOne &&
                boxes[1].gameValue == data.randomTwo &&
                boxes[2].gameValue == data.randomThree){
                    console.log("win");
                    IsWinOutcome = true;
                    showResultWindow = true;
           }
           else {
               let coincidences = 0;
               if(boxes[0].gameValue == data.randomOne)
                    coincidences++;
                if(boxes[1].gameValue == data.randomTwo)
                    coincidences++;
                if(boxes[2].gameValue == data.randomThree)
                    coincidences++;

                fetch(`http://localhost:5000/outcome/wintype?coincidences=${coincidences}`).then((res, req) => {
                    return res.json();
                }).then((data) => {
                    WinType = data.winType;
                    showResultWindow = true;
                });
               console.log("try again")
               IsWinOutcome = false;
           }

          

        }
       ).catch(error => console.log(error));

       //window.requestAnimationFrame(draw);
    }
    else{
        window.requestAnimationFrame(draw);
    }
}

const drawResultCanvas = () => {
    var canvas = document.getElementById('canvasShowResult');
    var ctx = canvas.getContext('2d');

    ctx.lineWidth = 17;
    ctx.lineCap = 'round';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff327d';


    function degToRad(degree) {
        var factor = Math.PI / 180;
        return degree * factor;
    }

    function getFruitNumber(index) {
        if(index === 0)
            return "Joker";
        if(index === 1)
            return "strawberry";
        if(index === 2)
            return "pineapple";
        if(index === 3)
            return "blackberry";
        if(index === 4)
            return "watermelon";
        if(index === 5)
            return "Lemon";
        
        return "strawberry"; 
    }

    function renderTime() {
        if (button.showResult === true && showResultWindow) {
            document.getElementById("canvasShowResult").style.visibility = "visible";
            //if (isWinner()) {
            if(IsWinOutcome){
                ctx.shadowColor = "#fde124";
                ctx.strokeStyle = '';
            }
            else {
                ctx.shadowColor = "#ff327d";
                ctx.strokeStyle = '#ff5551';
            }

            var now = new Date();
            var hours = 24;
            var minutes = 50;
            var seconds = now.getSeconds();
            var milliseconds = now.getMilliseconds();
            const newSeconds = seconds + (milliseconds / 1000);

            ctx.beginPath();
            ctx.arc(200, 200, 170, degToRad(270), degToRad(90));
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(200, 200, 140, degToRad(270), degToRad((newSeconds * 6) - 90));
            ctx.stroke();

            ctx.font = "30px Helvetica";
            ctx.fillStyle = '#28d1fa';
            ctx.fillText(`The Winning number: `, 100, 160);

            ctx.font = "20px Helvetica strong";
            ctx.fillStyle = '#620113';
            ctx.fillText(`${getFruitNumber(WinningNumbers.one)} ${getFruitNumber(WinningNumbers.two)} ${getFruitNumber(WinningNumbers.three)}`, 100, 200);

            ctx.font = "50px Helvetica";
            ctx.fillStyle = '#cc1615';

            //if (isWinner())
            if(IsWinOutcome)
                ctx.fillText("You Win !!!", 140, 250);
            else
                ctx.fillText(`${WinType}`, 140, 250);
        } else {
            document.getElementById("canvasShowResult").style.visibility = "hidden";
        }
    }

    setInterval(renderTime, 40);

}
const getWinningNumber = (max, min) => {
    return Math.trunc(Math.random() * (max - min) + min);
}
const getResultRange = () => {
    const values = boxes.map(x => x.gameValue);
    const max = Math.max.apply(Math, values);
    const min = Math.min.apply(Math, values);

    return { max, min }
}
const getNewImage = (currentImage) => {
    let randomIndex = getRandomInt(0, 5);
    while (currentImage.includes(valueImages[randomIndex])) {
        randomIndex = getRandomInt(0, 5);
    }

    return { image: valueImages[randomIndex], value: randomIndex };
}
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const isWinner = () => {
    return boxes.filter(x => x.gameValue === winingNumber).length > 0;
};

const finishGameAnimation = () => {
    let ang = 48;
    let angy = 7;
    let wii = 400;

    setInterval(() => {
        if (button.showResult === true) {
            document.getElementById("canvasShowResult").style.borderRadius = `${ang}% ${angy}%`;
            if (angy <= 48) {
                ang = ang - 0.05;
                angy = angy + 0.05;
            }
        }
        else {
            document.getElementById("canvasShowResult").style.borderRadius = "48% 7%"
            document.getElementById("canvasShowResult").style.width = "400px";
        }


    }, 10)
}

const playAudios = () => {
    setInterval(() => {
        if (!IsWinOutcome && winingNumber !== undefined)
            loseAudio.play();
        if (IsWinOutcome && winingNumber !== undefined)
            winAudio.play();
    }, 1000)

}

const rollMachine = () => {
    setInterval(() => {
        if(isChangedTime == true){
            console.log("TIME TO ", TimePressed);
            console.log("CURRENT TIME", Math.floor(Date.now()/1000));
            if(TimePressed < Math.floor(Date.now()/1000)) {    
                //console.log("")
                isChangedTime = false;
                showOutcome = true;
                ResetGame = true;
            }
            boxes.forEach(box => {
                box.changed = true;
                rollAudio.play();
            
            });
        }
    }, 100);
    
}

initGameLoop();
drawResultCanvas();
playAudios();
rollMachine();



