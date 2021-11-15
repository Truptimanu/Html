class Book {
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book){
        const list = document.getElementById("book-list");
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X </a></td>
        `;
        list.appendChild(row);


    }

    showAlert(message, className){
        const div = document.createElement("div");
        //add a classname
        div.className = `alert ${className}`;
        //Add text
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        container.insertBefore(div, form);
      
        //set timeout after 3 sec
        setTimeout(function () {
          document.querySelector(".alert").remove();
        }, 3000);

    }
    deleteBook(target){
        if (target.className === "delete") {
            target.parentElement.parentElement.remove();
          }

    }
    clearFields(){
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("isbn").value = "";

    }

}

//Local storage class
class store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')=== null){
        books = [];
        }
        else{
        books = JSON.parse(localStorage.getItem('books'));
        }
        return books;



    }
    static displayBooks(){
        const books = store.getBooks();
        books.forEach(function(book){
            const ui = new UI;
            ui.addBookToList(book);
        });

    }
    static addBook(book){
        const books = store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));

    }
    static removeBook(isbn){
        const books = store.getBooks();

        books.forEach(function(book,index){
            if(book.isbn ===isbn){
                books.splice(index, 1);
            }

        });
        localStorage.setItem('books',JSON.stringify(books));


    }
}
//DOM Load Event
document.addEventListener('DOMContentLoaded', store.displayBooks);

//Event listeners for add book
document.getElementById("book-form").addEventListener("submit", function (e) {
    //console.log('test');
  
    //Get form value
    const title = document.getElementById("title").value,
      author = document.getElementById("author").value,
      isbn = document.getElementById("isbn").value;
    //console.log(title,author,isbn);
  
    //Instantiate book
    const book = new Book(title, author, isbn);
    // console.log(book);
  
    //Instantiate UI
    const ui = new UI();
  
    //validate
    if (title === " " || author === "" || isbn === "") {
      //ERror alert
      ui.showAlert("Please fill in all the fields", "error");
    } else {
      //Add book to list
      ui.addBookToList(book);

      //Add to Local storage
      store.addBook(book);

  
      //show success
      ui.showAlert("Book Added!", "success");
  
      //Clear fields
      ui.clearFields();
    }
  
    //   console.log(ui);
  
    e.preventDefault();
  });
  
  //Event listeners for delete
  document.getElementById("book-list").addEventListener("click", function (e) {
    const ui = new UI();
  
    ui.deleteBook(e.target);
    //Remove from Local storage
    store.removeBook(e.target.parentElement.previousSibling.textContent);
    ui.showAlert("Book successfully deleted", "success");
    e.preventDefault();
  });
  