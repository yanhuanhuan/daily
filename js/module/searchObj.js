// 搜索页面---模块化属性和方法
var searchObj = {
	name:'餐厅搜索页',
	dom: $('#search'),
	init:function(){
		// 初始化
		this.onEvent();
	},
	onEvent:function(){
		//
	},
	enter:function(){
		this.dom.show();
	},
	leave:function(){
		this.dom.hide();
	}
}