/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DOMNodeCollection {

  constructor(array){
    this.array = array;
  }

  html(arg){
    if (typeof arg === "string") {
      this.array.forEach( el =>  el.innerHTML = arg );
    }else{
      if(this.array.length > 0) {
        return this.array[0].innerHTML;
      }
    }
  }

  empty() {
    this.html('');
  }

  append(arg){
    if (typeof arg === "string") {
      this.array.forEach( el => el.innerHTML += arg);
    } else if (arg instanceof HTMLElement){
      this.array.forEach( (el) => {
          el.innerHTML += arg.outerHTML;
      });
    } else {
      for (var i = 0; i < arg.array.length; i++) {
        let node = arg.array[i];
        this.array.forEach( (el) => {
            el.innerHTML += node.outerHTML;
        });
      }
    }
  }

  attr(key, value){
    if (typeof value === "string"){
      this.array.forEach( el =>  el.setAttribute(key, value));
    }else{
      return this.array[0].getAttribute(key);
    }
  }

  elements() {
   return this.array;
  }

  addClass(className){
    this.array.forEach( el => el.classList.add(className));
  }

  removeClass(className){
    this.array.forEach( el => el.classList.remove(className));
  }

  toggleClass(className) {
    this.array.forEach( el => el.classList.toggle(className));
  }

  children(){
    let childNodes = [];
    this.array.forEach((node) => {
      let nodeChildren = node.children;
      childNodes = childNodes.concat(Array.from(nodeChildren));
    });
    return new DOMNodeCollection(childNodes);
  }

  parent(){
    let parents = [];
    this.array.forEach((node) => {
      let parent = node.parentElement;
      parents.push(parent);
    });
    return new DOMNodeCollection(parents);
  }

  find(arg) {
    let foundNodes = [];
    this.array.forEach(node => {
      const selected = node.querySelectorAll(arg);
      foundNodes = foundNodes.concat(Array.from(selected));
    });
    return new DOMNodeCollection(foundNodes);
  }

  create(el){
    return new DOMNodeCollection(el);
  }

  remove() {
    this.array.forEach(node => node.parentNode.removeChild(node));
  }

  first() {
    let children = [];
    this.array.forEach(el => {
      children = children.concat(Array.from(el.children));
    });
    return new DOMNodeCollection(children.slice(0, 1));
  }

  last() {
    let children = [];
    this.array.forEach(el => {
      children = children.concat(Array.from(el.children));
    });
    return new DOMNodeCollection(children.slice(-1));
  }

  length() {
    return this.array.length;
  }

  on(eventName, callback) {
    this.array.forEach(node => {
      node.addEventListener(eventName, callback);
      const eventKey = `domster-${eventName}`;
      if (typeof node[eventKey] === "undefined") {
        node[eventKey] = [];
      }
      node[eventKey].push(callback);
    });
  }

  off(eventName) {
    this.array.forEach(node => {
      const eventKey = `domster-${eventName}`;
      if (node[eventKey]) {
        node[eventKey].forEach(callback => {
          node.removeEventListener(eventName, callback);
        });
      }
      node[eventKey] = [];
    });
  }

}

module.exports = DOMNodeCollection;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(0);

const _docReadyCallbacks = [];
let _docReady = false;

window.$ds = element => {
  switch(typeof(element)){
    case "function":
      return registerDocReadyCallback(element);
    case "string":
      return getNodesFromDom(element);
    case "object":
      if(element instanceof HTMLElement){
        return new DOMNodeCollection([element]);
      }
  }
};

$ds.extend = (...args) => {
  const firstObject = args[0];
  args.slice(1).forEach(arg => {
    Object.keys(arg).forEach(key => {
      firstObject[key] = arg[key];
    });
  });
  return firstObject;
};



$ds.ajax = function (options) {

  return new Promise( (resolve, reject) => {
    const defaults = {
      method: 'get',
      url: '',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: {},
      success: () => {},
      error: () => {},
      dataType: 'jsonp'
    };
    $ds.extend(defaults, options);

    const xhr = new XMLHttpRequest();
    xhr.open(defaults.method, defaults.url);
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        defaults.success(xhr.response);
        resolve(xhr.response);
      } else {
        defaults.error(xhr.response);
        reject(xhr.responseText);
      }
    };
    xhr.send(JSON.stringify(defaults.data));
  });
};


toQueryString = obj => {
  let result = "";
  for(let prop in obj){
    if (obj.hasOwnProperty(prop)){
      result += prop + "=" + obj[prop] + "&";
    }
  }
  return result.substring(0, result.length - 1);
};

registerDocReadyCallback = func => {
  if(!_docReady){
    _docReadyCallbacks.push(func);
  } else {
    func();
  }
};

getNodesFromDom = selector => {
  const nodes = document.querySelectorAll(selector);
  const nodes_array = Array.from(nodes);
  return new DOMNodeCollection(nodes_array);
};

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docReadyCallbacks.forEach( func => func() );
});


/***/ })
/******/ ]);
//# sourceMappingURL=domster.js.map