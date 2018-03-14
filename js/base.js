// 图片数据
fontSize();
var imgData = [
	{'url':'images/btn_list1.png'}
];
var txtArr = [
		'《猴》',
		'《禅》',
		'《有思》',
		'《寿》',
		'《福》',
		'《禄》',
		'《喜》',
		'《鼠》',
		'《德》',
		'《顺》',
		'《勤》',
		'《孝》',
		'《心慧意坚取真经》',
		'《福》',
		'《忠》',
		'《合家福贵广纳财》',
		'《空》',
		'《佛》',
		'《修》',
		'《悟》',
		'《其乐融融》',
		'《空即是色》',
		'《阿弥陀佛》',
		'《色即是空》',
		'《禅》'
	]

loadImg(imgData);
var device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
var clickEvtName = device ? 'tap' : 'click';

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
var browser = {
	versions: function () {
		var u = navigator.userAgent, app = navigator.appVersion;
		return { //移动终端浏览器版本信息
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1 //是否iPad
		};
	}()
};

function scrollWrap(){
	new IScroll('#wrapper', {
		zoom: false,
		scrollX: true,
		scrollY: true,
		mouseWheel: true,
		wheelAction: 'zoom',
		bounce:false
	});
}

if (browser.versions.android) {
	$('.orientation_set').remove();
}



function loadImg(imgData){
	var l=imgData.length;
	var jd=0;
	$.each(imgData,function(i){
		var newImg=new Image();
		newImg.onload = newImg.onerror =function(){
			jd+=100/l;
			// $('.j_num').html(jd+'%')
			$('.j_num').html((0.5 + jd) | 0);
			if(jd>99){
				setTimeout(function(){
					afterLoad();
				},200);
			}
		};
		newImg.src=imgData[i].url;
	})
}


// 加载完毕后初次运行
function afterLoad(){
	$('#loading').hide();
	$('#wrapper').css('visibility','visible').show();
	if($('.shop_list').size()>0){
		var html='';
		for(var i=0;i<24;i++){
			html+=	'<dl>'+
						'<dt><img src="images/hot/hot'+i+'.jpg" href="shop.html?pic='+i+'" alt=""></dt>'+
						'<dd>'+
							'<h3>'+txtArr[i]+'</h3>'+
							'<p>作者：林家卫 ，李新永</p>'+
							'<div>'+
								'<span>纸本设色</span>'+
								'<s></s>'+
								'<span>35×46cm</span>'+
							'</div>'+
						'</dd>'+
					'</dl>'
		}
		$('.shop_list').html(html);
		scrollWrap();
		$('.shop_list dl').on(clickEvtName,function(){
			window.location.href=$(this).find('img').attr('href');
		})
	}

	if($('.details_pic').size()>0){
		var num=GetQueryString('pic');
		var src='images/hot/hot'+num+'.jpg';
		$('.details_pic img').attr('src',src);
	}
	
}

function GetQueryString(name) {
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
   var r = window.location.search.substr(1).match(reg);
   if (r!=null) return (r[2]); return null;
}

function fontSize() {
	var b = document.documentElement, a = function() {
		var a = b.getBoundingClientRect().width;
		b.style.fontSize = .0625 * (640 <= a ? 640 : a) + "px"
	}, c = null;
	window.addEventListener("resize", function() {
		clearTimeout(c);
		c = setTimeout(a, 300)
	});
	a()
};
