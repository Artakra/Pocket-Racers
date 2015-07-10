var PlayPR = function(game){}
 
PlayPR.prototype = {
    
	preload: function()
    {
        var Key1;
        var map;
        var layer;
        var cursors;
        var car;
        var style;
        var text;
        var milliseconds;
        var seconds;
        var minutes;
        var currenttimer;
        var timerstyle;
        
        this.game.load.tilemap('ChaosCrossingCol','src/imgs/ChaosCrossingCollisions.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('ChaosCrossing', 'src/imgs/ChaosCrossing.png');
        this.game.load.image('walls_1x2', 'src/imgs/walls_1x2.png');
        this.game.load.image('tiles2', 'src/imgs/tiles2.png');
        this.game.load.image('car', 'src/imgs/car2.png');
        
        // Timer Related
        this.game.load.bitmapFont('rawhide', 'src/imgs/rawhideraw.png');
        
        
        //Stop music playing
        PocketRacers.MenuMusic.fadeOut(2000);
        PocketRacers.menuMusicPlaying = false;
        
        var StartTime;
        var TimerDate;
	},
    
  	create: function()
    {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.stage.backgroundColor = '#2d2d2d';

        this.map = this.game.add.tilemap('ChaosCrossingCol');

        this.map.addTilesetImage('ChaosCrossing');
        //this.map.addTilesetImage('walls_1x2');
        //this.map.addTilesetImage('tiles2');
    
        this.layer = this.map.createLayer('Tile Layer 1');
        this.game.physics.p2.convertTilemap(this.map, this.layer);
        this.game.physics.p2.convertCollisionObjects(this.map,"Collision");
        this.layer.resizeWorld();

        //  Set the tiles for collision.
        //  Do this BEFORE generating the p2 bodies below.
        //this.map.setCollisionBetween(1, 12);
        //this.map.setCollision(331);

        //  Convert the tilemap layer into bodies. Only tiles that collide (see above) are created.
        //  This call returns an array of body objects which you can perform addition actions on if
        //  required. There is also a parameter to control optimising the map build.
        this.game.physics.p2.convertTilemap(this.map, this.layer);

        this.car = this.game.add.sprite(0, 0, 'car');
        this.car.anchor.setTo(0.5, 0.85);
        this.game.physics.p2.enable(this.car);
        this.game.physics.p2.friction = 1000;
        this.game.camera.follow(this.car);

        //  By default the car will collide with the World bounds,
        //  however because you have changed the size of the world (via layer.resizeWorld) to match the tilemap
        //  you need to rebuild the physics world boundary as well. The following
        //  line does that. The first 4 parameters control if you need a boundary on the left, right, top and bottom of your world.
        //  The final parameter (false) controls if the boundary should use its own collision group or not. In this case we don't require
        //  that, so it's set to false. But if you had custom collision groups set-up then you would need this set to true.
        this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);

        //  Even after the world boundary is set-up you can still toggle if the car collides or not with this:
        // car.body.collideWorldBounds = false;

        this.cursors = this.game.input.keyboard.createCursorKeys();
        
         // Set up key to return to main menu
            this.Key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
            this.Key1.onDown.add(this.MainMenu,this);

        
        this.style = { font: "16px Arial", fill: "#FFFFFF", align: "center"};
        this.timerstyle = { font: "16px Arial", fill: "#FFFFFF", align: "center"};
        
        var sprite;
        this.sprite = this.game.add.sprite(750,100);
        this.sprite.fixedToCamera = true;
        
        
        this.text = this.game.add.text(0, 0, "Race Time", this.style);
        this.timer = this.game.add.text(0, 20, '00:00:00', this.timerstyle);
        this.sprite.addChild(this.text);
        this.sprite.addChild(this.timer);
        this.text.anchor.set(1);
        this.timer.anchor.set(1);

        this.milliseconds = parseInt(0);
        this.seconds = parseInt(0);
        this.minutes = parseInt(0);
        
        //this.currentTimer = new Phaser.Timer(this.game, false);
        //this.game.time.events.loop(Phaser.Timer.SECOND, this.updateSeconds, this);
        //this.game.time.events.loop(Phaser.Timer.SECOND, this.updateMilliseconds,this);
        //this.currentTimer.loop(Phaser.Timer.SECOND, this.updateSeconds, this);
        //this.currentTimer.loop(Phaser.Timer.SECOND, this.updateMilliseconds, this);
       // this.currentTimer.loop(Phaser.Timer.MINUTE, this.updateMinutes, this);
        //this.currentTimer.start();
      
        this.StartTime = this.game.time.now;
        

959
	},

    updateMilliseconds: function()
    {
            this.milliseconds = parseInt(this.milliseconds) + parseInt(2);
    
            if(this.milliseconds == parseInt(98))
            {
                this.seconds++;
                this.milliseconds = parseInt(0);
            }
            if(this.seconds == parseInt(60))
            {
                this.minutes++;
                this.seconds = parseInt(0);
            }
        
        
        //this.timer.setText('0'+ this.minutes +':'+ '0' + this.seconds + ':'  + this.milliseconds);
        if(this.milliseconds < parseInt(10))
        {
            if(this.seconds < parseInt(10))
            {
                if(this.minutes < parseInt(10))
                    this.timer.setText('0'+ this.minutes +':'+ '0' + this.seconds + ':' + '0' + this.milliseconds);
                else
                    this.timer.setText(this.minutes +':'+ '0' + this.seconds + ':' + '0' + this.milliseconds);
            }
            else
            {
                if(this.minutes < parseInt(10))
                    this.timer.setText('0'+ this.minutes +':' + this.seconds + ':' + '0' + this.milliseconds);
                else
                    this.timer.setText(this.minutes +':' + this.seconds + ':' + '0' + this.milliseconds); 
            } 
        }
        else
        {
            if(this.seconds < parseInt(10))
            {
                if(this.minutes < parseInt(10))
                    this.timer.setText('0'+ this.minutes +':'+ '0' + this.seconds + ':' + this.milliseconds);
                else
                    this.timer.setText(this.minutes +':'+ '0' + this.seconds + ':' + this.milliseconds);
            }
            else
            {
                if(this.minutes < parseInt(10))
                    this.timer.setText('0'+ this.minutes +':' + this.seconds + ':' + this.milliseconds);
                else
                    this.timer.setText(this.minutes +':' + this.seconds + ':' + this.milliseconds); 
            } 
           
        }
        
    },
        
    MainMenu: function()
    {
        this.game.state.start("TitleMenu");
    },

    update: function()
    {        
        this.updateTime();
        //console.log(this.game.time.now- this.StartTime);
        
        if (this.cursors.left.isDown)
        {
            this.car.body.rotateLeft(100);
        }
        else if (this.cursors.right.isDown)
        {
            this.car.body.rotateRight(100);
        }
        else
        {
            this.car.body.setZeroRotation();
        }

        if (this.cursors.up.isDown)
        {
            this.car.body.thrust(50);
        }
        else if (this.cursors.down.isDown)
        {
            this.car.body.reverse(50);
        }
        
        if (this.cursors.up.isUp && this.cursors.down.isUp)
        {
                console.log("slowing");
            this.car.body.thrust = this.car.body.thrust - 20;
        }
        
        
        

        
    },
    
    updateTime: function()
    {
        this.TimerDate = this.game.time.now - this.StartTime;
        
        //this.minutes = Math.floor(game.time.time / 60000) % 60;
        this.minutes = Math.floor(this.TimerDate / 60000) % 60;
 
        //this.seconds = Math.floor(game.time.time / 1000) % 60;
        this.seconds = Math.floor(this.TimerDate / 1000) % 60;
 
        //this.milliseconds = Math.floor(game.time.time) % 100;
        this.milliseconds = Math.floor(this.TimerDate) % 100;
 
    //If any of the digits becomes a single digit number, pad it with a zero
    if (this.milliseconds < 10)
        this.milliseconds = '0' + this.milliseconds;
 
    if (this.seconds < 10)
        this.seconds = '0' + this.seconds;
 
    if (this.minutes < 10)
        this.minutes = '0' + this.minutes;
 
    this.timer.setText(this.minutes + ':'+ this.seconds + ':' + this.milliseconds);

        this.timer.setText(this.minutes + ':'+ this.seconds + ':' + this.milliseconds);
    },
    render: function()
    {
        
    }
}