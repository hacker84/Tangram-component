/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * @path:ui/Carousel/Carousel$autoScroll.js
 * @author:linlingyu
 * @version:1.0.0
 * @date:2010-11-02
 */
///import baidu.ui.Carousel;
/**
 * 自动滚动
 */
baidu.ui.Carousel.register(function(me){
	if(me.autoScroll){//如果存在表示要启动auto-scroll
        me.onbeforestartscroll = function(evt){this.focus(evt.index);};
		me.addEventListener("afterscroll", function(){
			me.autoScroll.timeOut = setTimeout(function(){
				var index, totalPage, currPage, page;
				if("page" == me.autoScroll.type.toLowerCase()){
					totalPage = Math.ceil(me.totalCount / me.pageSize);
					currPage = Math.ceil((me.scrollIndex + 1) / me.pageSize);
					page = currPage >= totalPage ? (me.isCycle ? 1 : totalPage) : currPage + 1;
					index = (page - 1) * me.pageSize;
				}else{
					index = me.scrollIndex >= me.totalCount - 1 ? (me.isCycle ? 0 : me.totalCount - 1) : me.scrollIndex + 1;
				}
				me.scrollTo(index);
			}, me.autoScroll.interval);
		});
	}
	me.addEventListener("dispose", function(){//
		clearTimeout(me.autoScroll.timeOut);
	});
});