# jquery.styled-select.js

### jQuery utility to style up select boxes
 
    $(selector).styledSelect();

	// These are the defaults
    $(selector).styledSelect({
		wrapStyle: 'select-style-wrap',
		skinStyle: 'select-style',
		selectStyle: 'styled-select'
	});
 
Creates a wrapping div and a span. The span is kept up to date with the value.

### Styles

The following styles are applied by default.

* The select itself gets the class `styled-select`.
* The div is `select-style-wrap`.
* The actual styling span is `select-style`.

Users should ensure that `styled-select` is `opacity: 0` and that it has a higher 
`z-index` than `select-style`. Box sizing may also be necessary.

The styles can be overridden by passing an object to the plugin:

* wrapStyle changes `select-style-wrap`
* skinStyle changes `select-style`
* selectStyle changes `styled-select`

### API

The API is added to the 'styled-select' data entry:

    api = $(selector).data('styled-select')

The API contains:

* setVal: sets the value of the select itself
* setText: sets the displayed text but not the value
* refreshText: sets the displayed text by interrogating the value

### Events

The plugin listens to two events, `change` and `change.styled-select`. The former
is obviously triggered by the browser, but the latter is one you can trigger
manually in order to have the select update. This allows you to refresh any select
element without having to test whether the API exists in its data object.

	// This requires you to know about the plugin
	if (api = $(selector).data('styled-select')) {
	    api.setVal(value);
	}

	// This works regardless, and doesn't end up in a funny loop
	$(selector).val(value).trigger('change.styled-select')

However! If you have kept hold of your original objects, the `val()` method on
those is augmented to automatically refresh anyway. This is simply a utility,
and probably should not be relied on.
