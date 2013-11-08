//Creating a new phaser game
var game = new Phaser.Game(
                    800, 600, 
                    Phaser.CANVAS, '', 
                    { 
                        preload: preload, 
                        create: create, 
                        update: update 
                    }
            );
//creating variables   
var sprite, group, txtScore; 
//adding mp3 sounds
var catsound = new Audio("assets/star.mp3");
var losingsound = new Audio("assets/battleCry.mp3");

function preload() {
    game.load.atlasJSONHash('pusheen',
                            'assets/sheet.png',
                            'assets/sprites.js');
    game.load.image('cherry',
                    'assets/cherry.png');
    game.load.image('background',
                    'assets/skygrass.png');
}

function create() {
    //adding the background
    game.add.tileSprite(0, 0, 800, 600, "background");
    
     //protagonist
    sprite = game.add.sprite(0, 480, 'pusheen');
    sprite.animations.add('idle');
    sprite.animations.play('idle', 20, true);
    sprite.anchor.setTo(.5, 0); //center flip area
    sprite.body.collideWorldBounds = true;
    
    //add text
     var style = { font: "30px Arial", fill: "#FFFF00", fontWeight: "bold", align: "center" };
    txtScore = game.add.text(0, 0, "0", style);
    
    //cheeries
    group = game.add.group();

    
    for(var i = 0; i < 3; i++) {
        var ball = group.create(i*100,0, "cherry");
        ball.body.acceleration.y = 100;
     
    }
}

function update() {
    
    if(Math.random() < .02) {
        var x = 1 + Math.floor(Math.random() * 775);
        var a = 1 + Math.floor(Math.random() * 75);
         var cherries = group.create(x,0, "cherry");
        cherries.body.acceleration.y = a;
        //ball.body.collideWorldBounds = true;
    }
    
    group.forEach(function(blah) {
        if(blah.y > 675) {
            blah.kill();
            //game over
            gameOver();
        }
    });
    
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        sprite.x -= 10; //move left
        sprite.scale.x = -1; //face left
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        sprite.x += 10; //move right
        sprite.scale.x = 1; //face right
    }
    
        //check for collision with snail
    game.physics.collide(
         sprite, 
         group, 
         collisionHandler, 
         null, 
         this
    );
}

function collisionHandler(pusheen, cherry) {
    cherry.kill();  
    var score = txtScore.text;
    score ++;
    txtScore.text = score.toString();
    catsound.play();
}


function gameOver() {
    losingsound.play();
    $('body').html("<h1>Hey loser you lost the game!</h1><br /><p>Your score was: " + txtScore.text + "!</p><form><input type=button value='Refresh' onClick='history.go()'>Try again?</input></form>");
    game.Destroy();
}