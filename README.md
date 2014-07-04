# Breakpoints.js

jQuery plugin that makes modular responsive design possible by adding classes to elements based on defined breakpoints.



## Why?

In responsive web design, it's mostly about using media queries to adjust the layout as the screen
increases in size. Typically, this means breaking the content from a stacked layout, into additional
columns. But between breakpoints, content is allowed to stretch. So each block in a column could
potentially have alternate layouts based on the narrowness of the column it is in.

Imagine, that the block started out with a "medium" layout for the block, within a stacked mobile
design. This block would stretch to fill the width of screen, eventually revealing a "large" version
of the block. Then, when we hit tablet, the content breaks into two columns. But to fit the two
columns, the columns go back to a narrower width, forcing the block to switch to a "small" layout.
Now these two columns stretch as the screen gets wider, with the block switching through it's different
sizes. This behavior repeating each time a new column breaks out and the column gets narrower, then
stretches with the screen size. Until a better term comes along, this could be called "modular
responsive design", where a block on the page has it's own set of breakpoints and layout rules at these
breakpoints.

But with media queries, this is not easy to do as you have to either copy styles from a previous
breakpoint into the current one or else undo styles from the previous breakpoint in order resulting
in a stylesheet that is a bear to maintain.

It would be much easier to accomplish this if breakpoints were defined on individual blocks rather
than on the screen. In fact, why not treat the whole document as a block itself and define breakpoints
on everything the same way. Maybe we don't really need media queries?

Enter `breakpoints.js`, a jQuery plugin that makes modular responsive design possible by adding
classes to elements based on defined breakpoints.



## How it works

Configure the breakpoints for individual elements.

```javascript
$(function () {

  $.breakpoints({
    '.article': {
      'small': [0, 320],
      'medium': [320, 480],
      'large': [480, null]
    }
  });

});
```

This example defines breakpoints for all elements matching the `.article` jQuery selector string.
Each breakpoint has a name (`small`, `medium`, `large`) with a range of widths.

You can also define breakpoints one by one like so:

```javascript
$(function () {

  $('.article')
    .breakpoint('small', 0, 320)
    .breakpoint('medium', 320, 480)
    .breakpoint('large', 480, null);

});
```

The breakpoint name will be added to the element when the element width matches the breakpoint range.
Once breakpoints are defined, style the classes corresponding to the breakpoints.


## API

### `.breakpoint(name, min, max)`

Defines a breakpoint for matched elements.

On document load and window resize, if the element width matches the breakpoint (min <= width < max)
the provided name will be added as a class on the element.


#### Parameters

##### `name`
Type: `String`
Class name will be added to element for styling.

##### `min`
Type: `Number`
Minimum width for breakpoint. Defaults to `0` if falsy.

##### `max`
Type: `Number`
Maximum width for breakpoint. Defaults to `Infinity` if falsy.


#### Return

Returns original jQuery elements for method chaining.


#### Example

```javascript
$('.slider').breakpoint('small', 0, 320)
  .breakpoint('medium', 320, 480)
  .breakpoint('large', 480, null);
```


### `jQuery.breakpoints(config)`

Defines a set of breakpoints.


#### Parameters

##### config
Type: `Object`
jQuery selector strings as keys, list of breakpoints as values. Breakpoint
lists are keyed by breakpoint name. The value of each breakpoint is an array containing the
breakpoint min and max.


#### Example

```javascript
$.breakpoints({
  '.test': {
    'small': [0, 320],
    'medium': [320, 480],
    'large': [480, null]
  }
});
```
