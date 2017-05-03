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



function fetchPhoto() {
  let tag = $ds(".tag-photo").elements()[0].value;
  $ds.ajax({
    method: 'GET',
    url: `https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${tag}&rating=g`,
    success: data => addPhotoToDOM(data)
  });
}

function addPhotoToDOM(data) {

  let url = JSON.parse(data).data.image_url;
  if (url.split("")[4] !== 's') {
    url = [url.slice(0, 4), 's', url.slice(4)].join('');
  }
  let img = `<img class="photo-gif" src="${ url }" />`;
  $ds('.gallery').last().append(img);
}
