var CANVAS_ID = "canvas";
var MAX_BALLS = 10;

//IMAGE SOURCES
BKG_IMG_SRC   = 'bkg.png';
BALL_IMG_SRC  = 'ball.png';

//### START OF SIMULATION OBJECT
var Simu = {
	isInitialized:   0,
	canvas:          null,
	ctx:             null,
	balls:           [],
	//Time Variables
	curTime:         0,
	prevTime:        0,
	deltaTime:       0,
	totalTime:       0,
	//Mouse Controls Variables
	mousePositionX:  0,
	mousePositionY:  0,
	mouseLeft:       0,
	mouseRight:      2,
	//Image Variables
	bkgImg:          null,
	ballImg:         null,
	bkgImgLoaded:    0,
	ballImgLoaded:   0,
	
	Init: function() {
		this.canvas = document.getElementById(CANVAS_ID);
		this.ctx = this.canvas.getContext("2d");
		
		//BKG
		this.bkgImg = new Image();
		this.bkgImg.onload = function()  { Simu.bkgImgLoaded = 1; };
        this.bkgImg.src = BKG_IMG_SRC;
		//Ball
		this.ballImg = new Image();
		this.ballImg.onload = function() { Simu.ballImgLoaded = 1; };
        this.ballImg.src = BALL_IMG_SRC;
		
		//Ball Init
		for( var i = 0; i < MAX_BALLS; i++ ) {
			this.balls[i] = new Ball(i, -100, -100, 0);
		}
		
		this.isInitialized = 1;
	},
	
	DrawScreen: function() {
		this.ctx.fillStyle	= "#333333";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		
		//BACKGROUND
		if( this.bkgImgLoaded != 0 ) {
			this.ctx.drawImage(this.bkgImg, 0, 0);
		}
		
		if( this.ballImgLoaded != 0 ) {
			//BALLS
			for( var i = 0; i < this.balls.length; i++ ) {
				if( this.balls[i].isAlive === 1 ) {
					this.balls[i].drawSelf(this.ctx, this.ballImg);
				}
			}
		}
	},
	
	ProcessMouseDown: function(e) {
		
	},
	
	ProcessMouseUp: function(e) {
		
	},
	
	Update: function() {
		//TIME CALCULATION
		newDate  = new Date();
		this.prevTime = this.curTime;
        this.curTime  = newDate.getTime() / 1000.0;  // end time in seconds
        this.deltaTime = (this.curTime - this.prevTime) // delta time in seconds
		if( this.deltaTime > 30 ) {
			this.deltaTime = 0;
		}
		this.totalTime += this.deltaTime; //Total playtime in seconds
		
		//BALL MOVEMENT
		for( var i = 0; i < this.balls.length; i++ ) {
			if( this.balls[i].isAlive === 1 ) {
				this.balls[i].move();
			}
		}
		
		//DRAW SCREEN
		this.DrawScreen();
	},
};
//### END OF SIMULATION OBJECT

//EVENT HANDLERS
window.addEventListener("mousedown", doMouseDown, false);
window.addEventListener("mouseup", doMouseUp, false);

function doMouseDown() {
	
};

function doMouseUp() {
	
};

window.onload = function() {
	Simu.Init();
	runSimu();
};

function runSimu() {
	if( Simu.isInitialized === 1 ) {
		Simu.Update();
	}
	requestAnimationFrame(runSimu);
};