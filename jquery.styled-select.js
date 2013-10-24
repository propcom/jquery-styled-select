/**
 * jQuery utility to style up select boxes
 *
 * $(selector).styledSelect()
 *
 * Creates a wrapping div and a span. The span is kept up to date with the value.
 *
 * The select itself gets the class styled-select.
 * The div is select-style-wrap.
 * The actual styling span is select-style.
 *
 * Users should ensure that styled-select is opacity: 0 and that it has a higher 
 * z-index than select-style. Box sizing may also be necessary.
 *
 * The API is added to the 'styled-select' data entry:
 * 		api = $(selector).data('styled-select')
 *
 * 	The API contains:
 *	* setVal: sets the value of the select itself
 *	* setText: sets the displayed text but not the value
 *	* refreshText: sets the displayed text by interrogating the value
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
		$select.bind('change.select-style', change);

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
