window.onload = function(){
	var hashMap = {
	'search' : searchObj,
	'list': listObj,
	'city' : cityObj,
	'detail' : detailObj
	}
	var preModule = null;
	var curModule = null;
	function routeController( hash ){
		var module = hashMap[hash] || hashMap['search'];
		preModule = curModule;
		curModule = module;
		if( preModule ){
			preModule.leave();
		}
		curModule.enter();
	}
	if(location.hash){
		var hash = location.hash.slice(1);
		routeController(hash);
	}else{
		routeController('search');
	}
	window.onhashchange = function(){
		var hash = location.hash.slice(1);
		routeController(hash);
	}
}
