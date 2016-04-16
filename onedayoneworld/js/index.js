// JavaScript Document

window.onblur=function(){
			clearInterval(timer);
		}
window.onfocus=function(){
	clearInterval(timer);
	timer=setInterval(tab,5000);
}


//幻灯片
addEvent(window,"load",function(){
	var opicMove=document.getElementById("pictureMove");
	var oul1=document.getElementById("ul1");
	var oul2=document.getElementById("ul2");
	var oul3=document.getElementById("ul3");
	var oli=oul1.getElementsByTagName("li");
	var itarget=0;
	for(var i=0;i<oli.length;i++){
		oli[i].index=i;
		oli[i].onclick=function(){
			clearInterval(timer);
			itarget=this.index;
			tab();
		};
	}
	
	//幻灯片自动播放
	var timer=setInterval(tab,5000);
	opicMove.onmouseover=function(){
		clearInterval(timer);
		
	};
	opicMove.onmouseout=function(){
		timer=setInterval(tab,5000);
	};
	function tab(){
		for(var j=0;j<oli.length;j++){
				oli[j].className="";
		}
		oli[itarget].className="active";
		startMove(oul2,{left:-itarget*600});
		startMove(oul3,{left:-itarget*600});
		if(itarget==oli.length-1)
			itarget=0;
		else
			itarget=itarget+1;
	}
});
	
//鼠标移入图片变换
addEvent(window,"load",function(){
	var contactIcon=document.getElementById("contactIcon");
	var oContactLi=contactIcon.getElementsByTagName("li");
	var oImgSrc=[];
	for(var i=0;i<oContactLi.length;i++){
		oContactLi[i].index=i;
		for(var j=0;j<oContactLi.length;j++){
			oImgSrc[j]=oContactLi[j].getElementsByTagName("img")[0].src;
		}
		oContactLi[i].onmouseover=function(){
			this.getElementsByTagName("img")[0].src=oImgSrc[this.index].substring(0,oImgSrc[this.index].length-4)+"1.jpg";
		};
		oContactLi[i].onmouseout=function(){
			this.getElementsByTagName("img")[0].src=oImgSrc[this.index];
		};
	}
});


//标签卡
addEvent(window,"load",function(){
	var olabel=document.getElementById("label");
	var olabelDiv=olabel.getElementsByTagName("div");
	var olabelHead=document.getElementById("labelHead");
	var olabelHeadLi=olabelHead.getElementsByTagName("li");
	for(var i=0;i<olabelHeadLi.length;i++){
		olabelHeadLi[i].index=i;
		olabelHeadLi[i].onmouseover=function(){
			for(var j=0;j<olabelHeadLi.length;j++){
				olabelHeadLi[j].style.backgroundColor="";
				olabelDiv[j].style.display="none";
			}
			olabelHeadLi[this.index].style.backgroundColor="#FF8000";
			olabelDiv[this.index].style.display="block";
		};
	}
});
//回到顶部
addEvent(window,"load",function(){
	var areturnTop=document.getElementById("returnTop");
	window.onscroll=function(){
		var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
		var scrollleft=document.documentElement.scrollLeft||document.body.scrollLeft;
		var clientwidth=document.documentElement.clientWidth||document.body.clientWidth;
		var clientheight=document.documentElement.clientHeight||document.body.clientHeight;
		if(scrolltop>0){
			areturnTop.style.display="block";
			areturnTop.style.top=clientheight+scrolltop-areturnTop.offsetHeight+"px";
			areturnTop.style.left=clientwidth+scrollleft-areturnTop.offsetWidth+"px";
		}
		else{
			areturnTop.style.display="none";
		}
		
	};
	areturnTop.onclick=function(){
			document.documentElement.scrollTop=document.body.scrollTop=0;
		};
});

function getElementsByClassName(name){
	var whole=document.getElementsByTagName("*");
	var result=[];
	for(var i=0;i<whole.length;i++){
		var oname=whole[i].className.split(" ");
		for(var j=0;j<oname.length;j++){
			if(oname[j]==name)
				result.push(whole[i]);
		}
	}
	return result;
}

function getStyle(obj,attr){
	if(obj.currentStyle)
		return obj.currentStyle[attr];
	else
		return getComputedStyle(obj,false)[attr];
}

function move(obj,json,fn){
	obj.timer=null;
	obj.timer=setInterval(function(){
		var astop=true;
		for(var attr in json){
			var cur=null;
			if(attr=="opacity")
				if(obj.style.filter)
					cur=parseInt(getStyle(obj,attr));
				else
					cur=Math.round(parseFloat(getStyle(obj,attr)*100));
			else
				cur=parseInt(getStyle(obj,attr));
			var speed=(parseInt(json[attr])-cur)/5;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(speed!=0)
				astop=false;
			if(attr=="opacity")
				if(obj.style.filter)
					obj.style.filter="alpha(opacity:"+(cur+speed)+")";
				else
					obj.style.opacity=(cur+speed)/100;
			else
				obj.style[attr]=cur+speed+"px";
		}
		
		if(astop){
			clearInterval(obj.timer);
			if(fn)
				fn();
		}
	},30);
}
function startMove(obj,json,endFn){
	clearInterval(obj.timer);
	var iCur=0;
	obj.timer=setInterval(function (){
		var bBtn=true;
		for(var attr in json){
			if (attr=='opacity') {
				iCur=Math.round(parseFloat(getStyle(obj,attr))*100)
			}else{
				iCur=parseInt(getStyle(obj,attr));
			};
			var iSpeed=(json[attr]-iCur)/6;
			iSpeed=iSpeed>0? Math.ceil(iSpeed) : Math.floor(iSpeed);

			if (iCur != json[attr]) bBtn=false;

			if (attr=='opacity') {
				obj.style.opacity=(iCur+iSpeed)/100;
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
			}else{
				obj.style[attr]=iCur+iSpeed+'px';
			};

		}
			if (bBtn) {
				clearInterval(obj.timer);
				//alert(111)
				endFn && endFn();
			};
		
	},30)
	
	
}
function addEvent(obj, ev, fun){
	if(obj.attachEvent)
		obj.attachEvent("on"+ev,fun);
	else
		obj.addEventListener(ev,fun,false);
}
	
	
	
	
	
	
	
	
	
	