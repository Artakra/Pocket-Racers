var Options = function(game){}

// Key to return to main menu
var Key1;

// Create Info Screen Prototype
Options.prototype = {
    
    
    
    // Preload Function
	preload: function(){
        
        // Load the info screen image
        this.game.load.image("OptionsScreen","src/imgs/optionscreen.jpg");
	},
    
    // Load the Create Function
  	create: function(){
        
        // Show about screen
         var AboutScreen = this.game.add.sprite(0,0,"OptionsScreen");
        
            // Set up key to return to main menu
            Key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            Key1.onDown.add(this.MainMenu,this);
	},
    
    //Function to return to main menu
    MainMenu: function()
    {
        //console.log("Enter Pressed");
        this.game.state.start("TitleMenu", false, true);       
    }
}