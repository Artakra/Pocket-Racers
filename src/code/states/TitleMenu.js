// Title Menu parent of PocketRacers
var TitleMenu = function(game){}

// Var for key presses
var Key1;
var Key2;
var Key3;
 
// Prototype to change ALL instances off TitalMenu, not create seperate instances
TitleMenu.prototype = {
    
    // Preload function
    preload: function()
    {
        this.game.load.image("menu","src/imgs/titlemenu.jpg");
        this.game.load.audio("TitleMusic","src/music/TitleMusic.ogg");
        this.game.load.image("startbutton","src/imgs/startbutton.jpg");
        this.game.load.image("startbuttonactive","src/imgs/startbuttonactive.jpg");
        this.game.load.image("aboutbutton","src/imgs/aboutbutton.jpg");
        this.game.load.image("aboutbuttonactive","src/imgs/aboutbuttonactive.jpg");
        this.game.load.image("optionsbutton","src/imgs/optionsbutton.jpg");
        this.game.load.image("optionsbuttonactive","src/imgs/optionsbuttonactive.jpg");
        
        //Crate Local Vars
        var StartButton;
        var AboutButton;
        var OptionButton;
        var StartGame = false;
    },
  	create: function()
    {
        // Start The Music
        this.playMusic();
                
        // Int to determine selected menu item
        MenuItem = parseInt(1);
        MenuItemPrev = parseInt(0);
        
        // Draw the game
        var gameTitle = this.game.add.sprite(0,0,"menu");
        this.DrawInitial();
        this.DrawMenu();
        
        // Assign the key strokes
        this.Key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.Key1.onDown.add(this.MenuItemUp, this);
        
        this.Key2 = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.Key2.onDown.add(this.MenuItemDown, this);
        
        this.Key3 = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.Key3.onDown.add(this.MenuItemSelect, this);
        
        
        
        
	},
    
    // Update The TitleMenu
    update: function()
    {        
    },
    
    // Render Function
    render: function()
    {
        // if the selected menu item has changed, 
        if(MenuItemPrev != MenuItem)
        {
            // update the previous and redraw the menu
            MenuItemPrev = MenuItem;
            this.DrawMenu();
        }
        
       
    },
    
    
    //Function for if user pressed "DOWN"
    MenuItemDown: function()
    {
        // Add to Menu Item
        MenuItem++;
        
        // Make sure menu item doesnt exceed 3
        if(MenuItem > 3)
        {
            MenuItem = parseInt(3);
            
        }
    },
    
    
    //Function for if user presses "UP"
    MenuItemUp: function()
    {
        // Subtract to menu Item
        MenuItem--;
        
        // Make sure menu item doesnt go below 1
        if(MenuItem < 1)
        {
            MenuItem = parseInt(1);
        }
    },
    
    // Set state when user Presses Enter
    MenuItemSelect: function()
    {
        // Set State function
        this.SetState();
    },
    
    
    // Change the game state when user picks an option. 
    SetState: function()
    {
        // If "Start Game is chose"
        if (MenuItem == 1)
        {      
            this.game.state.start("PlayPR");
        }
        
        // If "About" is select
        else if (MenuItem == 2)
        {
            // switch to About screen and destory everything off TitleMenu
            this.game.state.start("InfoScreen", false, true);
        }
        else
        {
            // switch to options and destory everything off TitleMenu
            this.game.state.start("Options", false, true);
        }
        
    },
    
    // Draw the Menu (called when something has changed)
    DrawInitial: function()
    {
            this.StartButton = this.game.add.sprite(350, 425, "startbuttonactive");
            this.StartButton.inputEnabled = true;
            this.StartButton.events.onInputOver.add(this.SetStartActive, this);
            this.StartButton.events.onInputDown.add(this.SetState, this);
            this.AboutButton = this.game.add.sprite(350, 485, "aboutbutton");
            this.AboutButton.inputEnabled = true;
            this.AboutButton.events.onInputDown.add(this.SetState, this);
            this.AboutButton.events.onInputOver.add(this.SetAboutActive, this);
            this.OptionButton = this.game.add.sprite(350, 545, "optionsbutton");
            this.OptionButton.inputEnabled = true;
            this.OptionButton.events.onInputOver.add(this.SetOptionActive, this);
            this.OptionButton.events.onInputDown.add(this.SetState, this);
    }, 
            
    DrawMenu: function()
    {
        if(MenuItem == 1)
        {
            this.StartButton = this.game.add.sprite(350, 425, "startbuttonactive");
            this.AboutButton = this.game.add.sprite(350, 485, "aboutbutton");
            this.OptionButton = this.game.add.sprite(350, 545, "optionsbutton");
        }
        else if (MenuItem == 2)
        {
            this.StartButton = this.game.add.sprite(350, 425, "startbutton");
            this.AboutButton = this.game.add.sprite(350, 485, "aboutbuttonactive");
            this.OptionButton = this.game.add.sprite(350, 545, "optionsbutton");
        }
        else
        {
            this.StartButton = this.game.add.sprite(350, 425, "startbutton");
            this.AboutButton = this.game.add.sprite(350, 485, "aboutbutton");
            this.OptionButton = this.game.add.sprite(350, 545, "optionsbuttonactive");
        }
            
    },
    
    // Set MenuItem to Start
    SetStartActive: function()
    {
        MenuItem = 1;
    },
    
    // Set MenuItem to About
    SetAboutActive: function()
    {
        MenuItem = 2;
    },
    
    // Set MenuItem to Options
    SetOptionActive: function()
    {
        MenuItem = 3;
    },
    
    // Function to play TitleMenuMusic
    playMusic: function () 
    {
        // If music is already playing (i.e User had returned to the TitleMenu)
        if(PocketRacers.menuMusicPlaying == true)
        {
            // Do Nothing
            return;
        }
        else 
        {
            // If not already plaing, play the music and set playing flag to true
            PocketRacers.MenuMusic.play();
            PocketRacers.menuMusicPlaying = true;
        }
    }
}