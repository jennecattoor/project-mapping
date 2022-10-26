import Vector from './Vector.js';

const windowBorders = [[82, 184], [282, 384], [480, 582], [702, 804], [912, 1014], [1122, 1224], [1338, 1440], [1542, 1644], [1742, 1844]]
const margin = 10;
class Ball{
    constructor(ctx, window, windowBoolean, x, y, color){

        this.ctx = ctx;
        this.location = new Vector(x,y);
        this.velocity = new Vector(2, 2.3); 
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
        if (this.location.y > 1000 - (this.size / 2)) {
            this.velocity.y = -Math.abs(this.velocity.y);
        }
        if (this.location.y < 280 + this.size / 2) {
            this.velocity.y = Math.abs(this.velocity.y);
        }



        //boundaries windows
            const XTop = windowBorders.some(border => {
                return this.location.x > border[0] && this.location.x < border[1]
            })

            if ((this.location.y > 400 - margin) && (this.location.y < 400) && XTop) {
                console.log('hij tikt vanboven');
                this.velocity.y = -Math.abs(this.velocity.y);
            }
            if ((this.location.y > 607 - margin) && (this.location.y < 607) && XTop) {
                console.log('hij tikt vanonder');
                this.velocity.y = Math.abs(this.velocity.y);
            }

            const XLeft = windowBorders.some(border => {
                return this.location.x > border[0] - margin && this.location.x < border[0]
            })
            if(this.location.y < 607 && this.location.y > 400 && XLeft){
                console.log('hij tikt links');
                 this.velocity.x = -Math.abs(this.velocity.x);
            }
            const XRight = windowBorders.some(border => {
                return this.location.x > border[1] && this.location.x < border[1] + margin;
            })
             if(this.location.y < 607 && this.location.y > 400 && XRight){
                console.log('hij tikt rechts');
                 this.velocity.x = Math.abs(this.velocity.x);
            }        
    }
}

export default Ball;