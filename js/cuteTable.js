/**
 * 2017-4-28
 * cuteTable v1.0.0 alpha
 * require jquery 1.7+
 * MIT License
 * for more info pls visit : https://github.com/crazzyHuang/cuteTable
 */

;
(function($, window, document, undefined) {

	// Create the defaults once
	var pluginName = "cuteTable",
		defaluts = {
			columns: [],
			isShowRowNum: true
		}

	function CuteTable(element, options) {
		this.element = element;
		this.settings = $.extend({}, defaluts, options);
		this._defaults = defaluts;
		this._name = pluginName;
		this.version = 'v1.0.0';
		this.init();
	}

	CuteTable.prototype = {
		init: function() {
			var that = this;
			console.info("i am init");
			// 如果是代码式
			that.createContainer();
			if(that.settings.datas) {
				that.setData();
			}

		},
		createContainer: function() {
			var that = this;
			var opts = that.settings;
			var cols = opts.columns;
			if(!cols) return;
			var colHtml = '';
			var $thead = $(that.element).find('thead');
			var $headtr = $(that.element).find('thead tr');
			var $th = [];
			if(opts.isShowRowNum) {
				$th.push($('<th>/th').html("序号"));
			}
			for(var i = 0; i < cols.length; i++) {
				var $tempth = $('<th></th>').html(cols[i].field);
				$tempth.attr("ct-name", cols[i].name);
				$th.push($tempth);
			}
			if(!$headtr.length) {
				$headtr = $("<tr></tr>");
			}
			$headtr.append($th);
			if(!$thead.length) {
				$thead = $("<thead></thead>");
			}
			$thead.append($headtr);
			$(that.element).append($thead);
		},
		setData: function() {
			var that = this,
				opts = that.settings,
				cols = $(that.element).find("thead th"); // 看看该表格的头部有什么

			var fileds = [];
			//先拿到头部的name信息
			for(var i = 0; i < cols.length; i++) {
				var namez = $(cols[i]).attr("ct-name");
				if(namez){
				fileds.push(namez);
				}

			}
			var $allrow = [];
			// 造数据body
			for(var j = 0; j < opts.datas.length; j++) {
				var $tr = makeTr();
				var rowIndex = j + 1;
				var $rows = this.renderRow(fileds, opts.datas[j], rowIndex);
				$tr.append($rows);
				$allrow.push($tr);
			}

			$(that.element).append($allrow);

		},
		renderRow: function(fileds, row, rowIndex) {
			var rs = [],that = this,opt = that.settings;

			for(var i = 0; i < fileds.length; i++) {
				if(row[fileds[i]]) { // 如果存在该字段
					if(opt.isShowRowNum) { // 序号
						rs.push("<td>");
						rs.push(rowIndex);
						rs.push("</td>");
					}
					rs.push('<td filed="' + row[fileds[i]] + '">');
					rs.push(row[fileds[i]]);
					rs.push('</td>');
				} else {
					if(opt.isShowRowNum) { // 序号
						rs.push("<td>");
						rs.push(rowIndex);
						rs.push("</td>");
					}
					rs.push("<td>"); // 置空
					rs.push("</td>");
				}
			}
			return rs.join("");
		}
	};

	function makeTr() {
		return $("<tr></tr>");
	}

	$.fn[pluginName] = function(options) {
		this.each(function() {
			if(!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new CuteTable(this, options));
			}
		});

		// chain jQuery functions
		return this;
	};

})(jQuery, window, document);