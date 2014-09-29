# Breakpoints.js

Javascript library that manages breakpoints on elements, toggling classes or executing logic on each element when the element matches the breakpoint.

See the [demo](http://reusables.io/breakpoints.js/demo/index.html) for a full example.

If you like this library, and want to see more, throw us some change on [Gratipay](https://gratipay.com/Reusables.io/)!



## Bower

```shell
bower install --save reusables-breakpoints
```



## Why?

+ __Modularity__: Rather than the style of an element depending on the screen width, I want it to depend
  on it's own width. I want the element styles to be independent of the surrounding layout.
+ __Easy to manage__: I want to see all breakpoints for a class of elements in one place, where I can
  easily modify them without mucking around with anything else. I also want all styles for a set of
  elements gathered into one place rather than scattered across many media queries and lost within
  other styles within those media queries.
+ __Easy to Preview__: I want to be able to preview what the different states for a class of elements
  look like by manually adding modifier classes rather than tediously resizing my window.
+ __Confidence__: I want the confidence of knowing that no matter what the layout does, my component
  will always look right, no matter what the layout, columns, column size, or screen width are.



## Demo

See the [demo](http://reusables.io/breakpoints.js/demo/index.html) for full examples.



## API


### `Reusables.Breakpoints.on(Function|String|jQuery elements)`

Constructs a breakpoint `Builder` object for a set of elements.

__Params__

`elements`

Type: `Function|String|jQuery`

If `Function`, it is expected to return a `jQuery` object representing the set of elements to define
breakpoints on. For internal consistency, all other types are converted to a function that returns
a `jQuery` object. The elements function is called every time breakpoints are evaluated.

If `String`, a selector string matching the elements to define breakpoints on. This string is used
to build a function that returns a `jQuery` object.

If `jQuery`, a `jQuery` object representing the elements to define breakpoints on. This object will
be used to build a function. If this `jQuery` object has a `selector` string, this selector string
is used to build a function that returns a `jQuery` object. Otherwise, the elements function will
simply return the `jQuery` object.

__Return__

Type: `Builder`

Returns a `Builder` object for defining breakpoints.


### `Builder.define(Array range, Object options)`

Defines a breakpoint range on the set of elements that were given to the `Builder` object.

Defined breakpoints are evaluated on document ready and window resize. Evaluating a breakpoint
involves iterating over each element in the breakpoint definition, determine if it is entering or
exiting the breakpoint range, and, if entering, add the modifier class and execute the enter
callback, if there is one, or, if exiting, remove the modifier class and execute the exit callback,
if there is one. If neither entering or exiting nothing happens.

__Params__

`range`

Type: `Array`

An array containing two integers representing the min and max of the range. Example: `[320, 480]`.

The min is inclusive. The max is excluded. This is so that you don't have to go through the trouble
of subtracting one from the max. You can also use `Infinity` for the max.

`options.name`

Type: `String`

The modifier class attached to the element when it matches the breakpoint. If not specified, the
default, in the format of `breakpoint-{min}-{max}`, will be added to the element.

`options.enter`

Type: `Function`

A callback to execute per element when the element enters the breakpoint range. The element is
passed to the function.

`options.exit`

Type: `Function`

A callback to execute per element when the element exits the breakpoint range. The element is
passed to the function.



## Examples


### Modifier Classes: Small, Medium, Large

If you have small, medium and large designs for your articles, you can add classes like this:

```javascript
Reusables.Breakpoints.on($articles)
  .define([0, 350], { name: 'small' })
  .define([350, 450], { name: 'medium' })
  .define([450, Infinity], { name: 'large' });
```

### Modifier Classes: Columns

In the same manner, you can use modifier classes to affect the number of columns in a layout:

```javascript
Reusables.Breakpoints.on($layout)
  .define([0, 480], { name: 'col-1' })
  .define([480, 1024], { name: 'col-2' })
  .define([1024, Infinity], { name: 'col-3' });
```

### Callbacks: Insert Ads

Perhaps you want to insert ads, despite the number of columns, every two rows of items:

```javascript
var insertAds = function (interval) { /* insert ads */ };
var removeAds = function (interval) { /* remove ads */ };

Reusables.Breakpoints.on($layout)
  .define([0, 480], {
    name: 'col-1',
    enter: function () { insertAds(2); },
    exit: function () { removeAds(2); }
  })
  .define([480, 1024], {
    name: 'col-2',
    enter: function () { insertAds(4); },
    exit: function () { removeAds(4); }
  })
  .define([1024, Infinity], {
    name: 'col-3',
    enter: function () { insertAds(6); },
    exit: function () { removeAds(6); }
  });
```

Breakpoints just gives you the hooks into your responsive design. How you insert and remove ads is
up to you. Be careful not to inflate impressions!

### Callbacks: Setup and Teardown

Perhaps you have an element on the page that is a menu at smaller screens but not on larger screens:

```javascript
var setupMenu = function () { /* setup menu */ };
var teardownMenu = function () { /* teardown menu */ };

Reusables.Breakpoints.on($(window))
  .define([0, 768], {
    name: 'menu',
    enter: setupMenu,
    exit: teardownMenu
  });
```
