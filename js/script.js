/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
let itemsPerPage = 9;
let studentList = document.querySelector('.student-list');
let linkList = document.querySelector('.link-list');

function clearHtml(element) {
   element.innerHTML = '';
}

function showPage(list, page) {
   let startIndex = page * itemsPerPage - itemsPerPage;
   let endIndex = page * itemsPerPage;
   studentList.innerHTML = '';
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
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
   let buttonsQty = list.length / itemsPerPage;
   linkList.innerHTML = '';
   for (let i = 0; i < buttonsQty; i++) {
      let buttonContents = 
      `<li>
         <button type="button">${i + 1}</button>
      </li>`;
      linkList.insertAdjacentHTML('beforeend', buttonContents);
   }
   linkList.firstElementChild.firstElementChild.className = 'active';
}

linkList.addEventListener('click', (e) => {
   if (e.target.type == 'button') {
      document.querySelector('button.active').className = '';
      e.target.className = 'active';
      let list = data; // this line
      showPage(list, e.target.textContent);
   }
});

// Call functions
showPage(data, 1);
addPagination(data);


// Add search bar

let header = document.querySelector('.header');
header.insertAdjacentHTML('beforeend', 
`<label for="search" class="student-search">
  <span>Search by name</span>
  <input id="search" placeholder="Search by name...">
  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>`);

/* 
`simpleSearch` function
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
         // output new list
         // list = newList;
         searchResults.push(list[i]);
      }
   }
   showPage(searchResults, 1);
   console.log(searchResults.length);
}

submit.addEventListener('click', (event) => {
   event.preventDefault();
   // call simple search on new array
   simpleSearch(search, data);
 });

 search.addEventListener('keyup', () => {
   // call simple search on new array
   simpleSearch(search, data);
 });