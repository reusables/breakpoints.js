/* * * * * * * * * */
/*= breakpoints.js =*/
/* * * * * * * * * */

(function ($) {


  /*= CLASS DEFINITIONS =*/

  function Breakpoint($elements, name, min, max) {
    this.$elements = $elements;
    this.name = name;
    this.min = min || 0;
    this.max = max || Infinity;
  }

  Breakpoint.prototype = {
    evaluate: function () {
      var breakpoint = this;
      this.$elements.each(function (i, el) {
        var $el = $(el);
        var width = $el.outerWidth();
        var match = breakpoint.min <= width && width < breakpoint.max;
        $el.toggleClass(breakpoint.name, match);
      });
    }
  };



  /* INTERNALS */

  var breakpoints = [];

  var evaluateBreakpoints = function () {
    $.each(breakpoints, function (i, breakpoint) {
      breakpoint.evaluate();
    });
  };



  /* EVENT HANDLERS */

  $(document).on('ready.breakpoints', evaluateBreakpoints);
  $(window).on('resize.breakpoints', evaluateBreakpoints);



  /* PLUGIN API */

  /**
   * Defines a breakpoint for matched elements.
   *
   * On document load and window resize, if the element width matches the breakpoint (min <= width < max)
   * the provided name will be added as a class on the element.
   *
   * Example:
   * ```javascript
   * $('.slider').breakpoint('small', 0, 320)
   *   .breakpoint('medium', 320, 480)
   *   .breakpoint('large', 480, null);
   *```
   *
   * @param String name Breakpoint name. Class name will be added to element for styling.
   * @param Number min Minimum width for breakpoint. Set to 0 if falsy.
   * @param Number max Maximum width for breakpoint. Set to Infinity if falsy.
   * @return jQuery Returns original jQuery elements for method chaining.
   */
  $.fn.breakpoint = function (name, min, max) {
    breakpoints.push(new Breakpoint(this, name, min, max));
    return this;
  };



  /**
   * Defines a set of breakpoints.
   *
   * Example:
   * ```javascript
   * $.breakpoints({
   *   '.test': {
   *     'small': [0, 320],
   *     'medium': [320, 480],
   *     'large': [480, null]
   *   }
   * });
   * ```
   *
   * @param  Object config jQuery selector strings as keys, list of breakpoints as values. Breakpoint
   * lists are keyed by breakpoint name. The value of each breakpoint is an array containing the
   * breakpoint min and max.
   */
  $.breakpoints = function (config) {
    $.each(config, function (selector, breakpoints) {
      var $elements = $(selector);
      $.each(breakpoints, function (name, range) {
        $elements.breakpoint(name, range[0], range[1]);
      });
    });
  };



})(jQuery);
