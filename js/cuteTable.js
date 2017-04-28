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
			isShowRowNum:true
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
			if(opts.isShowRowNum){
				$th.push($('<th>/th').html("序号"));
			}
			for(var i = 0; i < cols.length; i++) {
				$th.push($('<th>/th').html(cols[i].field));
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
		setData:function(){
			var opts = that.settings;
			var that = this;
		 	var cols = $(that.element).find("thead td");
			var $tr = makeTr();
			for (var i =0;) {
				
			}
		}
	};
	
	function makeTr(){
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