//每个模块（对象）它们都有自己属性以及方法
var searchObj = {
	name: '地址搜索页',
	dom: $('#search'),
	init: function(){
		//模块初始化的方法
		this.onEvent();  //绑定它自己应该绑定的事件	
	},
	onEvent: function(){
		var parcel = $('#parcel');
		var ele = $('#ele');
		ele.on('click',function(){
			// $('#list').html();
			var word = $('.txt').val();
			$.ajax({
				url:'/v1/pois',
				type:'get',
				data:{
					city_id: 1,
					keyword: word,
					type: 'search'
				},
				success:function( res ){
					var html = '';
					for( var i = 0; i < res.length; i++){
						html +='<li>'+res[i].name+'</li>';
					}
					$('#list1').html(html);
				},
				error: function(){
					console.log('我请求失败了');	 	
				}
			})
		})
		parcel.on('click',function(){
			// $('#list').html();
			var word = $('.txt').val();
			$.ajax({
				url:'/waimai',
				type:'get',
				dataType:'json',
				data:{
					qt:'poisug',
					wd: word,
					cb:'suggestion_1483600579740',
					cid:289,
					b:'',
					type:0,
					newmap:1,
					ie:'utf-8'
				},
				success:function( res ){
					var html = '';
					for( var i = 0; i < res.s.length; i++){
						html +='<li>'+res.s[i]+'</li>';
					}
					$('#list1').html(html);
				},
				error: function(){
					console.log('我请求失败了');	 	
				}

			})
		})
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