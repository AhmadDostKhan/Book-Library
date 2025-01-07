let bookList = [];

function renderBooks() {
  const bookTable = document.querySelector("#book-list tbody");
  bookTable.innerHTML = "";

  bookList.forEach((book, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.category}</td>
      <td>${book.borrowHistory.join(", ") || "No borrow history"}</td>
      <td><button class="borrow-btn" data-index="${index}">Borrow</button></td>
      <td><button class="remove-btn" data-index="${index}">Remove</button></td>
    `;

    bookTable.appendChild(row);
  });

  const borrowButtons = document.querySelectorAll(".borrow-btn");
  borrowButtons.forEach((button) => {
    button.addEventListener("click", handleBorrow);
  });

  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", handleRemove);
  });
}

document.getElementById("add-book-btn").addEventListener("click", function () {
  const title = document.getElementById("book-title").value;
  const author = document.getElementById("book-author").value;
  const category = document.getElementById("book-category").value;

  if (title && author && category) {
    bookList.push({
      title,
      author,
      category,
      borrowHistory: [],
    });
    renderBooks();
    clearInputs();
  } else {
    alert("Please fill in all fields");
  }
});

function clearInputs() {
  document.getElementById("book-title").value = "";
  document.getElementById("book-author").value = "";
  document.getElementById("book-category").value = "";
}

function handleBorrow(event) {
  const index = event.target.dataset.index;
  const borrower = prompt("Enter your name:");

  if (borrower) {
    bookList[index].borrowHistory.push(borrower);
    renderBooks();
  }
}

function handleRemove(event) {
  const index = event.target.dataset.index;
  bookList.splice(index, 1);
  renderBooks();
}

document.getElementById("search-btn").addEventListener("click", function () {
  const query = document.getElementById("search-input").value.toLowerCase();
  const filteredBooks = bookList.filter(
    (book) =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.category.toLowerCase().includes(query)
  );

  displaySearchedBooks(filteredBooks);
});

function displaySearchedBooks(books) {
  const bookTable = document.querySelector("#book-list tbody");
  bookTable.innerHTML = "";

  books.forEach((book, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.category}</td>
      <td>${book.borrowHistory.join(", ") || "No borrow history"}</td>
      <td><button class="borrow-btn" data-index="${index}">Borrow</button></td>
      <td><button class="remove-btn" data-index="${index}">Remove</button></td>
    `;

    bookTable.appendChild(row);
  });
}
