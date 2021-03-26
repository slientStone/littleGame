function leiGame(total,tNum,leiNum){
	function cube(obj){
		this.isLei = obj.isLei;
		this.i = obj.i;
		this.j = obj.j;
		this.num = obj.num;
		this.show = obj.show;
		this.clickFn = (e)=>{
			if(this.show){
				return
			}else if(result==1){
				initData();
			}else if(this.isLei==1){
				this.show = true;
				e.target.style = "background:red";
				result = 1;
			}else {
				this.show = true;
				e.target.innerHTML = this.num;
				e.target.style = "background:green;color:#fff;";
			}
		};
		this.changeNum = (num,isLei)=>{
			this.num += num;
			if(isLei){
				this.isLei = isLei;
			}
		}
		
	}
	var leiNum = leiNum;
	var total = total;
	var dList = {};
	var i;
	var j;
	var tNum = tNum;
	var leiList = [];
	var result = 0;
	initData();
	function initData(){
		dList = {};
		leiList = [];
		for(i=0;i<tNum;i++){
			dList[i] = {};
			for(j=0;j<tNum;j++){
				var obj = {
					isLei:-1,i:i,j:j,num:0,show:false
				}
				dList[i][j]= new cube(obj)
			}
		}
		getLei();
		if(result==1){
			result=0;
			clearDom();
		}else{
			initDom();
			initEvent();
		}
		// console.log(dList);
	}
	// 生成雷
	function getLei(){
		for(i=0;i<leiNum;i++){
			randomLei();
		}
		var len = leiList.length;
		for(i=0;i<len;i++){
			var itList = leiList[i].split(',');
			itList[0] = parseInt(itList[0]);
			itList[1] = parseInt(itList[1]);
			dList[itList[0]][itList[1]].changeNum(0,1);
			
			if(itList[0]-1>=0&&dList[itList[0]-1][itList[1]].isLei!=1){// 左
				dList[itList[0]-1][itList[1]].changeNum(1);
			}
			if(itList[0]+1<tNum&&dList[itList[0]+1][itList[1]].isLei!=1){// 右
				dList[itList[0]+1][itList[1]].changeNum(1);
			}
			if(itList[1]-1>=0&&dList[itList[0]][itList[1]-1].isLei!=1){// 上
				dList[itList[0]][itList[1]-1].changeNum(1);
			}
			if(itList[1]+1<tNum&&dList[itList[0]][itList[1]+1].isLei!=1){// 下
				dList[itList[0]][itList[1]+1].changeNum(1);
			}
			
		}
	}
	
	function randomLei(){
		var val = parseInt(Math.random(0,1)*tNum)+','+parseInt(Math.random(0,1)*tNum)
		var leiIndex = leiList.indexOf(val);
		if(leiIndex==-1){
			leiList.push(val);
		}else{
			randomLei();
		}
	}
	function cssPath(path){
		// debugger
	 if(!path || path.length === 0){
	 throw new Error('argument "path" is required !');
	 }
	 var head = document.getElementsByTagName('head')[0];
	 var link = document.createElement('link');
	 link.href = path;
	 link.rel = 'stylesheet';
	 link.type = 'text/css';
	 head.appendChild(link);
		console.log(1)
		// var style = document.createElement('style');
		// style.textContent = '@import "' + path + '"';
		 
		// var fi = setInterval(function() {
		//   try {
		//     style.sheet.cssRules; // <--- MAGIC: only populated when file is loaded
		//     CSSDone('listening to @import-ed cssRules');
		//     clearInterval(fi);
		//   } catch (e){}
		// }, 10);  
		 
		// head.appendChild(style);
	}
	
	function initDom(){
		document.write("<div class='cube-area'>")
		document.write("<div class='cube-tit'>")
		document.write("<span style='color:#333;margin-right:10px;font-size:14px;'>列数:</span><input placeholder='列数' class='cube-input' attr-id='2' style='width:100px;margin-right:10px;height:30px;line-height:30px;box-sizing: border-box;border:1px solid #ddd;text-align:center;'/>");
		document.write("<span style='color:#333;margin-right:10px;font-size:14px;'>雷数:</span><input placeholder='雷数' class='cube-input' attr-id='3' style='width:100px;margin-right:10px;height:30px;line-height:30px;box-sizing: border-box;border:1px solid #ddd;text-align:center;'/>");
		document.write("<span class='cube-btn' style='width:100px;background:#F4D209;color:#fff;padding:5px 10px;border-radius:5px;cursor:pointer;'>设置</span>");
		document.write("</div>")
		document.write("<div class='cube-card'>")
			for(i=0;i<tNum;i++){
				document.write("<div class='cube-row' style='width:"+50*tNum+"px;'>")
				for(j=0;j<tNum;j++){
					document.write("<span class='txt' i='"+i+"' j='"+j+"'>")
					document.write("</span>")
				}
				document.write("</div>");
			}
		document.write("</div>")
		document.write("</div>")
		
		document.close();
		cssPath('src/index.css');
		document.getElementsByClassName("cube-input")[0].value = tNum;
		document.getElementsByClassName("cube-input")[1].value = leiNum;
		
	}
	function clearDom(){
		var domList = document.getElementsByClassName("cube-row");
		for(i=0;i<domList.length;i++){
			var domItem = domList[i].children;
			for(j=0;j<domItem.length;j++){
				domItem[j].innerHTML = '';
				domItem[j].style = '';
			}
		}
	}
	function initEvent(){
		var domList = document.getElementsByClassName("cube-row");
		for(i=0;i<domList.length;i++){
			domList[i].addEventListener('click',(e)=>{
				dList[e.target.attributes.i.value][e.target.attributes.j.value].clickFn(e)
			})
		}
		
		document.getElementsByClassName("cube-btn")[0].addEventListener('click',(e)=>{
			var x=document.getElementsByClassName("cube-area")[0];
			var objNum = {
				lie: document.getElementsByClassName("cube-input")[0].value||1,
				lei: document.getElementsByClassName("cube-input")[1].value||1,
			}
			// for(i=0;i<x.length;i++){
			// 	x[i].style="display:none;";
			// };
			  x.remove(x.selectedIndex);
			  if(objNum.lei>objNum.lie*objNum.lie){
				  objNum.lei=objNum.lie*objNum.lie
			  }
			  new leiGame(objNum.lie*objNum.lie,objNum.lie,objNum.lei);
			  // var parent = x.parentElement;
			  // // 删除:
			  // var removed = parent.removeChild(x);
			  // setTimeout(()=>{
				 //  new leiGame(81,9,10);
			  // },300)
			  // x.detach();
			  // leiGame(total,tNum,leiNum);
		});
		
	}
};

// new leiGame(9,3,1);


new leiGame(81,9,10);