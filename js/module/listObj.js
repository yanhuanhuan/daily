var listObj = Object.create( searchObj );  //原型继承
 listObj = $.extend(listObj,{
 	name : '餐厅列表页',
 	dom : $('#list')
 })