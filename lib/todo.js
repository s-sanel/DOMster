() => {
  debugger
  this.addClickToItems();
}

function addNewItem() {
  let inputValue = $ds("#input-todo").elements()[0].value;
  let item = `<li>${inputValue}</li>`;
  $ds("#input-todo").elements()[0].value = "";
  $ds(".todo-list").append(item);
}


function addClickToItems(){
  let items = $ds(".todo-list").children();

  items.elements().forEach( el => {
    $ds(el).on("click", (e) => {
      const t = e.target
      const del = $ds(t);
      if(del) {
        // del.remove();
        del.toggleClass("checked")
      }
    });
  });
}

function addDeleteToItems(){
  let items = $ds(".todo-list").children();

  items.elements().forEach( el => {
    $ds(el).on("dblclick", (e) => {
      const t = e.target
      const del = $ds(t);
      if(del) {
        del.remove();
      }
    });
  });
}


function checkAllTodos(){
  let items = $ds(".todo-list").children();
  items.addClass("checked");
}

function uncheckAllTodos(){
  let items = $ds(".todo-list").children();
  items.removeClass("checked");
}

function toggleAllTodos(){
  let items = $ds(".todo-list").children();
  items.toggleClass("checked");
}

function clearTheList(){
  $ds("li").remove();
}

function removeFirst(){
  $ds(".todo-list").children().first().remove();
}
