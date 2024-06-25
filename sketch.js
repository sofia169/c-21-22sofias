var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
var score = 0;


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}


function draw() {
  background("black");

//escribir aquí el código para mover el fantasma hacia arriba al presionar la flecha hacia arriba
    if(tower.y > 400){
      tower.y = 300
    }
    
  if (gameState === "play") {    
    score = score + Math.round(getFrameRate()/60);
    
    if(keyDown("left_arrow")){  
      //escribir aquí el código para mover el fantasma a la izquierda al presionar la flecha izquierda
      ghost.x = ghost.x - 3;
    }
    if(keyDown("right_arrow")){    
      //escribir aquí el código para mover el fantasma a la derecha al presionar la flecha derecha
      ghost.x = ghost.x + 3;
    }
    if(keyDown("space")){ 
      ghost.velocityY = -5;
    }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
   
      //escribir una condición para desplazar infinitamente la torre

      
    
      spawnDoors();

  
  //escribir el código para hacer que climbersGroup colisione con el fantasma y cambiar la velocidad del fantasma  
  if(climbersGroup.isTouching(ghost)){
    //score = score + 1;
    ghost.velocityY = 0;
    
    //score += 1
  }
  //escribir aquí el código para hacer que invisibleBlockGroup colisione con el fantasma, destruir el fantasma y cambiar gamestate a end.
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600 ){
    ghost.destroy();
    gameState = "end"
  }
  
  drawSprites();
  fill("white");
  textSize(30);
  text("Puntuación " + score, 320, 50);
}
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Fin del juego", 230,250)
    score = 0;
  }
}

function spawnDoors()
 {
  //escribir aquí el código para aparecer los obstáculos
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    door.x = Math.round(random(120,400));
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    //agregar la función random
    //
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    //Posicion del climber con la puerta
    climber.x = door.x;
    invisibleBlock.x = climber.x;
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    //cambiar la profundidad del fantasma y de la puerta
    ghost.depth = door.depth;
    ghost.depth +=1;
    
     

    
    //asignar lifetime a obstacle.lifetime = 300; aquí los obstáculos son la puerta, la barandilla y el bloque invisible
    door.lifetime = 800; 
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800; 

    //agregar cada obstáculo al grupo obstaclesGroup.add(obstacle);aquí los obstáculos son la puerta, la barandilla y el bloque invisible
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
