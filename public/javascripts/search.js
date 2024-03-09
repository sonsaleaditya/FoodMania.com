// // search.js

// document.addEventListener('DOMContentLoaded', function() {
//     const searchForm = document.getElementById('searchForm');
//     const resultContainer = document.getElementById('resultContainer');

//     searchForm.addEventListener('submit', function(event) {
//         event.preventDefault(); // Prevent default form submission

//         const searchInput = document.getElementById('searchInput').value;
//         const category = 'egg'; // This can be dynamically set based on user selection

//         // Perform an AJAX request
//         const xhr = new XMLHttpRequest();
//         xhr.onreadystatechange = function() {
//             if (xhr.readyState === XMLHttpRequest.DONE) {
//                 if (xhr.status === 200) {
//                     // Response received successfully
//                     const response = JSON.parse(xhr.responseText);
//                     renderResults(response);
//                 } else {
//                     // Handle error cases
//                     resultContainer.innerHTML = 'Error fetching data';
//                 }
//             }
//         };

//         // Construct the URL for the search endpoint
//         const url = `/search/${category}?srch=${searchInput}`;
        
//         // Open the request and send it
//         xhr.open('GET', url);
//         xhr.send();
//     });

//     // Function to render search results
//     function renderResults(data) {
//         // Logic to render the received data on the webpage
//         // Example: Display data in resultContainer
//         resultContainer.innerHTML = ''; // Clear previous results
        
//         if (data && data.egg) {
//             data.egg.forEach(recipe => {
//                 // Create HTML elements and append to resultContainer
//                 const recipeDiv = document.createElement('div');
//                 recipeDiv.textContent = recipe.RecipeName;
//                 resultContainer.appendChild(recipeDiv);
//             });
//         } else {
//             resultContainer.innerHTML = 'No results found';
//         }
//     }
// });
