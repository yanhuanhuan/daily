var detailObj = Object.create(searchObj); //原型继承
//$.extend 进行对象与对象的合并
detailObj  = $.extend(detailObj, {
	name: '餐厅详情页',
	dom: $('#detail'),
	init:function(){
		this.onEvent();
	},
	loadList:function(hash){
		// console.log(hash)
		this.id = hash.split('-')[1];
		this.lat = hash.split('-')[2];
		this.lng = hash.split('-')[3];
		// console.log(id +':'+ lat +':'+ lng)
		this.loadHeaderInfo();
		this.loadListInfo();
	},
	onEvent:function(){

		$('#leftList').on('click', 'li', function(){
			$(this).addClass('active').siblings().removeClass('active');
			var selector = '[data-title="'+$(this).find('.category-name').html()+'"]';
			// console.log($(this).find('.category-name').html())
			var curelement = $(selector).get(0);
			console.log(curelement)
			rightScroll.scrollToElement(curelement,500);
		})
		// var price;
		var price = 0;
		$("#rightList").on('click', '.ico2', function(event){
			// console.log('加法进行了点击');	
			var curNumDom = $(this).closest('.cartbutton').find('.ico');
			curNumDom.css('visibility',' visible');
			$(this).closest('.cartbutton').find('.ico1').css('visibility',' visible');
			var curPrice =  $(this).closest('.foodinfo').find('.foodprice').find('span').text(); //获取当前的价格
			var curNum = +curNumDom.text();
			curNum++;
			curNumDom.text(curNum);
			// console.log(typeof curNum) 
			
			// price = parseInt(curPrice) + price;
			 // $(this).closest('.foodinfo').find('.foodprice').find('span').text(price);
			 // price = 0;
			 // console.log(price)
		})

		$("#rightList").on('click', '.ico1', function(event){
			// console.log('减法进行了点击');	
			var curNumDom = $(this).closest('.cartbutton').find('.ico');
			var curNum = +curNumDom.text();
			if(curNum == 1){
				curNumDom.css('visibility',' hidden');
				$(this).closest('.cartbutton').find('.ico1').css('visibility','  hidden');
			}else{
				curNum--;
			}
			
			curNumDom.text(curNum);
		})	 	
	},
	loadHeaderInfo : function(){
		$.ajax({
			url:'/shopping/restaurant/'+ this.id,
			data:{
				extras:['activities','album','license','identification','statistics'],
				latitude:this.lat,
				longitude:this.lng
			},
			success:function(res){
				// console.log(res)
				this.imgLoad(res.image_path)
					var img2 = 'https://fuss10.elemecdn.com/' + img +'?imageMogr/quality/80/format/webp/';
					var img1 = 'https://fuss10.elemecdn.com/' + img+'?imageMogr/quality/80/format/webp/thumbnail/!40p/blur/50x40/';
					// console.log(img1)
					var str ='';
					if( res.activities != ''){
						name = res.activities[0].icon_name;
						tips = res.activities[0].tips;
					}else{
						name = '无';
						tips = '';
					}
					str += '<div class="shopheader-background" style="background-image: url('+img1+');"></div><div class="shopHeader-main">'+'<img class="shopHeader-logo" src="'+img2+'">'+'<div class="shopheader-content">'+ 
					'<h2 class="shopheader-name" >'+res.name+'</h2>'+ '<p class="shopheader-servercontent"><span class="shopheader-server">商家配送</span>'+ '/'+'<span class="shopheader-server" >'+res.order_lead_time
+'分钟送达</span>'+  '/'+'<span class="shopheader-server" >'+res.piecewise_agent_fee.description+'</span></p>'+ '<div class="shopheader-activities" >'+ '<ul >'+ '<li>'+'<div class="activity-wrap nowrap">'+ 
'<i class="activity-icon" > '+ name +'</i>'+'<span class="activity-description" ><span>'+tips+'</span></span></div>'+ '</li></ul></div></div></div><div class="shopheader-notice" > <span>'+res.promotion_info+'</span>  </div>'
				$('.shopHeader').html(str)
			}
		})
	},
	loadListInfo: function(){
		var me = this;
		$.ajax({
			url:'/shopping/v2/menu?restaurant_id=' + this.id,
			success:function(res){
				// console.log(res)
				
				me.loadLeftInfo(res);
				me.loadRightInfo(res);
			}
		})
	},
	loadLeftInfo:function(res){
		var str='';
				for(var i = 0; i < res.length; i++){
					if(res[i].icon_url !=''){
						imgLoad(res[i].icon_url)
						var img1 = '//fuss10.elemecdn.com/' +img;
						str +='<li class="noicon"> <img class="category-icon" src="'+img1+'"> <span class="category-name" >'+res[i].name+'</span></li>'
					}else{
						str +='<li class="noicon"> <span class="category-name" >'+res[i].name+'</span></li>'
					}
				
				}
				$('#leftList').html(str);
	},
	loadRightInfo:function(res){
		// console.log(res)
		var str = '';
		for(var i = 0; i < res.length; i++){
			var description;
			if(res[i].description == ''){
				description = '暂无描述信息'
			}else{
				description = res[i].description;
			}
			str+= '<div class="dl"><dt >'+
            '<div class="category-title" >'+
              '<strong class="category-name" data-title="'+res[i].name+'" >'+res[i].name+'</strong>'+ 
              '<span class="category-description">'+description+'</span>'+
            '</div>'+
            '<div class="category-more" >'+
              '<span class="icon">...</span>'+
              '<p class="popup popup-transition">'+
                '<span >'+res[i].name+'</span>'+ 
                '<span >'+res[i].description+'</span>'+
              '</p>'+
            '</div>'+
            '</dt>'+this.singleListInfo(res[i].foods,description )+'</div>';
		}
		$('dl').html(str)
		window.leftScroll = new IScroll('.huanhuan', {
			scrollbars: false, //不显示滚动条
			preventDefault: false, //不阻止点击事件
			bounce: false //不让其弹动
		});
		window.rightScroll = new IScroll('#rightList', {
			scrollbars: false,
			probeType: 2,//设置滚动条的灵敏度,监听滚动的事件
			preventDefault: false, //不阻止点击事件
			bounce: false
		})
		document.addEventListener("touchmove",function(event){
			event.preventDefault();
		},false)
		this.cacheMaplist = [];
		var sum = 0;
		var me = this;
		$('.dl').each(function(index, elem){
		  // console.log($(elem).height())
		  sum += $(elem).height();
		  // console.log(sum)
		  me.cacheMaplist.push(sum);
		})
		console.log(this.cacheMaplist)
		var leftItem = $('#leftList').find('li');
		rightScroll.on('scroll', function(event){
			// console.log('我正在滚动'); 	
			for(var i =0; i < me.cacheMaplist.length; i++) {
				// 10 >= 876  0
				// console.log(1);
				if(Math.abs(rightScroll.y) <= me.cacheMaplist[i]) {
					// console.log(1);
					leftItem.removeClass('active');
					leftItem.eq(i).addClass('active');
					break;
				}
			}
		})
	},
	singleListInfo:function( list,description ){
		var str=''
		for(var i = 0; i < list.length; i++){
			if(list[i].image_path != null){
				imgLoad(list[i].image_path)
			}else{
				img = '2/42/be05bb8f019d1348084cc932e110ejpeg.jpeg';
			}
			str += '<dd><span class="foodimg">'+
              '<img src="//fuss10.elemecdn.com/'+ img+'?imageMogr/thumbnail/140x140/format/webp/quality/85">'+
            '</span>'+
          '<section class="foodinfo" >'+
            '<header class="foodtitle" >'+
              '<span>'+list[i].name+'</span>'+
            '</header>'+
            '<p class="fooddescription">'+description +'</p>'+
            '<p class="foodsales">'+
              '<span>月售'+list[i].month_sales+'份    </span>'+ 
              '<span>好评率'+list[i].satisfy_rate+'%</span>'+
            '</p>'+
            '<strong class="foodprice">'+
              '<span>'+list[i].specfoods[0].price+'</span>'+  
            '</strong>'+
            '<div class="cartbutton">'+
               '<span class="ico1"></span>'+
               '<span class="ico">0</span>'+
               '<span class="ico2"></span>'+
            '</div>'+
            '</section></dd>'
		}
		return str
	}
	
})
