
var listObj = Object.create(searchObj); //原型继承
//$.extend 进行对象与对象的合并
listObj  = $.extend(listObj, {
	name: '餐厅列表页',
	dom: $('#list'),
	offset : 0,
	init:function(){

	},
	enter:function(){

		this.dom.show();
		this.onEvent();
	},
	leave:function(){
		this.dom.hide();
		window.removeEventListener('scroll' , this.scrollInfo);
	},
	scrollInfo:function( event ){
		// console.log(1)
		var me = listObj;
		if(window.scrollY + window.innerHeight === me.dom.height()){
			// console.log(1)
			me.offset += 20;
			me.loadlist(null , true)
		}
	},
	onEvent:function(){
		window.addEventListener('scroll' , this.scrollInfo);
			//轮播图的初始化
		var bullets = $("#position li");
		Swipe(document.getElementById('mySwipe'), {
	          auto: 0,
	          continuous: true,
	          disableScroll:false,
	          callback: function(pos) {
	            // console.log('滑动结束之后所执行回调函数');
	              var i = bullets.length;
	              while (i--) {
	                  bullets[i].className = ' ';
	              }
	              //为当前小数点实现高亮的处理
	              bullets[pos].className = 'cur';
	          }
	      });	
	},
	loadlist:function(locObj , flag){
		locObj = locObj || storage('listdata');
		var lat = locObj.lat;
		var lng = locObj.lng;
		var geo = locObj.geo;
		// console.log(geo)
		var me = this;
		if(!!flag === false) {
			$('.res-list').html('');
		}
		$.ajax({
			url:'/v1/pois/'+ geo,
			success:function(res){
				console.log(res)
				$('#name').html(res.name)
			}
		})	
		// console.log(lat)
		// var longitude1 = hash.split('-')[1];
		// var latitude1 = hash.split('-')[2];
		$.ajax({
			url :'v2/index_entry',
			data:{
				geohash:geo,
				group_type:1,
				flags:['F']
			},
			success:function(res){
				// console.log(res)
				var str='';
				var str1='';
				for(var i = 0; i < res.length;i++){
					if( i < 8 ){
						str +=' <a href="javascript:"><div class="container"><img src="//fuss10.elemecdn.com/'+res[i].image_url+'"></div><span class="title">'+res[i].title+'</span></a>'
						$('#item').html(str);
						// str='';
					}else{
						
						str1 +=' <a href="javascript:"><div class="container"><img src="//fuss10.elemecdn.com/'+res[i].image_url+'"></div><span class="title">'+res[i].title+'</span></a>'
						$('#item1').html(str1);
					}	
				}
				
			}
		})
		$.ajax({
			url:'/shopping/restaurants',
			data:{
				latitude:lat,
				longitude:lng,
				offset:this.offset,
				limit:20,
				extras:['activities']
			},
			success:function( res ){
				// console.log(res[1])

				var str='';
				if(res.length === 0 ) {
					$('.content').addClass('overlist')
				}else {
					$('.content').removeClass('overlist')
				}
				for( var i = 0; i < res.length; i++){
					// var name = 'https://mainsite-restapi.ele.me/v2/pois/'+res[i].geo+'';
					// $('#name').html(name)
					imgLoad(res[i].image_path)
					// var imgstr = res[i].image_path;
					// var a = imgstr.charAt(0);
					// var b = imgstr.slice(1,3);
					// var c = imgstr.slice(3);
					// var d = imgstr.slice(32);
					// console.log(c)
					// console.log(d)
					var long = (Math.round(res[i].distance )/ 1000).toFixed(2)
				var imgs = img +'?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/';
				str += '<div id="box"><div class="box-left"><img class="img" src="//fuss10.elemecdn.com/'+imgs+'"/></div><div class="box-right"><div class="line"><h3 class="shopname"><a href="#detail-'+res[i].id+'-'+res[i].latitude+'-'+res[i].longitude+'">'+res[i].name+'</a></h3><div class="support-warp"><div class="activity-warp nowarp"><i class="activitiy-ico ico">票</i></div></div></div><div class="line"> <div><span class="rate">'+res[i].rating+'</span><span>月售'+res[i].distance+'单</span></div></div> <div class="line"><div class="moneylimit"> <span >¥'+res[i].float_minimum_order_amount+'元起送</span><span >/'+res[i].piecewise_agent_fee.tips+'</span></div><div class="timedistance-wrap" ><span class="distance-wrap" >'+long+'km</span><span class="time-wrap" >'+res[i].order_lead_time+'分钟</span></div></div></div></div></div>'
				}
				$('.content').append(str);

			},
			error : function(){
				console.log('数据请求失败')
			}
		})

		
	},
	loadReslist: function(hash){
		// console.log(hash.split('-')[1].name)
		// var hash1 = hash.split('-')[1];
		//var locInfo = localStorage.getItem('gyf'); //从本地缓存取数据
		var locInfo = storage('listdata');
		// console.log(locInfo)
		var me = this;
		// this.ahash = hash.split('-')[1];
		
		if(!locInfo) 
		{
			$.ajax({
				url: '/v1/pois/' + hash.split('-')[1],
				type: 'get',
				success: function(res){
					console.log('我获取到了地理数据', res);	
					var obj = {
						lat: res.latitude,
						lng: res.longitude,
						geo: hash.split('-')[1]
					};
					storage('listdata', obj);
					//localStorage.setItem('gyf', JSON.stringify(obj))
					me.loadlist(obj);
				}
			})
			return;
		}
		//locInfoObj = JSON.parse(locInfo); //对取出来的缓存字符串进行解析，让其变成真正的对象
		this.loadlist(locInfo); //加载餐厅列表的信息
		/*var lat = hash.split('-')[1];
		var lng = hash.split('-')[2];*/
			 	
	}
})
