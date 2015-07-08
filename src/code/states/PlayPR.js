var PlayPR = function(game){}
 
PlayPR.prototype = {
    
	preload: function()
    {
        var map;
        var layer;
        var cursors;
        var ship;
        this.game.load.tilemap('map','src/imgs/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('ground_1x1', 'src/imgs/ground_1x1.png');
        this.game.load.image('walls_1x2', 'src/imgs/walls_1x2.png');
        this.game.load.image('tiles2', 'src/imgs/tiles2.png');
        this.game.load.image('ship', 'src/imgs/thrust_ship2.png');
        
        //Stop music playing
        PocketRacers.MenuMusic.fadeOut(2000);
	},
    
  	create: function()
    {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.stage.backgroundColor = '#2d2d2d';

        this.map = this.game.add.tilemap('map');

        this.map.addTilesetImage('ground_1x1');
        this.map.addTilesetImage('walls_1x2');
        this.map.addTilesetImage('tiles2');
    
        this.layer = this.map.createLayer('Tile Layer 1');

        this.layer.resizeWorld();

        //  Set the tiles for collision.
        //  Do this BEFORE generating the p2 bodies below.
        this.map.setCollisionBetween(1, 12);

        //  Convert the tilemap layer into bodies. Only tiles that collide (see above) are created.
        //  This call returns an array of body objects which you can perform addition actions on if
        //  required. There is also a parameter to control optimising the map build.
        this.game.physics.p2.convertTilemap(this.map, this.layer);

        this.ship = this.game.add.sprite(200, 200, 'ship');
        this.game.physics.p2.enable(this.ship);

        this.game.camera.follow(this.ship);

        //  By default the ship will collide with the World bounds,
        //  however because you have changed the size of the world (via layer.resizeWorld) to match the tilemap
        //  you need to rebuild the physics world boundary as well. The following
        //  line does that. The first 4 parameters control if you need a boundary on the left, right, top and bottom of your world.
        //  The final parameter (false) controls if the boundary should use its own collision group or not. In this case we don't require
        //  that, so it's set to false. But if you had custom collision groups set-up then you would need this set to true.
        this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);

        //  Even after the world boundary is set-up you can still toggle if the ship collides or not with this:
        // ship.body.collideWorldBounds = false;

        this.cursors = this.game.input.keyboard.createCursorKeys();
       
        
	},
        
    update: function()
    {
        if (this.cursors.left.isDown)
        {
            this.ship.body.rotateLeft(100);
        }
        else if (this.cursors.right.isDown)
        {
            this.ship.body.rotateRight(100);
        }
        else
        {
            this.ship.body.setZeroRotation();
        }

        if (this.cursors.up.isDown)
        {
            this.ship.body.thrust(400);
        }
        else if (this.cursors.down.isDown)
        {
            this.ship.body.reverse(400);
        }
    },
        
    render: function()
    {
        
    }
}