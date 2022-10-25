import Vector from './Vector.js';

class Ball{
    constructor(ctx, x, y, color){
        this.ctx = ctx;
        this.location = new Vector(x,y);
        this.velocity = new Vector(1, 1.3); 
        this.color = color;
        this.size = 16;
    }
    draw(){
        /*this.x += this.velocityX;
        this.y += this.velocityY;*/
        this.location.add(this.velocity);
        this.checkCollision();

        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.location.x, this.location.y, this.size,0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }
    checkCollision(){
        //boundaries of building
        if (this.location.x > 1920 - (this.size / 2)) {
            this.velocity.x = -Math.abs(this.velocity.x);
        }
        if (this.location.x < 0 + this.size / 2) {
            this.velocity.x = Math.abs(this.velocity.x);
        }
        if (this.location.y > 1090 - (this.size / 2)) {
            this.velocity.y = -Math.abs(this.velocity.y);
        }
        if (this.location.y < 0 + this.size / 2) {
            this.velocity.y = Math.abs(this.velocity.y);
        }
        //boundaries windows

    }
}

export default Ball;