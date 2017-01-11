function storage(nameSpace, data){
	//多态  用同一个API,去实现不同方法（存、取操作）
	if(data) {
		//存操作
		localStorage.setItem(nameSpace, JSON.stringify(data));
		return;
	}
	return JSON.parse(localStorage.getItem(nameSpace))	 	
}

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
	var chash = hash;
	var module = hashMap[hash] || hashMap['search']; // 得到对应hash值的对应的模块对象
	if( hash.indexOf('search') !== -1){
		module = searchObj;
		chash = 'search';
		module.changeCity(hash);
	}
	if( hash.indexOf('list') !== -1){
		module = listObj;
		chash = 'list';
		module.loadReslist(hash);
	}
	if( hash.indexOf('detail') !== -1){
		module = detailObj;
		chash = 'detail';
		module.loadList(hash)
	}
	prevModule = curModule; 
	curModule = module; 
	if(prevModule) {
		prevModule.leave(); 
	}
	curModule.enter();
	curModule.init();
}

if(location.hash) {
	var hash = location.hash.slice(1); 
	routeController(hash);
}else {
	routeController('search');
}
window.onhashchange = function(){
	var hash = location.hash.slice(1); 
	routeController(hash);	
}