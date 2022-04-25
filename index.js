import date from './moudels/date.js';
import Book from './moudels/Book.js';
import {
  nav,
  listGroup,
  openMenu,
  closeMenu,
} from './moudels/mobile-menu.js';
import { list, add, contact } from './moudels/mobile-navs.js';
import {
  navLinks,
  listSection,
  addBookSection,
  contactSection,
} from './moudels/nav-list.js';

let booksList = JSON.parse(localStorage.getItem('book')) || [];

const books = document.querySelector('.books');

// function to get books from localStorage
const getBooks = () => {
  const storageData = localStorage.getItem('books');
  if (storageData === undefined || storageData === null) {
    return;
  }
  const storageBooks = JSON.parse(storageData);
  booksList = storageBooks;
  books.innerHTML = storageBooks
    .map((book, index) => `
      <div class=" row ${index % 2 === 0 ? 'row-bg' : ''}">
                      <span>"${book.title}" by ${book.author}</span>
                      <button type="button" class="remove" onclick='Book.removeBook(${book.id})'>Remove</button>
                  </div>`)
    .join('');
};

// functioon to remove book from bokks collections
const removeBook = (id) => {
  if (id === null) return;
  const newBooks = booksList.filter((book) => book.id !== id);
  localStorage.setItem('books', JSON.stringify(newBooks));
  getBooks();
};

// function to add book from books collection
const bookAdded = document.querySelector('.success');
const booksForm = document.querySelector('.new-book-form');
booksForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const id = Math.floor(Math.random() * 10000); // Asign random Id for each
  const item = new Book(id, title, author); // Add book for the class Book
  booksList = [...booksList, item];
  localStorage.setItem('books', JSON.stringify(booksList)); // Add the new bookList to the local storage
  bookAdded.style = 'display: block';
  setTimeout(() => {
    bookAdded.style = 'display: none';
  }, 2000);
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  getBooks();
});

// handle menu
const handleClose = () => {
  nav.style.transform = '';
  listGroup.style.transform = '';
};

openMenu.addEventListener('click', () => {
  nav.style.transform = 'translateX(0%)';
  listGroup.style.transform = 'translateX(0%)';
});

closeMenu.addEventListener('click', () => {
  handleClose();
});

// sections
navLinks.forEach((listEl) => listEl.addEventListener('click', handleClose));

list.addEventListener('click', () => {
  listSection.classList.remove('display');
  addBookSection.classList.add('display');
  contactSection.classList.add('display');
});
add.addEventListener('click', () => {
  listSection.classList.add('display');
  addBookSection.classList.remove('display');
  contactSection.classList.add('display');
});

contact.addEventListener('click', () => {
  listSection.classList.add('display');
  addBookSection.classList.add('display');
  contactSection.classList.remove('display');
});
const defaultDisplay = () => {
  listSection.classList.remove('display');
  addBookSection.classList.add('display');
  contactSection.classList.add('display');
};

// handle dates actions

const handleTime = () => {
  const dateContainer = document.querySelector('.date-container');
  dateContainer.innerHTML = date;
};

window.addEventListener('load', () => {
  getBooks();
  handleTime();
  removeBook(null);
  defaultDisplay();
});