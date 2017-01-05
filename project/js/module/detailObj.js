var detailObj = Object.create(searchObj); //原型继承
//$.extend 进行对象与对象的合并
detailObj  = $.extend(detailObj, {
	name: '餐厅详情页',
	dom: $('#detail')
})
