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
      let list = data;
      showPage(list, e.target.textContent);
   }
});

// Call functions
showPage(data, 1);
addPagination(data);

