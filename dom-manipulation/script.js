
// Array of quote objects
// const quotes = [
//     { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
//     { text: "Success is not how high you have climbed, but how you make a positive difference.", category: "Motivation" },
//     { text: "Your time is limited, so don't waste it living someone else's life.", category: "Life" },
//     { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Dreams" }
// ];

// Function to load quotes from local storage
function loadQuotesFromLocalStorage() {
    const storedQuotes = localStorage.getItem('quotes');
    return storedQuotes ? JSON.parse(storedQuotes) : [];
}

// Array of quote objects, initialized from local storage
const quotes = loadQuotesFromLocalStorage();

// Function to save quotes to local storage
function saveQuotesToLocalStorage() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
};




// Function to show a random quote
function displayRandomQuote() {

    const quoteDisplay = document.getElementById('quoteDisplay');
    if (quotes.length === 0) {
        quoteDisplay.textContent = "No quotes available.";
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const showRandomQuote = quotes[randomIndex];

    // // Display the quote in the quoteDisplay div
    // const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `"${showRandomQuote.text}" - Category: ${showRandomQuote.category}`;
};


// Function to create and display the add quote form
function addQuote() {
    // Create form elements
    const createAddQuoteForm = document.createElement('form');
    const quoteInput = document.createElement('input');
    const categoryInput = document.createElement('input');
    const submitButton = document.createElement('button');
    const exportButton = document.createElement('button');
    const importInput = document.createElement('input');

    // Set attributes and placeholders for the inputs
    quoteInput.setAttribute('type', 'text');
    quoteInput.setAttribute('placeholder', 'Enter quote');
    categoryInput.setAttribute('type', 'text');
    categoryInput.setAttribute('placeholder', 'Enter category');
    submitButton.textContent = 'Add Quote';
    exportButton.innerHTML = 'Export Quotes';
    importInput.setAttribute('type', 'file');
    importInput.setAttribute('accept', 'application/json');

    // Append inputs and button to the form
    createAddQuoteForm.appendChild(quoteInput);
    createAddQuoteForm.appendChild(categoryInput);
    createAddQuoteForm.appendChild(submitButton);
    createAddQuoteForm.appendChild(exportButton);
    createAddQuoteForm.appendChild(importInput);

    // Handle form submission
    createAddQuoteForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form from submitting normally

        // Get the values from the inputs
        const newQuoteText = quoteInput.value;
        const newQuoteCategory = categoryInput.value;

        // Add the new quote object to the quotes array
        quotes.push({ text: newQuoteText, category: newQuoteCategory });

        // Save the updated quotes array to local storage
        saveQuotesToLocalStorage();

        // Clear the inputs after submission
        quoteInput.value = '';
        categoryInput.value = '';

        // Optionally show a success message 
        alert('Quote added successfully!');
    });


    // Handle export button click
    exportButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent form from submitting normally
        const dataStr = JSON.stringify(quotes, null, 2); // Pretty print JSON
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quotes.json'; // Name of the downloaded file
        document.body.appendChild(a); // Append anchor to body
        a.click(); // Trigger the download
        document.body.removeChild(a); // Remove the anchor from the document
        URL.revokeObjectURL(url); // Free up memory
    });


    // Handle file input for importing quotes
    importInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                try {
                    const importedQuotes = JSON.parse(e.target.result);
                    if (Array.isArray(importedQuotes)) {
                        quotes.push(...importedQuotes);
                        saveQuotesToLocalStorage();
                        alert('Quotes imported successfully!');
                    } else {
                        alert('Invalid JSON format! Must be an array of quotes.');
                    }
                } catch (error) {
                    alert('Error reading file!');
                }
            };
            reader.readAsText(file);
        }
    });

    // Append the form to the body 
    document.body.appendChild(createAddQuoteForm);
}




// Event listener to display a random quote when the button is clicked
const showNewQuote = document.getElementById('newQuote');
showNewQuote.addEventListener('click', displayRandomQuote);

// Call the function to create and display the add quote form when the page loads
addQuote();


// Display a random quote on initial load if there are quotes
displayRandomQuote();