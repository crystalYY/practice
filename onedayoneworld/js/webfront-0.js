addEvent(window,"load",function(){
	var ashowResult=document.getElementById("showResult");
	var obtn=ashowResult.getElementsByTagName("input")[0];
	obtn.onclick=function(){
		var oshowtxt=ashowResult.getElementsByTagName("textarea")[0].value;
		var onewwin=window.open();
		onewwin.document.write(oshowtxt);
	};
	
});

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
			areturnTop.style.top=clientheight+scrolltop-areturnTop.offsetHeight+"px";//滚动条的位置
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





function addEvent(obj, ev, fun){
	if(obj.attachEvent)
		obj.attachEvent("on"+ev,fun);
	else
		obj.addEventListener(ev,fun,false);
}