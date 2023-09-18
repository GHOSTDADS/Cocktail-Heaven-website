// const submissionFormHandler = async (event) => {
//     event.preventDefault();


// }


// document
//   .querySelector('.cocktail-form')
//   .addEventListener('submit', submissionFormHandler);

document.addEventListener('DOMContentLoaded', function () {
    const cocktailSubmit = document.getElementById('cocktail-form');
    const ingredientForm = document.getElementById('ingredients');
    const addIngredientButton = document.getElementById('addIngredient');
    let ingredientCounter = 1;

    addIngredientButton.addEventListener('click', function () {
        if(ingredientCounter <= 9){
        ingredientCounter++;
        const newInput = document.createElement('input');
        const newDiv = document.createElement('div');
        const newControl = document.createElement('div');
        newDiv.classList.add('field');
        newControl.classList.add('control');
        newInput.classList.add('input');
        newInput.type = 'text';
        newInput.name = `ingredient${ingredientCounter}`;
        newInput.placeholder = `Ingredient ${ingredientCounter}`;
        newControl.appendChild(newInput);
        newDiv.appendChild(newControl);
        ingredientForm.appendChild(newDiv);
        }
    });

    cocktailSubmit.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(cocktailSubmit);
        const ingredients = {};
        for (const [key, value] of formData.entries()) {
            ingredients[key] = value;
        }
        
        console.log(JSON.stringify(ingredients));
        // Send ingredients data to your backend API using curl or fetch
        // Example using fetch:
        fetch('/api/cocktails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredients),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});