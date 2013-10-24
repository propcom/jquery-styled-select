# jquery.styled-select.js

### jQuery utility to style up select boxes
 
    $(selector).styledSelect()
 
Creates a wrapping div and a span. The span is kept up to date with the value.

### styles

* The select itself gets the class `styled-select`.
* The div is `select-style-wrap`.
* The actual styling span is `select-style`.

Users should ensure that `styled-select` is `opacity: 0` and that it has a higher 
`z-index` than `select-style`. Box sizing may also be necessary.

### API

The API is added to the 'styled-select' data entry:

    api = $(selector).data('styled-select')

The API contains:

* setVal: sets the value of the select itself
* setText: sets the displayed text but not the value
* refreshText: sets the displayed text by interrogating the value
