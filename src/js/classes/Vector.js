class Vector{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    add(otherVector){
        this.x += otherVector.x;
        this.y += otherVector.y;
    }
}

export default Vector;