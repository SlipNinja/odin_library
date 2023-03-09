

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        return (`${this.title} ${this.author} ${this.pages} ${this.read}`);
    }

    changeReadStatus() {
        this.read = !this.read;
    }
}


const library = [];

function addBook(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    library.push(book);

    return book;
}

function createCard(book) {
    let bookDisplay = document.createElement("div");
    bookDisplay.classList.add("book");
    bookDisplay.dataset.index = library.indexOf(book);

    let title = document.createElement("div");
    let titleContent = document.createTextNode(book.title);
    title.style["font-weight"] = "bold";
    title.appendChild(titleContent);

    let author = document.createElement("div");
    let authorContent = document.createTextNode(`by ${book.author}`);
    author.appendChild(authorContent);

    let pages = document.createElement("div");
    let pagesContent = document.createTextNode(`${book.pages} pages`);
    pages.appendChild(pagesContent);

    let read = document.createElement("div");
    let readDisplay = book.read ? "Already read" : "Not read yet";
    let readContent = document.createTextNode(readDisplay);
    read.appendChild(readContent);
    read.classList.add("readstatus");

    let buttons = document.createElement("div");

    let readBtn = document.createElement("button");
    let readBtnText = document.createTextNode(book.read ? "Mark unread" : "Mark as read");
    readBtn.appendChild(readBtnText);
    readBtn.onclick = toggleRead;

    let delBtn = document.createElement("button");
    let delBtnText = document.createTextNode("Delete");
    delBtn.appendChild(delBtnText);
    delBtn.onclick = deleteBook;

    buttons.appendChild(readBtn);
    buttons.appendChild(delBtn);

    bookDisplay.appendChild(title);
    bookDisplay.appendChild(author);
    bookDisplay.appendChild(pages);
    bookDisplay.appendChild(read);
    bookDisplay.appendChild(buttons);

    return bookDisplay;
}

function toggleRead(e) {
    let buttonClicked = e.srcElement;
    let bookDisplay = buttonClicked.parentElement.parentElement;
    let index = bookDisplay.dataset.index;
    let book = library[index];

    book.changeReadStatus();

    let readDisplay = bookDisplay.querySelector(".readstatus");
    readDisplay.innerHTML = book.read ? "Already read" : "Not read yet";
    buttonClicked.innerHTML = book.read ? "Mark unread" : "Mark as read";
}

function deleteBook(e) {
    let bookToDelete = e.srcElement.parentElement.parentElement;
    let index = bookToDelete.dataset.index;

    library.splice(index, 1);
    bookToDelete.remove();

    let books = document.getElementsByClassName("book");
    let i = 0;
    for (let bookDisplay of books){
        bookDisplay.dataset.index = i++;
    }
    //console.log(library);
}

addBook("The beginning", "Mickael Jackson", 3, false);
addBook("The middle earth", "Tolkien", 300, true);
addBook("How to raise a snake", "Macaron", 666, false);

library.forEach(function (book) {
    let bookDisplay = createCard(book);

    let lib = document.getElementById("library");
    lib.appendChild(bookDisplay);
});

const addForm = document.getElementById("addForm");

addForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = +document.getElementById("pages").value;
    let read = document.getElementById("read").checked;

    let newBook = addBook(title, author, pages, read);
    let bookDisplay = createCard(newBook);

    let lib = document.getElementById("library");
    lib.appendChild(bookDisplay);

    event.target.reset();
    event.target.style.display = "none";
});

function showForm() {
    addForm.style.display = (!addForm.style.display || addForm.style.display == "none") ? "flex" : "none";
}