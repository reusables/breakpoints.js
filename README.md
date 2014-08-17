# Breakpoints.js

jQuery plugin that makes modular responsive design possible by adding classes to elements based on defined breakpoints.

See the [demo](http://reusables.io/breakpoints.js/demo/) for a full example.

If you like this library, and want to see more, throw me some change on [gittip](https://www.gittip.com/jstoutenburg/)!



## Bower

```shell
bower install --save breakpoints-js
```



## Why?

+ __Modularity__: Rather than the style of an element depending on the screen width, I want it to depend
  on it's own width.
  I want the element styles to be independent of the surrounding layout.
+ __Easy to manage__: I want to see all breakpoints for a class of elements in one place, where I can
  easily modify them without mucking around with anything else. I also want all styles for a set of
  elements gathered into one place rather than scattered across many media queries and lost within
  other styles within those media queries.
+ __Easy to Preview__: I want to be able to preview what the different states for a class of elements
  look like by manually adding modifier classes rather than tediously resizing my window.
+ __Confidence__: I want the confidence of knowing that no matter what the layout does, my component
  will always look right, no matter what the layout, columns, column size, or screen width are.



## How it works

Configure the breakpoints for a set of elements:

```javascript
  $(function () {

    Reusables.Breakpoints.on('.article')
      .define([0, 350], { name: 'small' })
      .define([350, 450], { name: 'medium' })
      .define([450, Infinity], { name: 'large' });

  });
```

This example defines breakpoints for all elements matching the `.article` jQuery selector string.
Each breakpoint has a name (`small`, `medium`, `large`) each with a range of widths.

The breakpoint name will be added to the element when the element width matches the breakpoint range.
Once breakpoints are defined, style the modifier classes corresponding to the breakpoints.



## Demo

See the [demo](http://reusables.io/breakpoints.js/demo/) for full examples.
