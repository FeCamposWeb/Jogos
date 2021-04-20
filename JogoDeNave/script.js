var dirJy,dirJx,jog,velJ,pjx,pjy;
var tamTelaW,tamTelaH;
var jogo;
var frames;
var velt;
var contBombas,painelContBomba,velB,tmpCriaBomba;
var bombaTotal;
var vidaPlaneta,barraPlaneta;
var ie,isom;
var expl=[];
var telaMsg;


function teclaDw(){
    var tecla=event.keyCode;
    if(tecla==38){
        dirJy=-1;
    }else if(tecla==40){
        dirJy=+1;
    }else if(tecla==37){
        dirJx=-1;
    }else if(tecla==39){
        dirJx=+1;
    }else if(tecla==32){
        atira(pjx+21,pjy);
    }
}
function teclaUp(){
    var tecla=event.keyCode;
    if((tecla==38) || (tecla==40)){
        dirJy=0;
    }
    if((tecla==37) || (tecla==39)){
        dirJx=0;
    }

}

function criaBomba(){
    if(jogo){
        var y=0;
        var x=Math.random()*tamTelaW;
        var bomba=document.createElement("div");
        var attt1=document.createAttribute("class");
        var attt2=document.createAttribute("style");
        attt1.value="bomba";
        attt2.value="top:"+y+"px;left:"+x+"px";
        bomba.setAttributeNode(attt1);
        bomba.setAttributeNode(attt2);

        document.body.appendChild(bomba);
        contBombas--;

    }
}

function controlaBomba(){
    bombaTotal=document.getElementsByClassName("bomba");
    var tam=bombaTotal.length;
    for(var i=0; i<tam;i++){
        if(bombaTotal[i]){
            var pi=bombaTotal[i].offsetTop;
            pi+=velB;
            bombaTotal[i].style.top=pi+"px";
            if(pi>tamTelaH){
                vidaPlaneta-=10;
                criaExplosao(2,bombaTotal[i].offsetLeft,null);
                bombaTotal[i].remove();
            }
        }
    }

}

function atira(x,y){
    var t=document.createElement("div");
    var attt1=document.createAttribute("class");
    var attt2=document.createAttribute("style");
    var attt3=document.createAttribute("src");
    attt1.value="tiroJog";
    attt2.value="top:"+y+"px;left:"+x+"px";
    t.setAttributeNode(attt1);
    t.setAttributeNode(attt2);

    document.body.appendChild(t);
}

function controleTiro(){
    var tiros=document.getElementsByClassName("tiroJog");
    var tam=tiros.length;
    for(var i=0;i<tam;i++){
        if(tiros[i]){
            var pt=tiros[i].offsetTop;//pegar a posiçao do tiro
            pt-=velt;
            tiros[i].style.top=pt+"px";
            colisaoTiroBomba(tiros[i]);
            if(pt<0){
                tiros[i].remove();
            }
        }
    }
}

function criaExplosao(tipo,x,y){
    var explosao=document.createElement("div");
    var son=document.createElement("audio");
    
    var attt1=document.createAttribute("class");
    var attt2=document.createAttribute("style");
    var attt3=document.createAttribute("id");


    var attt5=document.createAttribute("src");
    var attt6=document.createAttribute("id");

    attt3.value="explosao"+ie;
    

    if(tipo==1){
        attt1.value="explosao";
        attt2.value="top:"+y+"px;left:"+(x +48)+"px";
    }else{
        attt1.value="explosao";
        attt2.value="top:"+(tamTelaH-48)+"px;left:"+(x)+"px";
    }

    attt5.value="sons/bomba1.wav";
    attt6.value="som"+isom;

    explosao.setAttributeNode(attt1);
    explosao.setAttributeNode(attt2);
    explosao.setAttributeNode(attt3);

    son.setAttributeNode(attt5);
    son.setAttributeNode(attt6);

    explosao.appendChild(son);
    
    expl[ie]=document.body.appendChild(explosao);
    var tam=expl.length;
    if(ie>=1){
        expl[ie-1].remove();
    }
    document.getElementById("som"+isom).play();
    ie++;
    isom++;

    //att4.value="explosao_chau.gif?"+new Date(); caso usacemos gif para gerar novas imagens
    
}

function colisaoTiroBomba(tiro){
    var tam=bombaTotal.length;
    for(var i=0; i<tam;i++){
        if(bombaTotal[i]){
            if(
                (
                    (tiro.offsetTop<=(bombaTotal[i].offsetTop+48))&&
                    ((tiro.offsetTop+6)>=(bombaTotal[i].offsetTop))

                )
                &&
                (
                    (tiro.offsetLeft<=(bombaTotal[i].offsetLeft+48))&&
                    ((tiro.offsetLeft+6)>=(bombaTotal[i].offsetLeft))
                )
            ){
                criaExplosao(1,bombaTotal[i].offsetLeft-48,bombaTotal[i].offsetTop)
                bombaTotal[i].remove();
                tiro.remove();
            }
        }
    }
}

function controlaJogador(){
    pjy+=dirJy*velJ;
    pjx+=dirJx*velJ;
    jog.style.top=pjy+"px";
    jog.style.left=pjx+"px";
}

function gerenciaGame(){

    barraPlaneta.style.width=vidaPlaneta+"px";
    if(contBombas<=0){
        jogo=false;
        clearInterval(tmpCriaBomba);
        telaMsg.style.backgroundImage="url('imagens/vitoria.jpg')";
        telaMsg.style.display="block";
    }
    if(vidaPlaneta<=0){
        jogo=false;
        alert("gameover");
        clearInterval(tmpCriaBomba);
        telaMsg.style.backgroundImage="url('imagens/gameover.jpg')";
        telaMsg.style.display="block";
    }

}

function gameLoop(){
    if(jogo){

        controlaJogador();
        controleTiro();
        controlaBomba();
        gerenciaGame();

    }
    frames=requestAnimationFrame(gameLoop);
}

function reinicia(){

    bombaTotal=document.getElementsByClassName("bomba");
    var tam=bombaTotal.length;
    for(var i=0; i<tam;i++){
        if(bombaTotal[i]){
           bombaTotal[i].remove();
        }
    }

    telaMsg.style.display="none";
    clearInterval(tmpCriaBomba);
    cancelAnimationFrame(frames);
    vidaPlaneta=300;
    pjx=tamTelaW/2;
    pjy=tamTelaH/2;
    jog.style.top=pjy+"px";
    jog.style.left=pjx+"px";
    contBombas=150;
    jogo=true;

    tmpCriaBomba=setInterval(criaBomba,1700);
    gameLoop();

}

function inicia(){
    jogo=false;
    tamTelaH=window.innerHeight;
    tamTelaW=window.innerWidth;
    dirJx=dirJy=0;
    pjx=tamTelaW/2;
    pjy=tamTelaH/2;
    velt=velJ=5;
    velB=3;
    jog=document.getElementById("naveJog");
    jog.style.top=pjy+"px";
    jog.style.left=pjx+"px";

    contBombas=150;

    vidaPlaneta=300;
    barraPlaneta=document.getElementById("barra");
    barraPlaneta.style.width=vidaPlaneta+"px";


    isom=ie=0;

    telaMsg=document.getElementById("telaMsg");
    telaMsg.style.background="#fff";
    telaMsg.style.display="block";
    document.getElementById("btnJogar").addEventListener("click",reinicia);

}

window.addEventListener("load",inicia);
document.addEventListener("keydown",teclaDw);
document.addEventListener("keyup",teclaUp);
