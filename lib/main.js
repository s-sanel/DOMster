const DOMNodeCollection = require('./dom_node_collection.js');

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
