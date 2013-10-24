/**
 * See https://github.com/propcom/jquery-styled-select for the README
 */
(function($){
	function StyledSelect($select, options) {
		var $selectWrap = $('<div />'),
			$selectSkin = $('<span />'),
			self = this;

		options = $.extend({
			wrapClass: 'select-style-wrap',
			skinClass: 'select-style',
			selectClass: 'styled-select'
		}, options);

		this.currVal = $('option:selected', $select).text();
		$selectWrap
			.addClass(options.wrapClass);

		$select
			.addClass(options.selectClass)
			.wrap($selectWrap);
		
		$selectSkin
			.text(this.currVal)
			.addClass(options.skinClass)
			.insertAfter($select);

		this.select = $select;
		this.skin = $selectSkin;

		function change() {
			self.refreshText();
		}

		$select.change(change);
		$select.bind('change.styled-select', change);

		// replace this select's val() with one that updates it too.
		(function(){
			var originalVal = $select.val;
			$select.val = function() {
				originalVal.apply(this, arguments);
				self.refreshText();
			}
		})();
	}

	StyledSelect.prototype = {
		setVal: function(val) {
			this.select.val(val);
		},
		setText: function(text) {
			this.skin.text(text);
		},
		refreshText: function() {
			this.setText(this.select.find('option:selected').text());
		}
	};

	$.fn.styledSelect = function(options) {
		var $this = $(this);

		if ($this.length > 1) {
			$this.each(function() {
				$(this).styledSelect(options);
			});
			return $this;
		}
		
		var ss = new StyledSelect($this, options);
		$this.data('styled-select', ss);
		return $this;
	}
})(jQuery);
