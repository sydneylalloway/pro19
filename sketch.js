var path,mainPlayer;
var player1, player2, player3;
var pathImg, mainPlayer1Img, mainPlayer2Img;

var oppCoinImg, oppLeafImg, oppConeImg;
var gameOverImg;

var pinkCG, yellowCG,redCG; 
var END=0;
var PLAY=1;
var gameState=PLAY;

var distance=0;
var gameOver, restart;
function preload(){
pathImg.loadImage("path.png");
mainPlayer1Img.loadAnimation("mainPlayer1.png");
mainPlayer2Img.loadAnimation("mainPlayer3.png");

 oppCoinImg.loadAnimation("coin.png");
oppLeafImg.loadAnimation("leaf.png");
oppConeImg.loadAnimation("obstacle1.png");
gameOverImg.loadImage("gameOver.png");
}

function setup() {
 createCanvas(1200,300);
 path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX=-5;

mainPlayer=createSprite(70,150);
mainPlayer.addAnimation(mainPlayer1Img);
mainPlayer.scale=0.07;

mainPlayer.setCollider(rectangle,0,0,40,40);

gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false; 
}

function draw() {
 background(0);
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);

  if(gameState===PLAY){
    
    distance = distance + Math.round(getFrameRate()/50);
    path.velocityX = -(6 + 2*distance/150);
   
    mainPlayer.y = World.mouseY;
   
    edges= createEdgeSprites();
    mainPlayer .collide(edges)

    if(path.x < 0 ){
        path.x = width/2;
      }
      var select_oppPlayer = Math.round(random(1,3));
  
      if (World.frameCount % 150 == 0) {
        if (select_oppPlayer == 1) {
          oppCoinImg();
        } else if (select_oppPlayer == 2) {
          oppConeImg();
        } else {
          oppLeafImg();
        }
      }
      if(pinkCG.isTouching(mainPlayer)){
        gameState = END;
        player1.velocityY = 0;
        player1.addAnimation(oppLeafImg);
       }
       
       if(yellowCG.isTouching(mainPlayer)){
         gameState = END;
         player2.velocityY = 0;
         player2.addAnimation(oppCoinImg);
       }
       
       if(redCG.isTouching(mainPlayer)){
         gameState = END;
         player3.velocityY = 0;
         player3.addAnimation(oppConeImg);
       }
      
       else if (gameState === END) {
        gameOver.visible = true;
      
        textSize(20);
        fill(255);
        text("Press Up Arrow to Restart the game!", 500,200);
      
        path.velocityX = 0;
        mainPlayer.velocityY = 0;
        mainPlayer.addAnimation(mainPlayer1Img);
      
        pinkCG.setVelocityXEach(0);
        pinkCG.setLifetimeEach(-1);
      
        yellowCG.setVelocityXEach(0);
        yellowCG.setLifetimeEach(-1);
      
        redCG.setVelocityXEach(0);
        redCG.setLifetimeEach(-1);
        
       
         if(keyDown("UP_ARROW")) {
           reset();
        }
    }
    }
    
    function players (){
            player1 =createSprite(1100,Math.round(random(50, 250)));
            player1.scale =0.06;
            player1.velocityX = -(6 + 2*distance/150);
            player1.addAnimation(oppCoinImg);
            player1.setLifetime=170;
            pinkCG.add(player1);
    }
    
    function yellowCyclists(){
            player2 =createSprite(1100,Math.round(random(50, 250)));
            player2.scale =0.06;
            player2.velocityX = -(6 + 2*distance/150);
            player2.addAnimation(oppConeImg);
            player2.setLifetime=170;
            yellowCG.add(player2);
    }
    
    function redCyclists(){
            player3 =createSprite(1100,Math.round(random(50, 250)));
            player3.scale =0.06;
            player3.velocityX = -(6 + 2*distance/150);
            player3.addAnimation(oppLeafImg);
            player3.setLifetime=170;
            redCG.add(player3);
    }
    function reset(){
        gameState = END;
        gameOver.visible = true;
       mainPlayer.addAnimation(mainPlayer2Img);
        
       pinkCG.destroyEach();
        yellowCG.destroyEach();
        redCG.destroyEach();
        
        distance = 50;

}


}