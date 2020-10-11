class Paddle{
    constructor(Game_Width,Game_Heigth){
        this.width = 150;
        this.height = 30;
        this.position = {
            x = Game_Width/2- this.width/2,
            y = Game_Heigth- this.height-10
        };
    }
    
    draw(ctx){
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}