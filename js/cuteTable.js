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

		}

	function CuteTable(element, options) {
		this.element = element;
		this.settings = $.extend({}, defaluts, options);
		this._defaults = defaluts;
		this._name = pluginName;
		this.version = 'v1.0.1';
		this.init();
	}

	CuteTable.prototype = {
		init: function() {
			var that = this;
			console.info("i am init");
		}
	};

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