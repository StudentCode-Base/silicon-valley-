 var fighter_plane,Plane_img;
 var asteroids,asteroidsImg;
var earth,earthImg;
var bg,bgImg;
var bullet,bulletImg;
var  blastImg;
var heart1,heart2,heart3;
var heart1Img,heart2Img,heart3Img;
var score=0;
var life=3;
var gameState="play";
var blastSound , checkPointSound, dieSound;


 function preload(){
  Plane_img=loadImage("fighter.plane.png");
  asteroidsImg=loadImage("asteroids.png");
  earthImg=loadImage("earth.png");
  bgImg=loadImage("background.jpg");
  bulletImg = loadImage("bullet1.png");
  heart1Img=loadImage("heart_1.png");
heart2Img=loadImage("heart_2.png");
heart3Img=loadImage("heart_3.png");
checkPointSound = loadSound("checkPoint.mp3");
blastSound = loadSound("blast.mp3");
dieSound = loadSound("die.mp3");

 }
 
 
 function setup() {
  createCanvas(windowWidth,windowHeight);

  bg=createSprite(displayWidth/2,displayHeight/2,1000,1000);
  bg.addImage(bgImg);
bg.velocityY=1;

  fighter_plane=createSprite(displayWidth/2,displayHeight/2+50,30,30);
  fighter_plane.addImage(Plane_img);
  fighter_plane.scale=0.08;
  
  
  earth=createSprite(displayWidth/2,displayHeight/2+350,30,30);
  earth.addImage(earthImg);
  earth.debug=false;
  earth.setCollider("circle",0,280,440);

  heart1=createSprite(displayWidth-140,40,20,20);
heart1.addImage(heart1Img);
heart1.scale=0.4;

heart2=createSprite(displayWidth-100,40,20,20);
heart2.addImage(heart2Img);
heart2.scale=0.4;

heart3=createSprite(displayWidth-140,40,20,20);
heart3.addImage(heart3Img);
heart3.scale=0.4;



  bulletG = new Group();   
 asteroidsG = new Group(); 

 scoreboard= createElement("h1");
}

function draw() {
  background(255,255,255,);

  
  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,50)
 

  if(gameState==="play"){
    
    if(life===3){
    heart3.visible=true;
    heart2.visible=false;
    heart1.visible=false;
    }
    if(life===2){
        heart2.visible=true;
        heart3.visible=false;
        heart1.visible=false;
        }
        if(life===1){
            heart1.visible=true;
            heart2.visible=false;
            heart3.visible=false;
            }
            
    if(life===0){
        gameState="lost";
        heart1.visible=false;
        heart2.visible=false;
        heart3.visible=false;
      }
      if(score===1000){
        gameState="win";
    }
    if(bg.y>500){
      bg.y=400;
    }
      if(keyDown(LEFT_ARROW)){
        fighter_plane.x=fighter_plane.x-(5+3*score/100);;
    }
    if(keyDown(RIGHT_ARROW)){
      fighter_plane.x=fighter_plane.x+(5+3*score/100);;
    }
    if(keyWentDown("space")){
      shootBullet();
    }
   
    spawnAsteroids();
    

    if (asteroidsG.isTouching(bulletG)){
      for(var i=0;i<asteroidsG.length;i++){
          if(asteroidsG[i].isTouching (bulletG)){
              asteroidsG[i].destroy();
              bulletG.destroyEach();
              score=score+5;
              blastSound.play()
            } 
          }
      }
      if (score>0&&score%100===0){
        checkPointSound.play()
      }
  
      if (asteroidsG.isTouching(earth)){
        for(var i=0;i<asteroidsG.length;i++){
    if (asteroidsG[i].isTouching(earth)){
      asteroidsG[i].destroy();
      life=life-1;
    }
  }
}
      if (asteroidsG.isTouching(fighter_plane)){
        for(var i=0;i<asteroidsG.length;i++){
            if(asteroidsG[i].isTouching (fighter_plane)){
                asteroidsG[i].destroy();
                life=life-1;
    }
  }
      }
    }
  drawSprites();

  if(gameState==="lost"){
    fill ("red");
    textSize(100);
    text("GAMEOVER",displayWidth/3,displayHeight/2);
    fighter_plane.destroy();
    asteroidsG.destroyEach();
    bg.velocityY=0;
    dieSound.play();
    


}   else if(gameState==="win"){
fill("blue");
textSize(100);
text("YOU WON THE GAME",displayWidth/4-40,displayHeight/2);
fighter_plane.destroy();
asteroidsG.destroyEach();
bg.velocityY=0;


}

    }

function spawnAsteroids(){
  if(frameCount%80===0){

  asteroids=createSprite(displayWidth/2,displayHeight/2-400,20,20);
  asteroids.addImage(asteroidsImg);
  asteroids.scale=0.1;
  asteroids.x=random(200,1100);
  asteroids.y=random(2,120);
asteroids.lifetime=600;
asteroids.velocityY = (2+2*score/100);
  asteroidsG.add(asteroids);
  asteroids.debug=false;
  
  }
}
function shootBullet(){
  bullet= createSprite(displayWidth/2+100,displayHeight/2-100, 50,20)
  bullet.x= fighter_plane.x-2;
  bullet.addImage(bulletImg)
  bullet.scale=0.1
  bullet.velocityY=-(2+2*score/100);
  bulletG.add(bullet);
}



