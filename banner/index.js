$(function(){
    var index=1;
    var $box=$('#box');
    var timer;
    var htmlBox=''
            +'<div class="slider" id="slider">'
            +'<div class="slide">'
            +'<img src="img/b5.png" alt="">'
            +'</div>'
            +'<div class="slide">'
            +'<img src="img/b1.png" alt="">'
            +'</div>'
            +'<div class="slide">'
            +'<img src="img/b2.png" alt="">'
            +'</div>'
            +'<div class="slide">'
            +'<img src="img/b3.png" alt="">'
            +'</div>'
            +'<div class="slide">'
            +'<img src="img/b4.png" alt="">'
            +'</div>'
            +'<div class="slide">'
            +'<img src="img/b5.png" alt="">'
            +'</div>'
            +'<div class="slide">'
            +'<img src="img/b1.png" alt="">'
            +'</div>'
        +'</div>'
        +'<span id="left"><</span>'
        +'<span id="right">></span>'
        +'<ul class="nav" id="navs">'
            +'<li class="active">1</li>'
            +'<li>2</li>'
            +'<li>3</li>'
            +'<li>4</li>'
            +'<li>5</li>'
        +'</ul>',
    $bbox=$(htmlBox);
    $box.append($bbox);
    $left=$('#left');
    $right=$('#right');
    $slider=$('#slider');
    var oNavlist = document.getElementById('navs').children;
    var slider = document.getElementById('slider');
    function objStyle(obj, atr){
        if(obj.currentStyle){
            return obj.currentStyle[atr];
        } else {
            return getComputedStyle(obj, null)[atr];
        }
    }
    function animate(obj,json,callback){
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            var isStop = true;
            for(var atr in json){
                var now = 0;
                if(atr == 'opacity'){
                    now = parseInt(objStyle(obj,atr)*100);
                }else{
                    now = parseInt(objStyle(obj,atr));
                }
                var speed = (json[atr] - now) / 5;
                speed = speed>0?Math.ceil(speed):Math.floor(speed);
                var cur = now + speed;
                if(atr == 'opacity'){
                    obj.style[atr] = cur / 100;
                }else{
                    obj.style[atr] = cur + 'px';
                }
                if(json[atr] !== cur){
                    isStop = false;
                }
            }
            if(isStop){
                clearInterval(obj.timer);
                callback&&callback();
            }
        }, 30)
    }
    function removeNav(){
        for(var i=0;i<oNavlist.length;i++){
            oNavlist[i].className = "";
        }
        if(index>5){
            oNavlist[0].className="active";
        }
        else if(index<=0){
            oNavlist[4].className="active";
        }
        else{
            oNavlist[index-1].className="active";
        }
    }
    var box=document.getElementById('box');
    var left = document.getElementById('left');
    var right = document.getElementById('right');
    var isMoving=false;
    box.onmouseout = function(){
        animate(left,{opacity:0})
        animate(right,{opacity:0})
        timer = setInterval(goRight, 3000);
    }
    box.onmouseover=function(){
        animate(left,{opacity:50})
        animate(right,{opacity:50})
        clearInterval(timer)
    }
    left.onclick = goLeft;
    right.onclick = goRight;
    
    for( var i=0; i<oNavlist.length; i++ ){
        oNavlist[i].index = i;
        oNavlist[i].onclick = function(){
            index = this.index+1;
            removeNav();
            animate(slider,{left:-1200*index});
        }
    }
    function goLeft(){
        if(isMoving){
            return;
        }
        isMoving=true;
        index--;
        removeNav();
        animate(slider,{left:-1200*index},function(){
            if(index===0){
                slider.style.left='-6000px';
                index=5;
            }
            isMoving=false;
        });
    }
    function goRight(){
        if(isMoving){
            return;
        }
        isMoving=true;
        index++;
        removeNav();
        animate(slider,{left:-1200*index},function(){
            if(index===6){
                slider.style.left='-1200px';
                index=1;
            }
            isMoving=false;
        });
    }
})