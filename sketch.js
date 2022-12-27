var bg_img;
var naveimg,nave1;
var vx=0;
var vy=0;
var g=0.05;
var bomb_explosion;
var met1,met2;
var bomb1;
var enemie;
var missel,explosao;
var enemiesGroup;
var gameState="play";
var score;
var misselGroup;
var explosion1;
var explosion;
var medalha1, medalha2;
var medalha1Img,medalha2Img;


function preload(){
  bg_img = loadImage("assets/bg.png")

  naveimg = loadImage("assets/nave.png")

  explosion=loadAnimation("assets/Bomb_02_1.png","assets/Bomb_3_Explosion_004.png",
  "assets/Bomb_3_Explosion_008.png");

  met1=loadImage("assets/Meteor_02.png");
  met2=loadImage("assets/Meteor_05.png");

  bomb1=loadImage("assets/Bomb_3_Explosion_000.png");

  miss1=loadImage("assets/Missile_1_Flying_000.png");

  medalha1Img=loadImage("assets/Damage_Bonus.png");
  medalha2Img=loadImage("assets/HP_Bonus.png");

}

function setup(){
  createCanvas(windowWidth,windowHeight);
  nave1=createSprite(100,500,40,40)
  nave1.addImage(naveimg);
  nave1.addAnimation("explosion",explosion);
  nave1.scale=0.5
  enemiesGroup=new Group();
  misselGroup= new Group();
  nave1.debug=true;
  score=0;


  medalha1=createSprite(320,50);
  medalha1.addImage(medalha1Img);
  medalha1.scale=0.3;
  medalha1.visible=false;

  medalha2=createSprite(420,50);
  medalha2.addImage(medalha2Img);
  medalha2.scale=0.3;
  medalha2.visible=false;

}

function draw() {
  background(bg_img);
  textSize(40);
  fill("#F5F5F5")
  textFont("Cascadia Code")
  text("score: "+score,50,50);
  vy+=g;
  nave1.y=World.mouseX;
  if(keyWentDown("space")){
    missel=createSprite(nave1.x,nave1.y,50,50)
    missel.addImage(miss1);
    missel.scale=0.2;
    missel.velocityX=10;
    misselGroup.add(missel);
  }


  enemies();
  if(enemiesGroup.isTouching(nave1)){
    enemiesGroup.setVelocityXEach(0);
   // nave1.visible=false;
    nave1.changeAnimation('explosion');
    gameOver();
  }


  //colocar a explosão 72 var explosion=
  if(enemiesGroup.isTouching(misselGroup)){
    for(var i=0;i<enemiesGroup.length; i++){
      if(enemiesGroup.isTouching(misselGroup)){
        enemiesGroup[i].destroy();
        misselGroup[i].destroy();
        score+=10;
      }
    }
  }


if(score>=1000 && score<2000){
  medalha1.visible=true;

} else if(score>=2000){
  medalha2.visible=true
}

  

  drawSprites();
}



  function enemies(){
    if(frameCount%70===0){
      enemie=createSprite(width+200,Math.round(random(50,height-50)))
      enemie.velocityX=-5;
      enemie.rotationSpeed=0.3;
      enemie.scale=0.3
      var rand=Math.round(random(1,3));
      switch (rand) {
        case 1:enemie.addImage(met1)
          break;
        case 2:enemie.addImage(bomb1)
          break;
        case 3:enemie.addImage(met2)
          break;
        default:
          break;
      }
      enemiesGroup.add(enemie);
      enemie.debug=false;
      enemie.setCollider("circle",0,0,120);
    }
  }
  function gameOver(){ 
    swal(
    { title: `Fim de Jogo!!!`,
      text: "Obrigada por jogar", 
      imageUrl: "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize:"150x150", 
      confirmButtonText: "Jogar novamente" },
      function(isConfirm){
        if(isConfirm){
          location.reload(); 
          }
        } 
    ); 
}