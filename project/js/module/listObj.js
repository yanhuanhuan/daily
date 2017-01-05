
var listObj = Object.create(searchObj); //原型继承
//$.extend 进行对象与对象的合并
listObj  = $.extend(listObj, {
	name: '餐厅列表页',
	dom: $('#list')
})
