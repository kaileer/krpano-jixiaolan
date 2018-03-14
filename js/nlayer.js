/**
 * Created by Administrator on 2014/10/31.
 */
var imgData = [
	{'url':'images/bg.jpg'},
	{'url':'images/icon1.png'},
	{'url':'images/music_bg.png'},
	{'url':'images/loading.gif'},
	{'url':'images/share.jpg'},
	{'url':'images/shou.png'}
];
fontSize()
loadImg(imgData);
// loadSound()
var layer = $('#poplayer');
var $lay = $('.poplayer');
var objIdx = 0;
var titleArr = [
		'柳财顺',
		'吴良才',
		'吴良才',
		'林涛',
		'林涛',
		'杨中良',
		'杨中良',
		'陈金华',
		'萧鸿鸣',
		'邓伯元',
		'邓伯元',
		'李燕',
		'李玉刚',
		'李玉刚',
		'李玉刚',
		'李玉刚',
		'林跃平',
		'吴冬梅',
		'吴冬梅',
		'吴冬梅',
		'吴冬梅',
		'吴孔庭',
		'吴孔庭',
		'吴孔庭',
		'董良达',
		'董良达',
		'董良达',
		'林家卫',
		'林家卫',
		'林家卫',
		'林家卫',
		'林家卫',
		'林家卫',
		'范存刚',
		'范存刚',
		'范存刚',
		'范存刚',
		'范存刚',
		'吴悦石',
		'吴悦石',
		'吴悦石',
		'徐里',
		'徐里',
		'李新永',
		'',
		'',
		'',
		'',
		'',
		'',
		'',
	]
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
function xmlcallback(obj) {

	var n = parseInt(obj.substr(4));
	objIdx = n;
	$lay.addClass('amt').bind('click',function(){
		closeLayer();
	});
	/*if(n>=27 && n<=32){
		var html='<h3 style="font-size:16px;">'+titleArr[n]+'</h3><span style="font-size:14px;line-height:18px;">'+txtArr[n]+'</span><h3 style="font-size:16px;">'+titleArr[43]+'</h3><span style="font-size:14px;line-height:18px;">'+txtArr[43]+'</span>';
	}else{*/
		var html='<h3>作品名：</h3><span>'+txtArr[n]+'</span><h3>作者：</h3><span>家卫画，新永书</span>';
	// }
	
	$('.pop img').attr('src','');
	$('.pop img').attr('src','images/hot/hot'+n+'.jpg');
	$('.pop div').html(html);
	var href='shop.html?pic='+n;
	$('.pop_btn_shop').on('click',function(){
		window.location.href=href;
	})
}


function closeLayer() {
	$lay.removeClass('amt')
	$('.poplayer').unbind('click');
}


$('.step1').on('tap',function(){
	$('.step1 span').removeClass('amt').parent().addClass('amt');
	setTimeout(function(){
		$('.step1').remove();
	},1500)
})

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

// 定义加载音频文件的函数
function loadSound() {
		var request = new XMLHttpRequest(); //建立一个请求
		request.open('GET', 'images/backgroundmusic.mp3', true); //配置好请求类型，文件路径等
		// 一旦获取完成，对音频进行进一步操作，比如解码
		request.onload = request.onerror = function() {
	//        alert('音乐加载完毕，即将开始播放~');
			//console.log(_num);
				loadImg(imgData); // load images & do callback
				setMusic();
		};
		request.send();
	
}

// 加载完毕后初次运行
function afterLoad(){
	$('#load').hide();
	$('#wrapper').css('visibility','visible').show();
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


/* 音乐 */
var _musicOn = true;
function setMusic(){
    // 背景音乐设置
    var _musicSwith = true,
        _musciIcon  = $('.music'),
        _music      = 'c3_rotate_360'
    _appBgm     = $('.bgSound').get(0);
    _musciIcon.css('visibility','visible');
    _appBgm.play();
    _musciIcon.on('touchstart',function(e){
        e.preventDefault();
        if(_musicSwith){
            _appBgm.pause();
            $(this).removeClass(_music).addClass('stop');
            _musicSwith = false;
            isMusic=false;
        }else{
            _appBgm.play();
            $(this).addClass(_music).removeClass('stop');
            _musicSwith = true;
            isMusic=true;
        }
    });
    // 设置自动播放
    _appBgm.addEventListener('ended', function () {
        setTimeout(function () { _appBgm.play(); }, 300);
    }, false);
}