/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
==============================================
*/

// Declare some global variables and functions.
let itemsPerPage = 9;
let studentList = document.querySelector('.student-list');
let linkList = document.querySelector('.link-list');

function clearHtml(element) {
   element.innerHTML = '';
}


// Add search bar
let header = document.querySelector('.header');
header.insertAdjacentHTML('beforeend', 
`<label for="search" class="student-search">
  <span>Search by name</span>
  <input id="search" placeholder="Search by name...">
  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>`);


/*
`showPage` function 
Creates and appends HTML for paginated list of student information.
@param list (array) The data array to be used.
@param page (number) The current page number.
*/

function showPage(list, page) {
   let startIndex = page * itemsPerPage - itemsPerPage;
   let endIndex = page * itemsPerPage;
   clearHtml(studentList);
   for (let i =0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         let itemContents = 
         `<li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
               <h3>${list[i].name.first} ${list[i].name.last}</h3>
               <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
               <span class="date">J${list[i].registered.date}</span>
            </div>
         </li>`;
         studentList.insertAdjacentHTML('beforeend', itemContents);
      }
   }
}


/*
`addPagination` function
Creates and appends pagination buttons.
@param list (array) The data array to be used.
*/

function addPagination(list) {
   let buttonsQty = list.length / itemsPerPage;
   clearHtml(linkList);
   for (let i = 0; i < buttonsQty; i++) {
      let buttonContents = 
      `<li>
         <button type="button">${i + 1}</button>
      </li>`;
      linkList.insertAdjacentHTML('beforeend', buttonContents);
   }
   if (buttonsQty > 0 ) {
      linkList.firstElementChild.firstElementChild.className = 'active';
   }
}


/* 
`simpleSearch` function
Builds new array called searchResults and calls showPage on searchResults.
@param searchInput The search input element.
@param list The data array containing student information.
*/

const search = document.querySelector('#search'); // Search input element
const submit = document.querySelector('.student-search button'); // Search submit button

function simpleSearch(searchInput, list) {
   clearHtml(studentList);
   let searchResults = [];
   for (let i = 0; i < list.length; i++){
      let fullName = `${list[i].name.first} ${list[i].name.last}`;
      let searchParamaters = searchInput.value.length != 0 && fullName.toLowerCase().includes(searchInput.value.toLowerCase());
      if (searchParamaters) {
         searchResults.push(list[i]);
      }
   }
   showPage(searchResults, 1);
   addPagination(searchResults); 
   if (searchInput.value.length == 0) {
      showPage(data, 1);
   } else if (searchResults.length == 0 ) {
      studentList.insertAdjacentHTML('beforeend', `<p>No results found.</p>`);
   } 
}


// Call functions
showPage(data, 1);
addPagination(data);

// Event listener for pagination buttons.
linkList.addEventListener('click', (e) => {
   if (e.target.type == 'button') {
      document.querySelector('button.active').className = '';
      e.target.className = 'active';
      let list = data; // this line
      showPage(list, e.target.textContent);
   }
});

// Event listeners for search button and keyup events.
submit.addEventListener('click', (event) => {
   event.preventDefault();
   simpleSearch(search, data);
 });

 search.addEventListener('keyup', () => {
   simpleSearch(search, data);
 });
