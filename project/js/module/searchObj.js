//每个模块（对象）它们都有自己属性以及方法
var searchObj = {
	name: '地址搜索页',
	dom: $('#search'),
	init: function(){
		//模块初始化的方法
		this.onEvent(); 
		//绑定它自己应该绑定的事件	
	},
	onEvent: function(){
		
		$('#list1').on('click','a',function(event){
			// console.log(1)
			event.preventDefault(); //阻止它的默认事件
			var addinfo = {
				lat: this.dataset.lat,
				lng: this.dataset.lng,
				geo: this.dataset.geo
			}
			storage('listdata', addinfo);
			location.href = '#list-' + this.dataset.geo;  	
		});
		var elethis = this;
		var parcel = $('#parcel');
		var ele = $('#ele');
		ele.on('click',function(){
			// $('#list').html();
			var word = $('.txt').val();
			$.ajax({
				url:'/v1/pois',
				type:'get',
				data:{
					city_id: elethis.cityID || 1,
					keyword: word,
					type: 'search'
				},
				success:function( res ){
					console.log(res)
					var html = '';
					for( var i = 0; i < res.length; i++){
						html +='<li><a id="add" data-geo="'+res[i].geohash+'" data-lng="'+ res[i].longitude +'" data-lat="'+ res[i].latitude +'"   href="#rlist"">'+res[i].name+'<p class="address">'+res[i].address+'</p></a></li>';
					}
					// console.log(res[1].geohash)
					$('#list1').html(html);
				},
				error:function(){
					console.log('我请求失败了');	 	
				}
			})
		});
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
					cid:  elethis.bdcityID || 289,
					b:'',
					type:0,
					newmap:1,
					ie:'utf-8'
				},
				success:function( res ){
					var html = '';
					var arr = [];
					var arr1 = [];
					// var arr2 = [];
					for( var i = 0; i < res.s.length; i++){
						console.log(res.s[i])
						var asplit = res.s[i].split('$');
						arr1.push(asplit[3]);
						arr.push( asplit[0]+ asplit[1]+asplit[3] );
						html +='<li><a href="#list-'+ res.s[i].latitude +'-'+ res.s[i].longitude +'">'+arr1[i]+'<p class="address">'+arr[i]+'</p></a></li>';
					}
					$('#list1').html(html);
				},
				error: function(){
					console.log('我请求失败了');	 	
				}
			})
		})
	},
	changeCity:function( name ){
		// console.log(name)
		var cityname = name.split('-')[1] || '上海';
		// console.log(cityname)
		cityname +='<a href="#city">切换城市</a>';
		$('.cityname').html(cityname);
		this.cityID = name.split('-')[2];
		this.bdcityID = name.split('-')[3];
	},
	enter: function(){
		//进入该模块
		this.dom.show();
	},
	leave: function(){
		//离开该模块
		this.dom.hide(); 	
	}
	// https://fuss10.elemecdn.com/7/b6/235761e50d391445f021922b71789jpeg.jpeg?imageMogr/format/webp/
}