
// Array of quote objects
const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
    { text: "Success is not how high you have climbed, but how you make a positive difference.", category: "Motivation" },
    { text: "Your time is limited, so don't waste it living someone else's life.", category: "Life" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Dreams" }
];




// Function to show a random quote
function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];

    // Display the quote in the quoteDisplay div
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.textContent = `"${selectedQuote.text}" - Category: ${selectedQuote.category}`;
};


// Function to create and display the add quote form
function addQuote() {
    // Create form elements
    const form = document.createElement('form');
    const quoteInput = document.createElement('input');
    const categoryInput = document.createElement('input');
    const submitButton = document.createElement('button');

    // Set attributes and placeholders for the inputs
    quoteInput.setAttribute('type', 'text');
    quoteInput.setAttribute('placeholder', 'Enter quote');
    categoryInput.setAttribute('type', 'text');
    categoryInput.setAttribute('placeholder', 'Enter category');
    submitButton.textContent = 'Add Quote';

    // Append inputs and button to the form
    form.appendChild(quoteInput);
    form.appendChild(categoryInput);
    form.appendChild(submitButton);

    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form from submitting normally

        // Get the values from the inputs
        const newQuoteText = quoteInput.value;
        const newQuoteCategory = categoryInput.value;

        // Add the new quote object to the quotes array
        quotes.push({ text: newQuoteText, category: newQuoteCategory });

        // Clear the inputs after submission
        quoteInput.value = '';
        categoryInput.value = '';

        // Optionally show a success message 
        alert('Quote added successfully!');
    });

    // Append the form to the body 
    document.body.appendChild(form);
}


// Event listener to display a random quote when the button is clicked
const showNewQuote = document.getElementById('newQuote');
showNewQuote.addEventListener('click', displayRandomQuote);

// Call the function to create and display the add quote form when the page loads
addQuote();

