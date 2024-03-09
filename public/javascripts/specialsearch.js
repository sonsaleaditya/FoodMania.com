// JavaScript

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
            
    const category = document.getElementById('category').value;
    const ingredients = document.getElementById('ingredients').value;

    // Build the URL based on selected category and ingredients
    const url = `/specialsearch/${category}?ingredients=${ingredients}`;

    // Redirect to the constructed URL
    window.location.href = url;

    // Add or remove classes for color change based on category
    document.getElementById('category').classList.remove('green', 'yellow', 'red');
    document.getElementById('ingredients').classList.remove('green', 'yellow', 'red');
    document.querySelector('button[type="submit"]').classList.remove('green', 'yellow', 'red');
    if (category === 'veg') {
        document.getElementById('category').classList.add('green');
        document.getElementById('ingredients').classList.add('green');
        document.querySelector('button[type="submit"]').classList.add('green');
    } else if (category === 'egg') {
        document.getElementById('category').classList.add('yellow');
        document.getElementById('ingredients').classList.add('yellow');
        document.querySelector('button[type="submit"]').classList.add('yellow');
    } else if (category === 'nonveg') {
        document.getElementById('category').classList.add('red');
        document.getElementById('ingredients').classList.add('red');
        document.querySelector('button[type="submit"]').classList.add('red');
    }
});
