const WIDTH = 1024; // canvas elementets bredd
const HEIGHT = 768; // canvas elementets höjd

let canvas = document.getElementById('myCanvas'); // skapa canvaselementet
let ctx = canvas.getContext('2d'); // spara canvaselementets context, vi behöver det för att kunna rita
canvas.setAttribute("class", "border"); // ge canvas klassen border så vi markerar ut det
canvas.width  = WIDTH; // sätt elementets bredd
canvas.height = HEIGHT; // ... & höjd



var bulletWidth = 40, //Projectile Width
    bulletHeight = 40, //Projectile Height
    bulletxc = enemyx, //Projectile x coordnates
    bulletyc = enemyy, //Projectile y coordinates
    bulletVelocity = 0, // Bullet velocity
    bulletFriction = 1, // Bullet friction
    bulletSpeed = 6, //Projectile speed
    enemyFric = 0.8, //Grim reaper friction
    enemyVel = 0, //Enemy velocity
    enemyx = 450, //Enemy x
    enemyy = 150, //Enemy y
    enemySpeed = 4, //Enemey speed
    initpos = 1,
    shootTimeModifier = 5,
    enemyW = 64,
    enemyH = 128,
    enemyHp = 1,
    isBackwards = false;
    left = true, //Enemy direction
    canShoot = true; //Setting the boss shooting mechanics to true
/**/

/**/ //Create image function for easier image creation and nameing
createImage = function(img, x, y, iheight, iwidth){
    ctx.drawImage(img, x, y, iheight, iwidth);
};
/**/
bulletScript();

function bulletScript() {
    requestAnimationFrame(bulletScript);

    ctx.clearRect(0,0,WIDTH,HEIGHT);
    /**/ //Bullet bounds check
    if (bulletyc < HEIGHT) {
        /**/ //Bullet moving if it is in frame
        if (bulletVelocity < bulletSpeed) {
            bulletVelocity++;
        } else {
            bulletVelocity--;
            if (bulletyc < 0 && bulletSpeed == -6){
                bulletSpeed = 6;
                bulletVelocity++;
                bulletyc = 2000;
            }
        }
        /**/
    }
    else {
        if (canShoot == true) {
            if (initpos == 1){
                isBackwards = false;
                bulletxc = enemyx; //Setting start position
                bulletyc = enemyy; //Setting position
                initpos = 0; //Setting init value
                shootTimeModifier = Math.floor(Math.random() * 7) + 1;
            }
            bulletSpeed = 6; //Bullet speed set to 6 regardless of what has been set before
            canShoot = false; //Setting can shoot to false since the bullet was just shot
        }
        else {
            /**/ //Setting shoot time delay to get smaller every second 1/60 (since 1 sec = 60 frames and it updates every 60 frames) unitl bullet can be shot again
            shootTimeModifier += -0.01666667;
            if (shootTimeModifier > 0) {
                canShoot = false;
                initpos = 0;
            }
            else if (shootTimeModifier <= 0) {
                canShoot = true;
                initpos = 1;
            }

            /**/
        }
    }
    /**/
    console.log(bulletVelocity);

    if (bulletyc >= HEIGHT && bulletSpeed > 0){
        bulletSpeed = -6;
        bulletVelocity = -6;
        isBackwards = true;

    }
    if (isBackwards){
        bulletxc = enemyx;
    }

    /**/ //Applies friction and move the projectile
    bulletVelocity *= bulletFriction;
    bulletyc += bulletVelocity;
    /**/

    /**/ //Enemy boundscheck and auto move
    if (enemyx < 260){
        enemyx = 260;
        left = false;
    } else if (enemyx > 700){
        enemyx = 700;
        left = true;
    }
    /**/

    /**/ //Setting value to change direction
    if (left){
        if (enemyVel > -enemySpeed){
            enemyVel--;
        }

    } else if (!left){
        if (enemyVel < enemySpeed){
            enemyVel++;
        }
    }
    /**/

    /**/ //Enemy friction and moves enemy
    enemyVel *= enemyFric;
    enemyx += enemyVel;
    /**/
    
    /**/ //Drawing enemys
    grimReaperImg = document.getElementById('grim');
        /**/ //If enemy is not dead display the image
    if (enemyHp != 0){
        grimReaper = createImage(grimReaperImg, enemyx, enemyy, enemyW, enemyH);
    }
        /**/
    /**/

    /**/ //Drawing projectile
    bulletImg = document.getElementById('bullet');
    bullet = createImage(bulletImg, bulletxc, bulletyc, bulletWidth, bulletHeight);
    /**/

    /**/ //Setting hitbox values for enemy bullet and character
    var bulletx = bulletxc + (bulletWidth - 32);
    var bullety = bulletyc + bulletHeight;
    var combineEx = enemyx + enemyW;
    var combineEy = enemyy + enemyH;
    /**/

    /**/ //Bullet collision with enemy
    if ((bulletyc <= combineEy && enemyy <= bullety) && (enemyx <= bulletx && combineEx >= bulletxc)) {
        if (isBackwards){
            bulletyc = 90000000000000000;
            console.log("swag");
        }
    }
    /**/
}


let main = document.getElementsByTagName('main')[0];
main.appendChild(canvas);