function Carousel(){
    var timer;
    var index=1;   
    var $nav;
    var bbox={
        timer:3000,
        container:'#box',
        imgSrc:['img/b1.png','img/b2.png','img/b3.png','img/b4.png','img/b5.png']
    };
    var $left=$('<span id="left"><</span>');
    var $right=$('<span id="right">></span>');
    var $nav1=$('<ul class="nav" id="nav1"></ul>');
    var $slider=$('<div class="slider" id="slider"></div>');

    this.init=function(cfg){
        
        $.extend(bbox,cfg);
        $(bbox.container).append($slider);
        $(bbox.container).append($left);
        $(bbox.container).append($right);
        $(bbox.container).append($nav1);
        function navchange(){
            $nav.siblings().removeClass('active');  
            $nav.eq(index-1).addClass('active');
        }
        var $slide=$('<div class="slide"><img src="'+bbox.imgSrc[bbox.imgSrc.length]+'" alt=""></div>');
        $slider.append($slide);
        for(var i=0;i<bbox.imgSrc.length;i++){
        var $slide=$('<div class="slide"><img src="'+bbox.imgSrc[i]+'" alt=""></div>');
        var $li=$('<li>'+(i+1)+'</li>');
        $slider.append($slide);
        $nav1.append($li);
        }
        $slide=$('<div class="slide"><img src="'+bbox.imgSrc[0]+'" alt=""></div>');
        $slider.append($slide);
        $nav=$nav1.children();
        navchange();
        timer=setInterval(next,bbox.timer);
        function front(){
        index--;
        if(index===0){
            $slider.css("left",bbox.imgSrc.length*-1200+'px');
            index=bbox.imgSrc.length;
        }else{
            $slider.stop().animate({left:index*-1200},400);
        }
        navchange();
        }
        function next(){
            index++;
            if(index===(bbox.imgSrc.length+1)){
                $slider.css("left","-1200px");
                index=1;
            }else{
                $slider.stop().animate({left:index*-1200},400);
            }
            navchange();
    
            }
        $(bbox.container).mouseover(function(){
        $left.css("opacity",0.5);
        $right.css("opacity",0.5);
        clearInterval(timer);
        })
        $(bbox.container).mouseout(function(){
        $left.css("opacity",0);
        $right.css("opacity",0);
        timer=setInterval(next,bbox.timer);
        })
        $left.click(front);
        $right.click(next);
        $nav.each(function(i){
        $($nav[i]).click(function(){
            index=$(this).index()+1;
            $slider.stop().animate({left:index*-1200},400);
            navchange()
        })
        })
    }
    
}