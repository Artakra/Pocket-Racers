// Title Menu parent of PocketRacers
var TitleMenu = function(game){}

// Var for key presses
var Key1;
var Key2;
var Key3;
 
// Prototype to change ALL instances off TitalMenu, not create seperate instances
TitleMenu.prototype = 
{ 
    
    // Preload function
    preload: function(){
        this.game.load.image("menu","src/imgs/titlemenu.jpg");
        this.game.load.audio("TitleMusic","src/music/TitleMusic.ogg");
        this.game.load.image("startbutton","src/imgs/startbutton.jpg");
        this.game.load.image("startbuttonactive","src/imgs/startbuttonactive.jpg");
        this.game.load.image("aboutbutton","src/imgs/aboutbutton.jpg");
        this.game.load.image("aboutbuttonactive","src/imgs/aboutbuttonactive.jpg");
        this.game.load.image("optionsbutton","src/imgs/optionsbutton.jpg");
        this.game.load.image("optionsbuttonactive","src/imgs/optionsbuttonactive.jpg");
        
        TitleMenu.FadeMusic = false;
        var TestBool = false;
    },
  	create: function()
    {
        
        this.playMusic();
        
        console.log("Call Create");
        
        // Int to determine selected menu item
        MenuItem = parseInt(1);
        MenuItemPrev = parseInt(0);
        
        // Draw the game
        var gameTitle = this.game.add.sprite(0,0,"menu");
        this.DrawMenu();
        
        // Assign the key strokes
        Key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        Key1.onDown.add(this.MenuItemUp, this);
        
        Key2 = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        Key2.onDown.add(this.MenuItemDown, this);
        
        Key3 = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        Key3.onDown.add(this.MenuItemSelect, this);
        
        
        
        
	},
    
    update: function()
    {
        
                if(MenuItemPrev != MenuItem)
        {
            MenuItemPrev = MenuItem;
            this.DrawMenu();
        }
        if(TitleMenu.FadeMusic)
        {
            PocketRacers.MenuMusic.fadeOut(2000);
        }
    },
    
    MenuItemDown: function()
    {
        MenuItem++;
        if(MenuItem > 3)
        {
            MenuItem = parseInt(3);
            
        }
        //this.DrawMenu();
    },
    
    MenuItemUp: function()
    {
        MenuItem--;
        if(MenuItem < 1)
        {
            MenuItem = parseInt(1);
        }
        //this.DrawMenu();
    },
    
    MenuItemSelect: function()
    {
        this.SetState();
    },
    
    
    // Change the game state when user picks an option. 
    SetState: function()
    {
        if (MenuItem == 1)
        {
            TitleMenu.FadeMusic = true;
            TestBool = false;
            //this.game.state.start("PlayGame");
        }
        else if (MenuItem == 2)
        {
            //this.game.switchState("InfoScreen");
            this.game.state.start("InfoScreen", false, true);
        }
        else
        {
            this.game.state.start("Options", false, true);
        }
        
    },
    
    DrawMenu: function()
    {
        var StartButton;
        var AboutButton;
        var OptionButton;
       
            
        if(MenuItem == 1)
        {
            StartButton = this.game.add.sprite(this.world.centerX-50, this.world.centerY+125, "startbuttonactive");
            StartButton.inputEnabled = true;
            StartButton.events.onInputOver.add(this.SetStartActive, this);
            StartButton.events.onInputDown.add(this.SetState, this);
            AboutButton = this.game.add.sprite(this.world.centerX-50, this.world.centerY+185, "aboutbutton");
            AboutButton.inputEnabled = true;
            AboutButton.events.onInputDown.add(this.SetState, this);
            AboutButton.events.onInputOver.add(this.SetAboutActive, this);
            OptionButton = this.game.add.sprite(this.world.centerX-50, this.world.centerY+245, "optionsbutton");   
            OptionButton.inputEnabled = true;
            OptionButton.events.onInputOver.add(this.SetOptionActive, this);
            OptionButton.events.onInputDown.add(this.SetState, this);
          
        }
        else if (MenuItem == 2)
        {
            StartButton = this.game.add.sprite(this.world.centerX-50, this.world.centerY+125, "startbutton");
            AboutButton = this.game.add.sprite(this.world.centerX-50, this.world.centerY+185, "aboutbuttonactive");
            OptionButton = this.game.add.sprite(this.world.centerX-50, this.world.centerY+245, "optionsbutton");
        }
        else
        {
            StartButton = this.game.add.sprite(this.world.centerX-50, this.world.centerY+125, "startbutton");
            AboutButton = this.game.add.sprite(this.world.centerX-50, this.world.centerY+185, "aboutbutton");
            OptionButton = this.game.add.sprite(this.world.centerX-50, this.world.centerY+245, "optionsbuttonactive");
        }
        
    },
    
    SetStartActive: function()
    {
        MenuItem = 1;
    },
    
    SetAboutActive: function()
    {
        MenuItem = 2;
    },
    
    SetOptionActive: function()
    {
        MenuItem = 3;
    },
    
	playTheGame: function(){
	},
    
    playMusic: function () 
    {
            if(PocketRacers.menuMusicPlaying == true)
            {
                
                  return;
            }

            else {
                PocketRacers.MenuMusic.play();
                PocketRacers.menuMusicPlaying = true;
            }
            

      }
}

function ExitGame()
{
    //ExitGame();
        this.window.open('', '_self', '');
        this.window.close();
}