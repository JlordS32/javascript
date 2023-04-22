const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// window size for the canvas
canvas.width = 1024;
canvas.height = 576;

let scrollOffset = 0;
const gravity = 0.2;
let lastKey;

// i don't know why but the entire image disappears when i take it off.
const image = new Image();
image.src = "../images/platform.png"

// Image creation function
function createImage(imageSrc){
    const image = new Image();
    image.src = imageSrc;
    return image;
};

// object images
const platformImage = createImage("../images/platform.png");
const backgroundImage = createImage("../images/background.png");
const hillsImage = createImage("../images/hills.png");
const platformSmallTall = createImage("../images/platformSmallTall.png");

// Player sprite animation
const spriteRunLeft = createImage("../images/spriteRunLeft.png");
const spriteRunRight = createImage("../images/spriteRunRight.png");
const spriteStandLeft = createImage("../images/spriteStandLeft.png");
const spriteStandRight = createImage("../images/spriteStandRight.png");

// Player class
class Player{
    constructor(){
        // player position
        this.position = {
            x: 100,
            y: 100
        };

        // player velocity
        this.velocity = {
            x: 0,
            y: 0.2
        };

        this.speed = 5;
        this.jumpForce = 10;
        
        // player size
        this.width = 66;
        this.height = 150;

        // image property
        this.frames = 0;
        this.sprites = {
            stand: {
                right: spriteStandRight,
                left: spriteStandLeft,
                cropWidth: 177,
                width: 66
            },
            run: {
                right: spriteRunRight,
                left: spriteRunLeft,
                cropWidth: 341,
                width: 127.875
            }
        };

        this.currentSprite = this.sprites.stand.right;
        this.currentCropWidth = 177;
    };
    // draw function to draw player on the screen
    draw(){
        // drawImage accepts nine arguments drawimage (image, picture x, picture y, picture width, picture height, position x, position y, width, height);
        c.drawImage(this.currentSprite, // image source
        
                    // crops the image based on the specified values
                    this.currentCropWidth * this.frames, // picture position x
                    0, // picture position y
                    this.currentCropWidth, // picture width
                    400, // picture height

                    // adjusts the image into the canvas
                    this.position.x, // cropped image position x
                    this.position.y, // cropped image position y
                    this.width, // cropped image width
                    this.height); // cropped image height
        };

    update(){
        this.frames++;

        if (this.frames > 59 && 
            (this.currentSprite === this.sprites.stand.right || 
            this.currentSprite === this.sprites.stand.left)){
            this.frames = 0;
        }

        else if (this.frames > 29 && 
            (this.currentSprite === this.sprites.run.right || 
            this.currentSprite === this.sprites.run.left)){
            this.frames = 0;
        }
        
        this.draw();

        this.position.y += this.velocity.y; 
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity;
    };
};

// Platform class for platform objects
class Platform{
    constructor({x, y, image}){
        this.position = {
            x,
            y   
        };

        this.width = image.width;
        this.height = image.height; 
        this.image = image;
    };

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y);
    };
};

class GenericObject{
    constructor({x, y, image}){
        this.position = {
            x,
            y   
        };

        this.width = image.width;
        this.height = image.height; 
        this.image = image;
    };

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y);
    };
};

// instantiating player class
let player = new Player();

// platform instances
let platforms = [
    new Platform({x: image.width*4 + 400-2 + platformImage.width - platformSmallTall.width, 
                y: 270, 
                image: platformSmallTall}),
    new Platform({x: -1, 
                y: 470, 
                image: platformImage}), 
    new Platform({x: image.width-3, 
                y: 470, 
                image: platformImage}),
    new Platform({x: image.width*2 + 200, 
                y: 470, 
                image: platformImage}),
    new Platform({x: image.width*3 + 400, 
                y: 470, 
                image: platformImage}),
    new Platform({x: image.width*4 + 400-2, 
                y: 470, 
                image: platformImage}),
    new Platform({x: image.width*6 + 400-2, 
                y: 470, 
                image: platformImage})
];

// generic objects instances
let genericObject = [new GenericObject({x: -1,
                                        y: -1,
                                        image: backgroundImage}),
                       new GenericObject({x: -1,
                                        y: -1,
                                        image: hillsImage})];
// keys
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
};

function init(){
    // instantiating player class
    player = new Player();

    // platform instances
    platforms = [
        new Platform({x: image.width*4 + 400-2 + platformImage.width - platformSmallTall.width, 
                    y: 270, 
                    image: platformSmallTall}),
        new Platform({x: -1, 
                    y: 470, 
                    image: platformImage}), 
        new Platform({x: image.width-3, 
                    y: 470, 
                    image: platformImage}),
        new Platform({x: image.width*2 + 200, 
                    y: 470, 
                    image: platformImage}),
        new Platform({x: image.width*3 + 400, 
                    y: 470, 
                    image: platformImage}),
        new Platform({x: image.width*4 + 400-2, 
                    y: 470, 
                    image: platformImage}),
        new Platform({x: image.width*6 + 400-2, 
                    y: 470, 
                    image: platformImage})
    ];

    // generic objects instances
    genericObject = [new GenericObject({x: -1,
                                        y: -1,
                                        image: backgroundImage}),
                     new GenericObject({x: -1,
                                        y: -1,
                                        image: hillsImage})];
    scrollOffset = 0;
};

// Game animation. This function refreshes the game for every frame.
function animate(){
    requestAnimationFrame(animate);
    c.fillStyle = 'white';
    c.fillRect(0,0, canvas.width, canvas.height);
    genericObject.forEach(object => {object.draw();});
    platforms.forEach(platform => {
        platform.draw();
    });
    player.update();

    if (keys.right.pressed && player.position.x < 500) {
        player.velocity.x = player.speed;
    }
    else if ((keys.left.pressed && player.position.x > 100) || (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)){
        player.velocity.x = -player.speed;
    }
    else
    {
        player.velocity.x = 0;
        if (keys.right.pressed){
            scrollOffset += player.speed;
            platforms.forEach(platform => {
                platform.position.x -= player.speed;
            });
            genericObject.forEach(object => {
                object.position.x -= player.speed + .66;
            });
        }

        else if (keys.left.pressed && scrollOffset > 0){
            scrollOffset -= 5;
            platforms.forEach(platform => {
                platform.position.x += player.speed;
            });
            genericObject.forEach(object => {
                object.position.x += player.speed + .66;
            });
        }
    }

    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y &&     player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width ){
                player.velocity.y = 0;
            }
    });

    if (keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.run.right){
        player.frames = 1;
        player.currentSprite = player.sprites.run.right;
        player.currentCropWidth = player.sprites.run.cropWidth;
        player.width = player.sprites.run.width;
    }
    else if (keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.run.left){
        player.currentSprite = player.sprites.run.left;
        player.currentCropWidth = player.sprites.run.cropWidth;
        player.width = player.sprites.run.width;
    }
    else if (!keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.run.right){
        player.currentSprite = player.sprites.stand.left;
        player.currentCropWidth = player.sprites.stand.cropWidth;
        player.width = player.sprites.stand.width;
    }
    else if (!keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.run.left){
        player.currentSprite = player.sprites.stand.right;
        player.currentCropWidth = player.sprites.stand.cropWidth;
        player.width = player.sprites.stand.width;
    };


    if (scrollOffset > 3700){
        console.log('you win')
    };

    if (player.position.y > canvas.height){
        init();
    };
 };

animate();

window.addEventListener('keydown', (e) => {
    switch (e.key){
        case 'a':
        case 'ArrowLeft':
            keys.left.pressed = true;
            lastKey = 'left';
            break;
        case 's':
        case 'ArrowDown':
            break;
        case 'd':
        case "ArrowRight":
            keys.right.pressed = true;
            lastKey = 'right';
            break;
        case ' ':
        case 'w':
        case "ArrowUp":
            if (player.velocity.y == 0)
                player.velocity.y -= player.jumpForce 
            break;  
};
});

window.addEventListener('keyup', (e) => {
    switch (e.key){
        case 'a':
        case 'ArrowLeft':
            keys.left.pressed = false;
            lastKey = 'left';
            break;
        case 's':
        case 'ArrowDown':
            break;
        case 'd':
        case "ArrowRight":
            keys.right.pressed = false;
            lastKey = 'right';
            break;
     };
});
