// JavaScript Document

//字体，字号，背景颜色
addEvent(window,"load",function(){
	var odecoration=document.getElementById("decoration");
	var owordType=document.getElementById("wordType");
	var owordSize=document.getElementById("wordSize");
	var obgColor=document.getElementById("bgcolor");
	var obiaoqing=document.getElementById("biaoqing");
	var owordTypes=owordType.getElementsByTagName("li");
	var owordSizes=owordSize.getElementsByTagName("li");
	var obgColors=obgColor.getElementsByTagName("li");
	var obiaoqings=obiaoqing.getElementsByTagName("li");
	var omessageText=document.getElementById("messageText");
	owordType.onclick=owordSize.onclick=obgColor.onclick=obiaoqing.onclick=function(e){
		if(!e){
			e=window.event;
		}
		if(this.getElementsByTagName("ul")[0].style.display=="block"){
			this.getElementsByTagName("ul")[0].style.display="none";			
		}
		else{
			owordType.getElementsByTagName("ul")[0].style.display="none";
			owordSize.getElementsByTagName("ul")[0].style.display="none";
			obgColor.getElementsByTagName("ul")[0].style.display="none";
			obiaoqing.getElementsByTagName("ul")[0].style.display="none";
			this.getElementsByTagName("ul")[0].style.display="block";
		}
		stopBubble(e);
	};
	window.document.onclick=function(){
		if(owordType.getElementsByTagName("ul")[0].style.display=="block"||owordSize.getElementsByTagName("ul")[0].style.display=="block"||obgColor.getElementsByTagName("ul")[0].style.display=="block"||obiaoqing.getElementsByTagName("ul")[0].style.display=="block"){
			owordType.getElementsByTagName("ul")[0].style.display="none";
			owordSize.getElementsByTagName("ul")[0].style.display="none";
			obgColor.getElementsByTagName("ul")[0].style.display="none";
			obiaoqing.getElementsByTagName("ul")[0].style.display="none";
		}

	};
	//字体
	for(var i=0;i<owordTypes.length;i++){
		var ostart2=omessageText.style.fontFamily;
		owordTypes[i].onclick=function(){
			ostart2=this.className;
		}
		owordTypes[i].onmouseover=function(){
			omessageText.style.fontFamily=this.className;
		}
		owordType.onmouseout=function(){
			omessageText.style.fontFamily=ostart2;
		}
	}

	//字号
	for(var i=0;i<owordSizes.length;i++){
		var ostart1=omessageText.style.fontSize;
		owordSizes[i].onclick=function(){
			ostart1=this.className+"px";
		}
		owordSizes[i].onmouseover=function(){
			omessageText.style.fontSize=this.className+"px";
		}
		owordSize.onmouseout=function(){
			omessageText.style.fontSize=ostart1;
		};
	}

	//背景
	for(var i=0;i<obgColors.length;i++){
		var ostart=omessageText.style.backgroundColor;
		obgColors[i].index=i;
		obgColors[i].onmouseover=function(){
			omessageText.style.backgroundColor=this.className;
			obgColors[this.index].onclick=function(){
				ostart=this.className;
			}
			obgColor.onmouseout=function(){
				omessageText.style.backgroundColor=ostart;
			};
		};


	}
	// 表情
	for(var i=0;i<obiaoqings.length;i++){
		obiaoqings[i].index=i;
		obiaoqings[i].onclick=function(){
			omessageText.innerHTML=omessageText.innerHTML+obiaoqings[this.index].innerHTML;
			obiaoqings[this.index].style.verticalAlign="middle";
		}
	}

	//提交，显示留言
	var oshow=document.getElementById("show");
	var oshowUl=oshow.getElementsByTagName("ul")[0];
	var osubmit=document.getElementById("submit");
	osubmit.onclick=function(){
		var oli=document.createElement("li");
		var otxt=omessageText.innerHTML;
		omessageText.innerHTML="";
		if(!otxt.replace("nbsp",'')==''){
			var oliDate=new Date();
			if(oliDate.getHours()<=9){
				var ohours="0"+oliDate.getHours();
			}
			else{
				ohours=oliDate.getHours();
			}
			if(oliDate.getMinutes()<=9){
				var ominutes="0"+oliDate.getMinutes();
			}
			else{
				ominutes=oliDate.getMinutes();
			}
			if(oliDate.getSeconds()<=9){
				var oseconds="0"+oliDate.getSeconds();
			}
			else{
				oseconds=oliDate.getSeconds();
			}
			oli.innerHTML=otxt+"<br>"+oliDate.getFullYear()+"-"+(oliDate.getMonth()+1)+"-"+oliDate.getDate()+"  "+ohours+":"+ominutes+":"+oseconds;
			if(oshowUl.children.length==0){
				oshowUl.appendChild(oli);
			}
			else{
				oshowUl.insertBefore(oli,oshowUl.children[0]);				
			}
			oli.style.height=0;
			oli.style.opacity=0;
			oli.style.filter="alpha(opacity:0)";
			move(oli,{height:150,opacity:100});
			oli.style.backgroundColor=ostart;
			oli.style.fontSize=ostart1;
			oli.style.fontFamily=ostart2;
			ostart= omessageText.style.backgroundColor="";
			ostart1= omessageText.style.fontSize="14px";
			ostart2= omessageText.style.fontFamily="宋体";
		}
		else{
			return false;
		}
	};
})



function addEvent(obj,ev,fn){
	if(obj.attachEvent)
		obj.attachEvent("on"+ev,fn);
	else
		obj.addEventListener(ev,fn,false);
}

//阻止冒泡
function stopBubble(e){
	if(e.stopPropagation){
		e.stopPropagation();
	}
	else{
		window.event.cancelBubble=true;
	}
}
//取CSS文件中的样式
function getStyle(obj,str){
	if(obj.currentStyle){
		return obj.currentStyle[str];//ie
	}
	else{
		return getComputedStyle(obj,false)[str];
	}
}
//运动
function move(obj,json,fun){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var astop=true;
		for(var attr in json){
			var cur=null;
			if(attr=="opacity"){
				if(obj.style.filter){
					cur=parseInt(getStyle(obj,attr));
				}
				else{
					cur=Math.round(parseFloat(getStyle(obj,attr))*100);
				}
			}
			else{
				cur=parseInt(getStyle(obj,attr));
			}
			var speed=(json[attr]-cur)/5;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(cur!=json[attr]){
				astop=false;
			}
			if(attr=="opacity"){
				if(obj.style.filter){
					obj.style.filter="alpha(opacity:"+(cur+speed)+")";
				}
				else{
					obj.style.opacity=(cur+speed)/100;
				}
			}
			else{
				obj.style[attr]=(cur+speed)+"px";
			}
		}
		if(astop){
			clearInterval(obj.timer);
			if(fun){
				fun();
			}
		}
	},30);
}