var numSquers = 9;
var colors = [];
var pickedColor;
var mode = "dec";
var pkt = 0;
var gameOver = false;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector("#reset");
var levelBtn = document.querySelectorAll(".levelBtn");
var modeBtn = document.querySelectorAll(".modeBtn");
var result = document.querySelector("#result");
const SHADOW = "0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1)";



init();

function init() {
	levelBtnInit();
	modeBtnInit();
	squarsInit();

	resetDisplay();
}

resetBtn.addEventListener("click", function () {
	resetDisplay();
});

function squarsInit(){
	for (let i = 0; i < squares.length ; i++){
		squares[i].style["background-color"] = colors[i];

		squares[i].addEventListener("click" , function () {
			if(!gameOver){
				let clickedColor;
				(mode === "dec") ? clickedColor = this.style["background-color"] : clickedColor = rgb2hex(this.style["background-color"]);
				if(clickedColor === pickedColor){
					messageDisplay.textContent = "Correct!";
					resetBtn.textContent = "Play again?";
					gameOver = true;
					changeColors(pickedColor);
					h1.style["background-color"] = pickedColor;
					pkt += 10;
					result.textContent = pkt;
				} else {
					this.style["background-color"] = "#232323";
					this.style["box-shadow"] = "";
					messageDisplay.textContent = "Try Again!";
					pkt -= 2;
					result.textContent = pkt;
				}
			}
		});
	} 
}

function levelBtnInit(){
	for(let i = 0; i < levelBtn.length; i++){
		levelBtn[i].addEventListener("click", () => {
			for (var j = 0; j < levelBtn.length; j++) {
				levelBtn[j].classList.remove("selected");
			}
			levelBtn[i].classList.add("selected");
			switch(levelBtn[i].textContent){
				case "Easy": {
					numSquers = 3;
				}; break;
				case "Medium": {
					numSquers = 6;
				}; break;
				case "Hard": {
					numSquers = 9;
				}; break;
			}	
			resetDisplay();		
		});
	}
}

function modeBtnInit(){
	for (let i = 0; i < modeBtn.length; i++) {
		modeBtn[i].addEventListener("click", () => {
			for (var j = 0; j < modeBtn.length; j++) {
				modeBtn[j].classList.remove("selected");
			}
			modeBtn[i].classList.add("selected");
			(modeBtn[i].textContent === "Hexadecimal") ? mode="hex" : mode="dec";
			resetDisplay();
		});
	}
}

function resetDisplay(){
	gameOver = false;
	(mode === "dec") ? colors = pickRandomColorsDec(numSquers) : colors = pickRandomColorsHex(numSquers) ;
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	resetBtn.textContent = "New Game";
	h1.style["background-color"] = "steelblue";
	messageDisplay.textContent = "";
	for(let i = 0; i < squares.length ; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style["background-color"] = colors[i];
			squares[i].style["box-shadow"] = SHADOW;
		} else {
			squares[i].style.display = "none";
		}
	}
}

function changeColors(color){
	for (let i = 0; i < squares.length; i++){
		squares[i].style["background-color"] = color;
		squares[i].style["box-shadow"] = SHADOW;
	}
}

function pickColor(){
	let random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function pickRandomColorsDec(number){
	let array = [];
	for (let i = 0; i < number; i++) {
		array.push(randomColorDec());
	}
	return array;
}

function pickRandomColorsHex(number){
	let array = [];
	for (let i = 0; i < number; i++) {
		array.push(randomColorHex());
	}
	return array;
}

function randomColorDec(){
	//red
	let r = Math.floor(Math.random() * 255);
	//green
	let g = Math.floor(Math.random() * 255);
	//blue
	let b = Math.floor(Math.random() * 255);
	//rgb(r,g,b)
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function randomColorHex(){
	hex = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
	let color = "#";
	for(let i = 0; i < 6; i++){
		let index = Math.floor(Math.random() * 16 );
		color += hex[index];
	}
	return color;
}

function rgb2hex(rgb) {
    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;

    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}