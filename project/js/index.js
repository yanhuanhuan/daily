

//创建一个hash值 与模块 映射关系表
var hashMap = {
	'search': searchObj,
	'list': listObj,
	'detail': detailObj,
	'city': cityObj
}


var prevModule = null; //前一个模块
var curModule = null;  //当前模块

function routeController(hash){
	//路由控制方法  hash = address  hash = citylist
	var module = hashMap[hash] || hashMap['search']; // 得到对应hash值的对应的模块对象
	prevModule = curModule; 
	curModule = module; 
	if(prevModule) {
		prevModule.leave(); 
	}
	curModule.enter();

}

if(location.hash) {
	var hash = location.hash.slice(1); 
	routeController(hash);
}else {
	routeController('search');
}
window.onhashchange = function(){
	var hash = location.hash.slice(1); 
	routeController(hash) 	
}