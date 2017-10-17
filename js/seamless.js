(function($){

	var slider = function(el,userConfig){

		var _this = this;
		this.el = el;

		//参数配置
		this.userConfig = userConfig;
		this.config = {
			imgW: this.el.width(),
			index: 0,
			speed: 500,
			intervalTime: 4000
		}

		// 判断用户是否传入配置，是的话就用extend()合并配置
		if(userConfig != null){
			$.extend(this.config,this.userConfig);
		}

		//获得dom元素
		var sliderCon = this.el.children('.slider-container'),
			sliderUl = sliderCon.children('ul'),
			sliderLi = sliderUl.children('li');

		//添加左右按钮并获得按钮的dom元素
		this.el.append('<a href="javascript:" class="slider-btn slider-btn-left">&lt;</a>');
    	this.el.append('<a href="javascript:" class="slider-btn slider-btn-right">&gt;</a>');
    	var btnLeft = this.el.children('.slider-btn-left'),
    		btnRight = this.el.children('.slider-btn-right');

    	// 添加小圆点并获得dom元素
    	this.el.append('<div class="slider-dot"><ul></ul></div>');
    	var sliderDots = this.el.children('.slider-dot'),
    		sliderDotsUl = sliderDots.children('ul'),
    		dotsQuantity = sliderLi.length;
    	for(var i = 0;i < (dotsQuantity-2);i++){
    		//初始化第一个圆点的样式
    		if(i === _this.config.index){
    			sliderDotsUl.append('<li class="active"></li>');
    		}else{
    			sliderDotsUl.append('<li></li>');
    		}
    	}
    	//获得圆点dom元素
    	var sliderDotsLi = sliderDotsUl.children('li');

    	//圆点切换时改变样式
    	var dotsActive = function(i){
    		sliderDotsLi.removeClass('active');
    		sliderDotsLi.eq(i).addClass('active');
    	}

    	//初始化图片初始位置
    	sliderUl.css('left',-_this.config.index*_this.config.imgW - _this.config.imgW);

    	//左右按钮的点击事件
    	btnLeft.on('click',function(event){
    		event.preventDefault();
    		if(_this.config.index > -1){
    			resetInterval();
    			_this.config.index --;
    			if(_this.config.index != -1){
    				sliderUl.stop(true,false).animate({left:-_this.config.index*_this.config.imgW - _this.config.imgW},_this.config.speed,function(){
    					dotsActive(_this.config.index);
    				});
    			}else if(_this.config.index === -1){
    				sliderUl.stop(true,false).animate({left:-_this.config.index*_this.config.imgW - _this.config.imgW},_this.config.speed,function(){
    					sliderUl.css('left',-_this.config.imgW*(dotsQuantity-2));
    					_this.config.index = dotsQuantity-3;
    					dotsActive(_this.config.index);
    				})
    			}
    		}
    	})

    	btnRight.on('click',function(event){
    		event.preventDefault();
    		if(_this.config.index < (dotsQuantity - 2)){
    			resetInterval();
    			_this.config.index++;
    			if(_this.config.index != (dotsQuantity - 2)){
    				sliderUl.stop(true,false).animate({left:-_this.config.index*_this.config.imgW - _this.config.imgW},_this.config.speed,function(){
    					dotsActive(_this.config.index);
    				})
    			}else if(_this.config.index === (dotsQuantity-2)){
    				sliderUl.stop(true,false).animate({left:-_this.config.index*_this.config.imgW - _this.config.imgW},_this.config.speed,function(){
    					sliderUl.css('left',-_this.config.imgW);
    					_this.config.index = 0;
    					dotsActive(_this.config.index);
    				})
    			}
    		}
    	})

    	//小圆点点击事件
    	sliderDotsLi.on('click',function(event){
    		event.preventDefault();
    		resetInterval();
    		_this.config.index = $(this).index();
    		dotsActive(_this.config.index);
    		sliderUl.stop(true,false).animate({left:-_this.config.index*_this.config.imgW-_this.config.imgW},_this.config.speed);
    	})

    	//判断图片切换
    	function sliderInterval(){
    		if(_this.config.index < (dotsQuantity - 2)){
    			_this.config.index++;
    			sliderUl.stop(true,false).animate({left:-_this.config.index*_this.config.imgW-_this.config.imgW},_this.config.speed,function(){
    				dotsActive(_this.config.index);
    				if(_this.config.index === (dotsQuantity - 2)){
	    				sliderUl.css('left',-_this.config.imgW);
	    				_this.config.index = 0;
	    				dotsActive(_this.config.index);
    				}
    			})
    		}
    	}
    	//设定定时器自动切换
    	var sliderTimer = setInterval(sliderInterval,_this.config.intervalTime);

    	// 重置定时器
    	function resetInterval(){
    		clearInterval(sliderTimer);
    		sliderTimer = setInterval(sliderInterval,_this.config.intervalTime);
    	}
	}

	//拓展jQuery对象
	$.fn.extend({
		slider: function(){
			new slider($(this));
		}
	})

})(jQuery)

// 调用方法
var config = {
	index: 0,
	speed: 600,
	intervalTime: 4000
}

$('.slider').slider(config);