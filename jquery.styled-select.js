/**
 * See https://github.com/propcom/jquery-styled-select for the README
 */
(function($){
	function StyledSelect($select) {
		var $selectWrap = $('<div class="select-style-wrap" />'),
			$selectSkin = $('<span class="select-style" />'),
			self = this;

		this.currVal = $('option:selected', $select).text();
		$select
			.addClass('styled-select')
			.wrap($selectWrap);
		$selectSkin
			.text(this.currVal)
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

	$.fn.styledSelect = function() {
		var $this = $(this);

		if ($this.length > 1) {
			$this.each(function() {
				$(this).styledSelect();
			});
			return $this;
		}
		
		var ss = new StyledSelect($this);
		$this.data('styled-select', ss);
		return $this;
	}
})(jQuery);
