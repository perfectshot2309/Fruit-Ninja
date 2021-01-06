var PLAY=1;
var END=0;
var gameState=1;
var knife, knife_image, monster, monster_image, fruit1_image, fruit2_image, fruit3_image, fruit4_image, fruitGroup, enemyGroup, gameOver, gameOver_image;
var score;

function preload(){
  knife_image=loadImage("sword.png");
  monster_image=loadAnimation("alien1.png","alien2.png");
  fruit1_image=loadImage("fruit1.png");
  fruit2_image=loadImage("fruit2.png");
  fruit3_image=loadImage("fruit3.png");
  fruit4_image=loadImage("fruit4.png");
  gameOver_image=loadImage("gameover.png");
  gameOver_sound=loadSound("gameover.mp3");
  knife_sound=loadSound("knifeSwooshSound.mp3");
}

function setup(){
  knife=createSprite(200,200,10,10);
  knife.addImage(knife_image);
  knife.scale=0.5;
  //knife.debug=true;
  knife.setCollider("rectangle",0,0,40,40);
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
}

function draw(){
  background("lightblue");
  textSize=20;
  fill("black");
  text("Score:"+score,180,20);
  if (gameState===PLAY){
    fruits();
    enemy();
    knife.x=mouseX;
    knife.y=mouseY;
  }
  if (knife.isTouching(fruitGroup)){
    fruitGroup.destroyEach();
    knife_sound.play();
    score=score+1;
  }
  if (knife.isTouching(enemyGroup)){
    enemyGroup.destroyEach();
    knife.destroy();
    gameOver=createSprite(200,200,20,20);
    gameOver.addImage(gameOver_image);
    gameOver.scale=1;
    gameState=END;
    gameOver_sound.play();
  }
  drawSprites();
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20)
    fruit.scale=0.2;
    position = Math.round(random(1,2));
    if(position===1){
      fruit.x=400;
      fruit.velocityX=-(7+(score/4));
    }else if(position===2){
      fruit.x=0;
      fruit.velocityX= (7+(score/4));
    }
    r=Math.round(random(1,4));
    if(r===1){
      fruit.addImage(fruit1_image);
    }else if(r===2){
      fruit.addImage(fruit2_image);
    }else if(r===3){
      fruit.addImage(fruit3_image);
    }else if(r===4){
      fruit.addImage(fruit4_image);
    }
    fruit.y=Math.round(random(50,350));
    fruit.velocityX=-(5+(score/5));
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
  }
}

function enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monster_image);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;    
    enemyGroup.add(monster);
  }
}