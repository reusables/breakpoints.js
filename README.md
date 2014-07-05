# Breakpoints.js

jQuery plugin that makes modular responsive design possible by adding classes to elements based on defined breakpoints.



## Why?

Let's say I have a block in a responsive design. I have three versions of the block: "small", "medium",
and "large". Imagine this block in a single column layout. It starts off at "medium", then stretches
to "large", until eventually another column is introduced, and it goes to "small" because the column
it is in is made smaller in order to fit the newly added column. This same sort of thing happens as
each additional column is introduced and the columns stretch. Until a better term comes along, we can
call this "modular responsive design".

But with media queries, this is not easy to do. You end up copying rules across breakpoints in order
to reproduce the layout of the block. Media queries are only concerned with the width of the screen,
whereas the layout of the block is determined by the width of the block itself. It would be much
easier to accomplish this if breakpoints were defined on individual blocks rather than on the screen.

Enter `breakpoints.js`, a jQuery plugin that makes modular responsive design possible by adding
classes to elements based on defined breakpoints. And voila! You have modular responsive design.



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
Each breakpoint has a name (`small`, `medium`, `large`) each with a range of widths.

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

See the [demo](http://reusables.io/breakpoints.js/demo/) for a full example.


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
