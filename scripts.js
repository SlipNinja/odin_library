

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {
        return(`${this.title} ${this.author} ${this.pages} ${this.read}`);
    }
}

const library = [];

function addBook(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    library.push(book);
}

addBook("The beginning", "Mickael Jackson", 3, false);
addBook("The middle earth", "Tolkien", 300, true);
addBook("How to raise a snake", "Macaron", 666, false);

library.forEach(function (book) {
    //console.log(book.info());
    let bookDisplay = document.createElement("div");
    bookDisplay.classList.add("book");

    let title = document.createElement("div");
    let titleContent = document.createTextNode(book.title);
    title.appendChild(titleContent);

    let author = document.createElement("div");
    let authorContent = document.createTextNode(book.author);
    author.appendChild(authorContent);

    let pages = document.createElement("div");
    let pagesContent = document.createTextNode(book.pages);
    pages.appendChild(pagesContent);

    let read = document.createElement("div");
    let readContent = document.createTextNode(book.read);
    read.appendChild(readContent);

    bookDisplay.appendChild(title);
    bookDisplay.appendChild(author);
    bookDisplay.appendChild(pages);
    bookDisplay.appendChild(read);

    let lib = document.getElementsByClassName("library")[0];
    lib.appendChild(bookDisplay);
});

function showForm() {
    const form = document.getElementById("addForm");

    form.style.display = (!form.style.display || form.style.display == "none") ? "flex" : "none";
}