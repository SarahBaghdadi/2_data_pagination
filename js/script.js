/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

 /*
Set global variables.
*/
let itemsPer = 9; // How many items per page to show.
const studentList = document.querySelector('.student-list'); // Ul containing student data in lis.
const linkList = document.querySelector('.link-list'); //Ul containing pagination buttons.

 /*
`showPage` function
Creates and appends the elements needed to display a page of students.
@param list The data array containing student information.
@param page The current page number.
*/
function renderListItem(item) {
   const picture = item.picture.large;
   const firstName = item.name.first;
   const lastName = item.name.last;
   const email = item.email;
   const dateJoined = item.registered.date; 
   studentList.insertAdjacentHTML('beforeend',
   `<li class="student-item cf">
      <div class="student-details">
      <img class="avatar" src="${picture}" alt="Profile Picture">
      <h3>${firstName} ${lastName}</h3>
      <span class="email">${email}</span>
      </div>
      <div class="joined-details">
      <span class="date">Joined ${dateJoined}</span>
      </div>
   </li>`);
}


function showPage (list, page){
   let startIndex = page * itemsPer - itemsPer - 1;
   let endIndex = page * itemsPer;
   studentList.innerHTML = '';
   for (i=0; i < list.length; i++){
      if (i > startIndex && i < endIndex){
         renderListItem(list[i]);
      }
   }
}

/*
`addPagination` function
Creates and appends pagination buttons.
*/

function addPagination (list){
   let buttonsQty = Math.ceil(list.length / itemsPer); 
   linkList.innerHTML = '';
   for (i = 0; i < buttonsQty; i++){
      linkList.insertAdjacentHTML('beforeend', 
      `
      <li>
         <button type="button">${i+1}</button>
      </li>
      `)
   };
   linkList.firstElementChild.firstElementChild.className = 'active';
 }

/*
Pagination event listener.
*/

 linkList.addEventListener('click', (e) => {
    if (e.target.type == 'button') {
      let buttonRemoveActive = document.querySelector('.active');
      buttonRemoveActive.className = '';
      e.target.className = 'active';
      let buttonInt = e.target.textContent;
      showPage(data, buttonInt);
    }
 });



// Search bar 

const header = document.querySelector('header');
header.insertAdjacentHTML('beforeend', 
   `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
   `
)

// Simple search function

 /* Variables to reference the `input` and search `button` elements */
 const search = document.querySelector('#search');
 const submit = document.querySelector('.student-search button');
 
 function simpleSearch (searchInput, list) {
   studentList.innerHTML = '';
   for (let i = 0; i < list.length; i++){
      let fullName = `${list[i].name.first} ${list[i].name.last}`;
      if ((searchInput.value.length != 0 && fullName.toLowerCase().includes(searchInput.value.toLowerCase())) || searchInput.value.length == 0) {
         renderListItem(list[i]);
     } 
   }
 }
   
 /* submit listener button click */
 submit.addEventListener('click', (event) => {
   event.preventDefault();
   simpleSearch(search, data);
 });
 
 /* submit listener keyup */
 search.addEventListener('keyup', () => {
   simpleSearch(search, data);
 });

// Call functions
showPage(data, 1);
addPagination(data);