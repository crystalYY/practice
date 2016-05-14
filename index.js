//导航滚动
		var toskill=document.getElementById('toskill');
		var toexperience=document.getElementById('toexperience');
		var tointroduction=document.getElementById('tointroduction');
		function moveto(obj,itarget){
			obj.timer=setInterval(function(){
				window.scrollBy(0,10);
				if(document.body.scrollTop){
					if(document.body.scrollTop>=itarget){
						clearInterval(obj.timer);
					}
				}
				else{
					if(document.documentElement.scrollTop>=itarget){
						clearInterval(obj.timer);
					}
				}
			},10);
		}
		toskill.onclick=function(){
			moveto(this,910);
		};
		toexperience.onclick=function(){
			moveto(this,1210);
		}
		tointroduction.onclick=function(){
			moveto(this,1860);
		}
		//标签卡
		var experience=document.getElementById('experience');
		var label=document.getElementById('labels')
		var labels=label.getElementsByTagName('li');
		var container=document.getElementById('container').getElementsByTagName('ul');
		var containers=[];
		var classMatch=/container[1,2,3,4]/;
		var now=0;
		for(var k=0;k<container.length;k++){
			if(classMatch.test(container[k].className)){
				containers.push(container[k]);
			}
		}
		for(var i=0;i<labels.length;i++){
			labels[i].index=i;
			labels[i].onclick=function(){
				clearInterval(timer);
				now=this.index;
				for(var j=0;j<containers.length;j++){
					containers[j].style.display='none';
					labels[j].className='';
				}
				containers[now].style.display='block';
				labels[now].className='active';
			};
			labels[i].onmouseover=function(){
				this.style.backgroundImage='url(img/label.png)';
				this.style.backgroundRepeat='no-repeat';
				this.style.backgroundPosition='left center';
			}
			labels[i].onmouseout=function(){
				this.style.backgroundImage='none';
			}
		}
		//标签卡自动播放
		timer=setInterval(function(){
			if(now==3){
				now=0;
			}
			else{
				now++;
			}
			for(var j=0;j<containers.length;j++){
				containers[j].style.display='none';
				labels[j].className='';
			}
			containers[now].style.display='block';
			labels[now].className='active';
		},3000);
		experience.onmouseover=function(){
			clearInterval(timer);
		};
		experience.onmouseout=function(){
			timer=setInterval(function(){
				if(now==3){
					now=0;
				}
				else{
					now++;
				}
				for(var j=0;j<containers.length;j++){
					containers[j].style.display='none';
					labels[j].className='';
				}
				containers[now].style.display='block';
				labels[now].className='active';
			},3000);
		};
		//introduction 图片缩小改变位置，并显示自我介绍的内容
		var introduction=document.getElementById('introduction');
		var introImg=document.getElementById('introImg');
		var introimg=introImg.getElementsByTagName('img')[0];
		var intro=document.getElementById('intro');
		var imgspan=document.getElementById('imgspan');
		function getStyle(obj, name)
		{
			if(obj.currentStyle)
			{
				return obj.currentStyle[name];
			}
			else
			{
				return getComputedStyle(obj, false)[name];
			}
		}
				function startMove(obj, json, fnEnd)
			{
		clearInterval(obj.timer);
		obj.timer=setInterval(function (){
			var bStop=true;	
			
			for(var attr in json)
			{
				var cur=0;
				
				if(attr=='opacity')
				{
					cur=Math.round(parseFloat(getStyle(obj, attr))*100);
				}
				else
				{
					cur=parseInt(getStyle(obj, attr));
				}
				
				var speed=(json[attr]-cur)/6;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);
				
				if(cur!=json[attr])
					bStop=false;
				
				if(attr=='opacity')
				{
					obj.style.filter='alpha(opacity:'+(cur+speed)+')';
					obj.style.opacity=(cur+speed)/100;
				}
				else
				{
					obj.style[attr]=cur+speed+'px';
				}
			}
			
			if(bStop)
			{
				clearInterval(obj.timer);
							
				if(fnEnd)fnEnd();
			}
		}, 30);
}
		introImg.onclick=function(){
			if(parseInt(getStyle(this,'width'))==400){
				this.style.marginLeft='0px';
				this.style.marginTop='0px';
				var leftlength=parseInt(parseInt(getStyle(introduction,'width'))*0.05);
				var toplength=parseInt(parseInt(getStyle(introduction,'height'))*0.15);
				startMove(this,{width:200,height:200,left:leftlength,top:toplength});
				intro.style.display='block';
				startMove(intro,{opacity:100});
			}
			else{
				this.style.marginLeft='-200px';
				this.style.marginTop='-200px';
				var leftlength=parseInt(parseInt(getStyle(introduction,'width'))*0.5);
				var toplength=parseInt(parseInt(getStyle(introduction,'height'))*0.5);
				startMove(this,{width:400,height:400,left:leftlength,top:toplength});
				intro.style.display='none';
				startMove(intro,{opacity:0});
			}
		};
		setInterval(function(){
			startMove(introimg,{opacity:50});
			startMove(imgspan,{opacity:100});
		},3000);
			
		setInterval(function(){
			startMove(introimg,{opacity:100});
			startMove(imgspan,{opacity:0});
		},5000);
			