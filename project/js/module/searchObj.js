//每个模块（对象）它们都有自己属性以及方法
var searchObj = {
	name: '地址搜索页',
	dom: $('#search'),
	init: function(){
		//模块初始化的方法
		this.onEvent();  //绑定它自己应该绑定的事件	
	},
	onEvent: function(){
	},
	enter: function(){
		//进入该模块
		this.dom.show();
	},
	leave: function(){
		//离开该模块
		this.dom.hide(); 	
	}
}