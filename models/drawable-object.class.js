class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
        this.imageCache[path] = this.img;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // drawFrame(ctx){
    //if(this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Coin || this instanceof ThrowableObjects || this instanceof Bottles){
    //  ctx.beginPath();
    // ctx.lineWidth = '5';
    // ctx.strokeStyle = 'black';
    // ctx.rect(this.x, this.y, this.width, this.height);
    //ctx.stroke();
    //}
    // }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;
        })
    }

}