var game = new Phaser.Game(
        800, 600,
        Phaser.CANVAS, '',
        {
            preload: preload,
            create: create,
            update: update
        }
        );
var sprite, group, txtScore;

function preload() {
    game.load.atlasJSONHash('cheetah',
                            'assets/sheet.png',
                            'assets/sprites.js');
   game.load.image('fish',
                   'assets/fish.png');
   game.load.image('background',
                   'assets/BG.png');
                   }
   function create () {
       background = game.add.tileSprite(0, 0, 800, 600, "background");
       
       //cheetah
       sprite = game.add.sprite(0, 380, 'cheetah');
       sprite.animations.add('idle');
       sprite.animations.play('idle', 20, true);
       sprite.anchor.setTo(.5, 0);
       sprite.body.collideWorldBounds = true;
       
       //text
       var style = { font: "30px Arial", fill: "#FFFF00", 
           fontWeight: "bold", align: "center" };
       txtScore = game.add.text(0, 0, "0", style);
       
       //dead fish
       group = game.add.group();
       
       var i = 0;
       //deadfish();
       
       //function deadfish() {
           for (i; i < 1; i++) {
           var x = 1 + Math.floor(Math.random() * 799);
        var a = 1 + Math.floor(Math.random() * 50);
        console.log('x =' + x);
        console.log('a =' + a);
        var deadfish = group.create(x, 0, 'fish');
        deadfish.body.acceleration.y = a;
        deadfish.body.collideWorldBounds = true;
       
    }
    //}
     
}

function update() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        //moves the sprite left
        sprite.x -= 4;
        //faces left
        sprite.scale.x = -1;
    }
    
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        //moves the sprite right
        sprite.x += 4;
        //faces right
        sprite.scale.x = 1;
    }
    
    //check for collision with the dead fish
    game.physics.collide(
            sprite,
            group,
            collisionHandler,
            null,
            this
            );
    
}

function collisionHandler(cheetah, fish) {
    fish.kill();
    var score = txtScore.text;
    score ++;
    txtScore.text = score.toString();
    fishRespawn();
    
}

function fishRespawn() {
    var b;
    for(b=0; b < 2; b++) {
        var x = 1 + Math.floor(Math.random() * 799);
        var a = 1 + Math.floor(Math.random() * 75);
        var fish = group.create(x, 0, "fish");
        fish.body.acceleration.y = a;
        fish.body.collideWorldBounds = true;
    }
    }
