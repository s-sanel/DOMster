# DOMster

DOMster is a lightweight JavaScript DOM interaction library inspired by jQuery. Library can be used across browsers for processing AJAX requests, event handling, and DOM traversal and manipulation. DOMster works by wrapping JavaScript functions for accessing the Document Object Model into more intuitive syntax.

## Getting Started

The quickest way to get started with DOMster is to download this library into your project and include the webpack output `domster.js` in your source code.

```html
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="./css/reset.css">
  <script type="text/javascript" src="./lib/domster.js"></script>
  ...
</head>
```


## API

[`$ds`](#l)  

[DOM Traversal](#dom-traversal)  
  * [`children`](#children)  
  * [`parent`](#parent)  

[DOM Manipulation](#dom-manipulation)  
  * [`html`](#html)  
  * [`empty`](#empty)  
  * [`append`](#append)  
  * [`remove`](#remove)  
  * [`attr`](#attr)  
  * [`addClass`](#addclass)  
  * [`removeClass`](#removeclass)  
  * [`toggleClass`](#toggleclass)  

[Event Listeners](#event-listeners)  
  * [`on`](#on)  
  * [`off`](#off)  

[`$ds.ajax`](#lajax)  

### $ds

The DOMster library utilizes the global variable of `$ds` as a wrapper for all of the methods in the DOMster library.  

`$ds` is most commonly used to select elements with CSS selectors.  `$ds("div")` returns a `DOMNodeCollection` object which is an object custom to the DOMster library that is an array of `HTMLElement`s.  

`$ds` can also be used to create `DOMNodeCollection` objects from unwrapped `HTMLElement`s giving these elements access to DOMster methods.  

The third use of `$ds` takes in a string of HTML code, builds `HTMLElement`(s) from the code, and then wraps the `HTMLElement`(s) in a `DOMNodeCollection` object.

The final use of `$ds` is as tool to queue functions to run once the COM is fully loaded.

```javascript
// Wrapped in $ds, this function will only run once the DOM is fully loaded
$ds(() => {

  // The element variable is a DOMNodeCollection object, an array-like
  //structure, with all the div elements, so DOMNodeCollection such as `each`
  //may be used
  const elements = $ds("div");

  elements.each((element) => {

    // This use of $ds takes the string of HTML code, creates a HTMLElement,
    // and wraps the HTMLElement in a DOMNodeCollection object
    const paragraph = $ds("<p></p>");

    // Because the elements contained by the DOMNodeCollection are still
    // HTMLElements, they must be wrapped in an DOMNodeCollection before using
    // DOMNodeCollection methods such as `append`
    const $dselement = $ds(element);
    $dselement.append(paragraph);

  });

});
```

### DOM Traversal

`DOMNodeCollection` methods to navigate DOM elements

#### `children`

Returns a `DOMNodeCollection` object containing all of the children elements of every `HTMLElement` in the original `DOMNodeCollection`.  Note that this only includes the direct children.

#### `parent`

Returns a `DOMNodeCollection` object containing the parent elements of every `HTMLElement` in the original `DOMNodeCollection`.  

### DOM Manipulation

`DOMNodeCollection` methods to view and/or change DOM elements

#### `html`

Returns the `innerHTML` for the first element in the `DOMNodeCollection` if no argument is given.  If a string argument is given, changes the `innerHTML` of each `DOMNodeCollection` element to the string argument.

#### `empty`

Empties the innerHTML of each `DOMNodeCollection` element

#### `append`

Takes a single `HTMLElement`, `DOMNodeCollection`, or `string` argument and appends it to each `DOMNodeCollection` element.

#### `remove`

Remove each `DOMNodeCollection` element from the DOM.

#### `attr`

Takes either one (`attr(attribute)`) or two (`attr(attribute, value)`) arguments.  If given one argument, the method gets the value of the attribute given for the the first element in the `DOMNodeCollection`.  The method sets the attribute, given as the first argument, as the value, given as the second argument, for each `DOMNodeCollection` element.

#### `addClass`

Adds a class, given as an argument, to each `DOMNodeCollection` element.

#### `removeClass`

Removes a class, given as an argument, from each `DOMNodeCollection` element.

#### `toggleClass`

Toggles a class, given as an argument, for each `DOMNodeCollection` element.

### Event Listeners

```javascript
function handler () {
  alert("Element clicked!")
}
domnodecollection.on("click", handler);
domnodecollection.off("click");
```

#### `on`

Adds event listener to each `DOMNodeCollection` element.  List of events are available [here](https://developer.mozilla.org/en-US/docs/Web/Events).

#### `off`

Removes event listener from each `DOMNodeCollection` element.

### $ds.ajax

Sends HTTP Request and returns a `Promise` object.  Accepts a `Hash` object as an argument with any of the following attributes:
  * method (default: "GET"): HTTP Request method or type
  * url (default: window.location.href): URL for HTTP Request
  * success: success callback
  * error: error callback
  * contentType (default: 'application/x-www-form-urlencoded; charset=UTF-8'): content type of HTTP Request

```javascript
$ds.ajax({
  url: "/widgets.json",
  method: "POST",
  data: {
    widget: {
      name: "The Best Widget",
      maker: "The Widget King"
    }
  },
  success(widgetData) {
    console.log("Widget created!");
    // `create` action should `render json: @widget`
    // this gives the client access to the `id` attribute issued by
    // the server.
    console.log("issued id: " + widgetData.id);
  }
});
```

## Example

For an example of a project using the DOMster library, view the Demo [code](https://github.com/s-sanel/DOMster-demo/).  
To run the demo, see [live demo][DOMster].

[DOMster]: http://sanel-selmanovic.us/DOMster-demo/
