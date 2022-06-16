var trex, trex_correndo, solo;
var nuvemimg
var soloimg
var soloinvisivel
var cactus1, cactus2, cactus3, cactus4, cactus5, cactus6
var pontos = 0
var JOGAR = 1
var FIM = 0
var estado = JOGAR
var grupo_zawarudo1
var grupo_zawarudo2
var defunto
var meianove
var lol
var lol_img
var meianove_img
var scarlet
var reptile
var frost




function preload() {
  soloimg = loadImage('solo2.png')
  trex_correndo = loadAnimation('trex1.png', 'trex3.png', 'trex4.png');
  nuvemimg = loadImage('nuvem.png')
  defunto = loadAnimation('trex_colidiu.png')
  lol_img = loadImage('fimDoJogo.png')
  meianove_img = loadImage('reiniciar.png')
  scarlet = loadSound('checkPoint.mp3')
  reptile = loadSound('morte.mp3')
  frost = loadSound('pulo.mp3')



  cactus1 = loadImage('obstaculo1.png')
  cactus2 = loadImage('obstaculo2.png')
  cactus3 = loadImage('obstaculo3.png')
  cactus4 = loadImage('obstaculo4.png')
  cactus5 = loadImage('obstaculo5.png')
  cactus6 = loadImage('obstaculo6.png')
}
function setup() {
  grupo_zawarudo1 = new Group()
  grupo_zawarudo2 = new Group()
  meianove = createSprite(300, 130)
  meianove.addImage(meianove_img)
  lol = createSprite(300, 60)
  lol.addImage(lol_img)

  //cria a tela
  createCanvas(600, 200);

  //cria sprite do T-Rex
  trex = createSprite(50, 60, 20, 50);
  trex.scale = 0.5;
  trex.x = 50;
  trex.debug = false
  trex.setCollider('circle', 0, 0, 43)

  meianove.visible = false
  lol.visible = false
  //adiciona a animação de T-Rex correndo ao sprite
  trex.addAnimation('correndo', trex_correndo);
  trex.addAnimation('defunto', defunto);

  //cria solo
  solo = createSprite(300, 190, 1200, 20);
  solo.addImage('solo', soloimg)
  //aprendendo sobre console.log
  //escreve o nome do jogo no terminal
  console.log("T-Rex corredor");
  soloinvisivel = createSprite(300, 200, 1200, 20)
  soloinvisivel.visible = false
}

function draw() {

  //fundo branco
  background("white");
  text('score: ' + pontos, 500, 20)

  drawSprites();

  //T-Rex pula ao apertar espaço




  if (estado == JOGAR) {
    procriarnuvens()
    if (pontos % 100 === 0 && pontos > 0) {
      scarlet.play()

    }



    pontos = Math.round(pontos + frameRate() / 60);
    if (keyDown('space') && trex.y > 164) {
      frost.play()
      trex.velocityY = -12;
    }
    if (solo.x < 0) {
      solo.x = solo.width / 2
    }
    solo.velocityX = -(6 + pontos * 3 / 100)
    trex.velocityY = trex.velocityY + 0.7;
    trex.collide(soloinvisivel);
    procriarcactus()

    if (trex.isTouching(grupo_zawarudo1)) {
      estado = FIM
      reptile.play()

    }


  } else if (estado == FIM) {
    solo.velocityX = 0
    grupo_zawarudo1.setVelocityXEach(0)
    grupo_zawarudo2.setVelocityXEach(0)
    grupo_zawarudo1.setLifetimeEach(-1)
    grupo_zawarudo2.setLifetimeEach(-1)
    trex.changeAnimation('defunto')
    trex.velocityY = 0
    meianove.visible = true
    lol.visible = true
    if (mousePressedOver(meianove)) {
      reiniciar()

    }
  }


}
function procriarnuvens() {
  if (frameCount % 60 === 0) {
    var nuvem = createSprite(600, random(40, 120))
    nuvem.addImage(nuvemimg)
    nuvem.scale = random(0.5, 0.8)
    nuvem.velocityX = -3
    trex.depth = nuvem.depth
    trex.depth += 1
    nuvem.lifetime = 220
    grupo_zawarudo2.add(nuvem)
  }
}
function procriarcactus() {
  if (frameCount % 60 === 0) {
    var cactus = createSprite(600, 175)
    cactus.velocityX = -(6 + pontos * 3 / 100)
    var num = Math.round(random(1, 6))
    switch (num) {
      case 1:
        cactus.addImage(cactus1)
        break;
      case 2:
        cactus.addImage(cactus2)
        break;
      case 3:
        cactus.addImage(cactus3)
        break;
      case 4:
        cactus.addImage(cactus4)
        break;
      case 5:
        cactus.addImage(cactus5)
        break;
      case 6:
        cactus.addImage(cactus6)
        break;

      default:
        break;
    }
    cactus.scale = 0.5
    cactus.lifetime = 110
    grupo_zawarudo1.add(cactus)
    meianove.depth = cactus.depth + 1
    lol.depth = cactus.depth + 1



  }








}




function reiniciar() {
  estado = JOGAR
  grupo_zawarudo1.destroyEach()
  grupo_zawarudo2.destroyEach()
  meianove.visible = false
  lol.visible = false
  pontos = 0
  trex.changeAnimation('correndo')
}