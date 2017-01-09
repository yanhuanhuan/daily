
var listObj = Object.create(searchObj); //原型继承
//$.extend 进行对象与对象的合并
listObj  = $.extend(listObj, {
	name: '餐厅列表页',
	dom: $('#list'),
	init:function(){

	},
	loadlist:function( hash ){
		var longitude1 = hash.split('-')[1];
		var latitude1 = hash.split('-')[2];
		$.ajax({
			url:'/shopping/restaurants',
			data:{
				latitude:longitude1,
				longitude:latitude1,
				offset:0,
				limit:20,
				extras:['activities']
			},
			success:function( res ){
				console.log(res)
				var str='';
				for( var i = 0; i < res.length; i++){
					str += '<div id="box"><div class="box-left"><img class="img" src=""/></div><div class="box-right"><p class="line"><h3 class="shopname pre">'+res[i].name+'</h3><div class="support-warp"><div class="activity-warp nowarp"><i class="activitiy-ico ico"></i></div></div></p><p class="line"><div class="rate-wrap" > <div > </p> </div> <span class="rate">4.6</span> <span >月售1056单</span> </div><div class="delivery-wrap"></div></p><p class="line"><div class="moneylimit" _v-01bcfc2b=""> <span>¥0起送</span> <span >配送费¥9</span> </div><div class="timedistance-wrap" > <span class="distance-wrap">995m</span></div></p></div></div>'
				}
				$('.content').html(str);
			},
			error : function(){
				console.log('数据请求失败')
			}
		})
	}
})
