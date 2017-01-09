
var cityObj = Object.create(searchObj); //原型继承

cityObj  = $.extend(cityObj, {
	name: '城市选择页',
	dom: $('#city'),
	init:function(){
		this.onEvent();
		this.bdhotcity();
	},
	bdhotcity:function(){
		var bdthis = this;
		$.ajax({
			url:'/waimai?qt=getcitylist&format=1&t=1483761641269',
			dataType:'json',
			success:function( res ){
				var arr = [];
				var list = res.result.city_list;
				for(var i in list){
					// console.log(i)
					arr = arr.concat(list[i]);
				}
				var baiduID ={};
				for(var j = 0; j < arr.length; j++ ){
					baiduID[arr[j].name] = arr[j].code;
				}
				// console.log(baiduID)
				bdthis.baiduhotcity = baiduID;
				bdthis.hotcity();
				bdthis.groupcity();
			},
			error:function(){
				console.log('error')
			}
		})
	},
	onEvent:function(){
		$('#list4').on('click', 'li' ,function(){
			// console.log(1)
			// var selector = 
			var selector = "[date-city='"+ this.innerHTML +"']";
			// selector = [data-city="A"]
			// console.log(selector)
			var offsetTop = $(selector).offset().top;
			// console.log(offsetTop)
			window.scrollTo(0, offsetTop );
		})
	},
	hotcity:function(){
		var hothis = this;
		// console.log(1)
		$.ajax({
			url:'/v1/cities',
			type:'get',
			data:{
				type:'hot'
			},
			success:function( res ){
				var html = '';
					for( var i = 0; i < res.length; i++){
						var bdid = hothis.baiduhotcity[res[i].name];
						html +='<li><a href = "#search-'+res[i].name+'-'+res[i].id+'-'+bdid+'">'+res[i].name+'</a></li>';
					}
					$('#list2').html(html);
			},
			error: function(){
				console.log('我请求失败了');	 	
			}
		})
		
	},
	groupcity:function(){
		var hthis = this;
		$.ajax({
			url:'/v1/cities',
			type: 'get',
			data : {
				type:'group'
			},
			success:function( res ){
				// console.log(res)//对象
				var arr =[];
				// var html = '';
				for(var key in res){
					arr.push(key);//键
				}
				// console.log(arr)
				arr.sort();//数组排序
				hthis.loadWord( arr );
				var str = '';
				for( var i = 0; i < arr.length; i++){
					str += '<p class="word1" date-city="'+arr[i]+'">'+arr[i]+'</p><ul class="list3">'+hthis.loadgroup( res[arr[i]] )+'</ul>';
				}
				$('#wordlist').html(str);
			},
				error: function(){
					console.log('我请求失败了');	 	
				}
		})
	},
	loadWord :function(arr){
		// console.log(arr)
		var html ='';
		for(var i = 0; i < arr.length; i++){
			html += '<li>'+arr[i]+'</li>';
			// console.log(arr[i])
		}
		$('#list4').html(html);
		
	}, 
	loadgroup:function( olist ){
		// console.log(olist)
		var html = '';
		for( var i = 0; i < olist.length; i++ ){
			html += '<li><a href = "#search-'+olist[i].name+'-'+olist[i].id+'">'+olist[i].name+'</a></li>';
			// console.log(html)
			// <a href = "#search-'+res[i].name+'-'+res[i].id+'">'+res[i].name+'</a>
		}
		return html
	}
})
