// Function to expand the recipe card on hover
function expandRecipe(recipe) {
    recipe.classList.add('expanded');
}

// Function to shrink the recipe card when not hovered
function shrinkRecipe(recipe) {
    recipe.classList.remove('expanded');
}

// Function to navigate to the selected recipe's page
// egg1.js

function viewRecipe(recipeName) {
    // Redirect to the individual recipe page for the selected recipe
    window.location.href = `/recipe/${recipeName}`;
}

// egg.js

function makeClickable(element, recipeName) {
    element.style.cursor = 'pointer';
    element.onclick = function() {
        window.location.href = `/recipe/${recipeName}`;
    };
}


