
var cityObj = Object.create(searchObj); //原型继承

cityObj  = $.extend(cityObj, {
	name: '城市选择页',
	dom: $('#city')
})
