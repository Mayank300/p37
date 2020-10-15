 
var monkey_running,monkey;
var banana_img;
var  stone_img;
var  jungle_img,hider,gameOver;
var score = 0;

function preload(){
  monkey_running= loadAnimation("Monkey_01.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  banana_img = loadImage("banana.png");
  stone_img = loadImage("stone.png");
  jungle_img = loadImage("jungle.jpg");
 }

function setup() {
  createCanvas(900, 690);

  jungle = createSprite(1200,50,100,100);
  jungle.addImage("jungle",jungle_img);
 // jungle.x = jungle.width /2;
  //jungle.velocityX = -13;
  jungle.scale = 2;

  score = score+Math.round(getFrameRate ()/60);
  text("SCORE: " + score,500,50);
  
  monkey = createSprite(150,550,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.3;
  
  invisibleGround = createSprite(width/2,580,1200,10);
  invisibleGround.visible = false;
  
  bananaGroup =  new Group();
  stoneGroup =  new Group();

  hider = createSprite(width/2,height/2,900,900);
  hider.visible = false;
  hider.shapeColor = "black"
}

function draw() {
  background(220);
  
  camera.position.x = canvasHeight/2;
  camera.position.y = monkey.y-1;

  if(keyDown("space") && monkey.y >= 280){
      monkey.velocityY = -16 ;
  }
  monkey.velocityY = monkey.velocityY + 0.6;
  
   if(jungle.x<0){
        jungle.x= jungle.width/2;
     }
  
  if(stoneGroup.isTouching(monkey)){
      monkey.destroy();
      hider.visible = true;
    }
  
  if(bananaGroup.isTouching(monkey)){
      score = score+2;
      bananaGroup.destroyEach();
  }
  
  
  monkey.collide(invisibleGround);
  stoneGroup.collide(invisibleGround);
  spawnBanana();
  spawnStone();
  drawSprites();  
  fill("white");
  textSize (60);
  text("SCORE: " + score,300,80);
}


 function spawnBanana(){
    if(frameCount % 80 ===0){
     var banana = createSprite(500,(random(260,350)));
       banana.addImage("banana",banana_img);
       banana.scale = 0.1;
       banana.velocityX = -2;
       banana.lifetime = 120;
       bananaGroup.add(banana);
       banana.depth = hider.depth;
       hider.depth = hider.depth + 1;
    }
  }
  
function spawnStone() {
  if (frameCount % 100 === 0) {
    var stone = createSprite((random(700,1000)),550,10,40);
     stone.velocityX = -6;
     stone.setCollider("circle",0,0,150);
     stone.addImage("stone",stone_img);
     stone.scale = 0.255;
     stone.lifetime = 180;
     stoneGroup.add(stone);
     stone.depth = hider.depth;
     hider.depth = hider.depth + 1;
  }
}
  







