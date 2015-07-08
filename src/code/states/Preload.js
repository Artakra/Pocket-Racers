var Preload = function(game){}
 
Preload.prototype = {
	preload: function(){
        
        this.game.load.image("backdrop", 'src/imgs/bricks.jpg');
        this.game.load.image("logo","src/imgs/logo.jpeg");
        this.game.load.audio("revengines","src/sfx/loadrev.mp3");
	},
  	create: function(){
        var Backdrop = this.game.add.image(0,0,"backdrop");
        var Logo = this.game.add.image(400,300,"logo");
        BGRev = this.game.add.audio("revengines");
        BGRev.play();
        
        Logo.alpha = 0;
        Logo.anchor.setTo(0.5, 0.5);
        var tween = this.game.add.tween(Logo).to( { alpha: 1 }, 4000, "Power0").start();
        tween.onComplete.add(doSomething, this)

       
        

        
        function doSomething()
        {
        this.game.state.start("TitleMenu");
        }
        
	}
}