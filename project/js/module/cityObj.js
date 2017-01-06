
var cityObj = Object.create(searchObj); //原型继承

cityObj  = $.extend(cityObj, {
	name: '城市选择页',
	dom: $('#city'),
	init: function(){
		//模块初始化的方法
		this.onEvent();  //绑定它自己应该绑定的事件	
	},
	onEvent: function(){
		// console.log(1)
		$.ajax({
			url:'/v1/cities',
			type: 'get',
			data : {
				type:'hot'
			},
			success:function( res ){
				var html = '';
					for( var i = 0; i < res.length; i++){
						html +='<li>'+res[i].name+'</li>';
					}
					$('#list2').html(html);
			},
				error: function(){
					console.log('我请求失败了');	 	
				}
		})
		$.ajax({
			url:'/v1/cities',
			type: 'get',
			data : {
				type:'group'
			},
			success:function( res ){
				// console.log(res)
				var html = '';
				// var arr= [];
				for(var i = 0;i<26; i++){
					if(i != 8 && i != 14 && i != 20 && i != 21){
						var num = String.fromCharCode(65 + i);
						console.log(num)
						var obj = res[num];
						// console.log( typeof arr)
						for( var j = 0; j < obj.length;j++){
							// console.log(arr[0].name)	
							html +='<li>'+obj[j].name+'</li>';
						}
					}

				}$('#list3').html(html);
			},
				error: function(){
					console.log('我请求失败了');	 	
				}
		})
	} 
})
