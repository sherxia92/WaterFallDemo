(function(window){
	var picData = {data: []};
	for (var i = 0; i < 30; i++) {
		var t = {};
		t.src = Math.ceil(Math.random() * 30) + '.jpg';
		picData.data.push(t);
	}
	console.log(picData);

	WF = {
		init: function() {
			var a = this;
			a.waterFall('main', 'pic-box');
			window.onscroll = function() {
				if (a.checkScrollSlide()) {
					for(var i = 0, len = picData.data.length; i < len; i++) {
						var pbDiv = document.createElement('div'),
							pDiv = document.createElement('div'),
							img = document.createElement('img');
						pbDiv.className = 'pic-box';
						pDiv.className = 'pic';
						img.src = './image/' + picData.data[i].src;
						a.mainDiv.appendChild(pbDiv);
						pbDiv.appendChild(pDiv);
						pDiv.appendChild(img);

						a.waterFall('main', 'pic-box');
					}
				}
			}
		},

		// 将图片一次排列，第一行以外的图片需要定位处理
		waterFall: function(parentID, className) {
			var a = this;
			var mainDiv = undefined;
			a.mainDiv = mainDiv = document.getElementById(parentID);			// div#main即瀑布流的根结点
			var boxArr = mainDiv.getElementsByClassName(className),				// main下所有box元素
				boxW = boxArr[0].offsetWidth,									// offsetWidth计算出的是元素宽度包括padding在内
				cols = Math.floor(document.documentElement.clientWidth / boxW),	// 一行可以放cols张图片
				colHArr = [];													// 存储每列加起来最后的高度
			a.boxArr = boxArr;
			a.colHArr = colHArr;
			mainDiv.style.width = boxW * cols + 'px';

			for (var i = 0, len = boxArr.length; i < len; i++) {
				var boxTemp = boxArr[i];
				if (i < cols) {
					colHArr.push(boxTemp.offsetHeight);
				} else {
					var minH = Math.min.apply(null, colHArr);
					var index = a.getMinHIndex(minH);
					console.log(colHArr);
					console.log(index);
					boxTemp.style.position = 'absolute';
					boxTemp.style.top = minH + 'px';
					boxTemp.style.left = index * boxW + 'px';
					colHArr[index] += boxTemp.offsetHeight;
				}
			}
		},

		// 找数组中值为val的索引
		getMinHIndex: function(val) {
			var a = this;
			var index = 0,
				arr = a.colHArr;
			for (var i = 0, len = arr.length; i < len; i++) {
				if (val == arr[i]) {
					index = i;
					break;
				}
			}
			return index;
		},

		// 判断页面时候有加载数据的条件
		checkScrollSlide: function() {
			var a = this;
			console.log(a.boxArr.length);
			// var lastBox = a.boxArr[a.boxArr.length - 1],
			// 	lastBoxH = lastBox.offsetTop ,//+ Math.floor(lastBox.offsetHeight / 2)
			// 	scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

			var minH = Math.min.apply(null, a.colHArr);
			var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
			console.log(minH, scrollTop);
			return scrollTop - minH + 100> 0;
		}
	}	

	// 页面加载完之后
	window.onload = function() {
		WF.init();
	}

})(window);
