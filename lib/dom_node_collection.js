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
