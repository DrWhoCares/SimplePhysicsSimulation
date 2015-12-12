function Ball(id, x, y, height) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.height = height;
	
	this.isAlive = 0;
};

Ball.prototype.destroy = function() {
	this.isAlive = 0;
	this.x = -100;
	this.y = -100;
};

Ball.prototype.drawSelf = function(ctx, img) {
	ctx.drawImage(img, this.x-10, this.y-10);
};

Ball.prototype.move = function(dt) {
	//Do all of the actual gravity calculation here
	
	//The last thing you must do is set the new X and Y you calculated
	//this.x;
	this.y += 5;
	if( this.y >= 540 ) {
		this.destroy();
	}
};