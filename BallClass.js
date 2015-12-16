function Ball(id, x, y, height) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.height = height;
	this.fps = 0;
	this.dt = 0;
	this.isFalling = true;
	this.isUpward = false;
	this.bounceVelocity = 0;
	this.coeOfRestitution = .9;
	this.temp = 0;
	this.ynot = this.y;
	this.ynotInv = 0;
	
	this.isAlive = 0;
};

//Reset ball values
Ball.prototype.destroy = function() {
	this.isAlive = 0;
	this.x = -100;
	this.y = -100;
	this.fps = 0;
	this.dt = 0;
	this.ynot = -100;
	this.ynotInv = 0;
	this.isFalling = true;
};

Ball.prototype.drawSelf = function(ctx, img) {
	//Draw from top left, since x and y are CENTER of ball
	ctx.drawImage(img, this.x-10, this.y-10);
};

//Determines the height of the ball while falling the first time
Ball.prototype.falling = function() 
{	
	//Sets the first ynot
	if(this.ynot == -100)
	{
		this.ynot = 540 - this.y;
		this.ynotInv = this.y;
	}
	this.dt += .015625;
	this.y = (this.ynotInv + (8*9.8 * this.dt * this.dt));
};

//Determines the height of the ball after the first bounce
Ball.prototype.upward = function() 
{
	this.dt -= .015625;
	this.y = (this.ynotInv + (8*9.8 * this.dt * this.dt));
};

Ball.prototype.bounce = function() 
{		
	this.temp = Math.sqrt(9.8*32*this.ynot); //Calculates the velocity right before Impact with the ground
	this.bounceVelocity = this.temp*this.coeOfRestitution; //Calculates the velocity of the ball coming off the ground
	this.ynot = (this.bounceVelocity * this.bounceVelocity / (19.6*2*8)); //determines the max height of the balls bounce
	this.ynotInv = 540 - this.ynot;
	this.dt = Math.sqrt(this.ynot/(9.8*8));
	this.temp = 0;
};

Ball.prototype.move = function() {
	//Do all of the actual gravity calculation here
	if(this.isFalling == true) {
		this.falling();
	}
	//Calculate bounce back height and velocity
	if(this.isBouncing == true) {
		this.bounce();
		this.isBouncing = false;
		this.isUpward = true;
	}
	//Move ball upwards
	if(this.isUpward == true) {
		this.upward();
	}
	//Reach the apex of a given bounce back
	if(this.y <= this.ynotInv) {
		if(this.isFalling == false) {
			this.dt = 0;
		}
		this.isFalling = true;
		this.isUpward = false;
	}
	
	//Calculate a bounce
	if(this.y >= 540) {
		this.isFalling = false;
		this.isBouncing = true;
	}
};