async function admin() {
  let response = await fetch("http://localhost:3001/listBooks");
  let books = await response.json();

  books.forEach(renderBook);
}

function renderBook(book) {
  let bookContainer = document.querySelector("#root");
  bookContainer.innerHTML += `
        <div class="col-sm-3">
                <ul class="card-body">
                    <li class="card-title">${book.title} <input type="number" id="quantity-${book.id}"><button type="button" onclick="saveQuantity(${book.id})">Save</button></li>
                </ul>
        </div>
    `;
}

async function saveQuantity(bookId) {
  let bookQuantity = document.getElementById(`quantity-${bookId}`);
  let quantity = bookQuantity.value;

  let response = await fetch("http://localhost:3001/updateBook/${bookId}", {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ quantity: quantity }),
  });
}

admin();
