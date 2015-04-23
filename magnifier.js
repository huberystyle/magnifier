/*
 jQuery plugin magnifier v2.0
 Author: Hu Yicheng
 update:2014-05-12
 usage:$("selector").magnifier();
*/

(function($){
$.fn.magnifier = function(){
	var obj = $(this),nativeWidth = 0,nativeHeight = 0,currentWidth = 0,currentHeight = 0,$magnifier,$image = obj.children("img").eq(0);
	var zoomObj = {
		resetHtml:function(obj){
			obj.prepend("<div class='magnifier'></div>");
			$magnifier =  $(".magnifier");
		},
		bind:function(obj){
			obj.mousemove(function(e){
				if(!nativeWidth && !nativeHeight){
					var imgObj = new Image();
					imgObj.src = $image.attr("src");
					nativeWidth = imgObj.width;
					nativeHeight = imgObj.height;
					currentWidth = $image.width();
					currentHeight = $image.height();
				}else{
					var magnifier_offset = obj.offset(),mx = e.pageX - magnifier_offset.left,my = e.pageY - magnifier_offset.top;
					$("#ddd").html("mx:"+mx+"<br>my:"+my);
					if(mx < $(this).width() && mx > 0 && my < $(this).height() && my > 0){
						$magnifier.fadeIn(100);
					}else{
						$magnifier.fadeOut(100);
					}
					if($magnifier.is(":visible")){
						var rx = Math.round(mx / $image.width() * nativeWidth - $magnifier.width() / 2) * -1,
						ry = Math.round(my / $image.height() * nativeHeight - $magnifier.height() / 2) * -1,
						bgp = rx + "px " + ry + "px",
						px = mx - $magnifier.width() / 2,
						py = my - $magnifier.height() / 2;
						$magnifier.css({left: px,top: py,backgroundPosition: bgp});
					}
					
				}
			});
		},
		init:function(){
			this.resetHtml(obj);
			this.bind(obj);
		}
	};
	zoomObj.init(obj);
};

})(jQuery);