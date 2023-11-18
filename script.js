// Function to handle form submission
document.getElementById('comicForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get input values for each panel
    const panel1 = document.getElementsByName('panel1')[0].value;
    const panel2 = document.getElementsByName('panel2')[0].value;
    const panel3 = document.getElementsByName('panel3')[0].value;
    const panel4 = document.getElementsByName('panel4')[0].value;
    const panel5 = document.getElementsByName('panel5')[0].value;
    const panel6 = document.getElementsByName('panel6')[0].value;
    const panel7 = document.getElementsByName('panel7')[0].value;
    const panel8 = document.getElementsByName('panel8')[0].value;
    const panel9 = document.getElementsByName('panel9')[0].value;
    const panel10 = document.getElementsByName('panel10')[0].value;

    // Repeat for panels 3 to 10
    
    // Create an array of panel inputs
    const panels = [panel1, panel2, panel3, panel4, panel5, panel6, panel7, panel8, panel9, panel10];
    
    // Call the API to generate the comic strip
    generateComic(panels);
});

// Function to call the API and generate the comic strip
function generateComic(panels) {
    const data = {
        inputs: panels.join('\n') // Join panel inputs with line breaks
    };
    
    fetch('https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud', {
        headers: {
            'Accept': 'image/png',
            'Authorization': 'Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            return response.blob();
        } else {
            throw new Error('Failed to generate comic strip');
        }
    })
    .then(result => {
        // Display the generated comic panels
        displayComic(result);
    })
    .catch(error => {
        // Handle errors and display error message
        console.error(error);
        displayError('An error occurred. Please try again later.');
    });
}

// Function to display the generated comic panels
function displayComic(imageBlob) {
    const comicDisplay = document.getElementById('comicDisplay');
    
    // Create a new panel element for each generated image
    const panel = document.createElement('div');
    panel.classList.add('panel');
    
    // Create an image element and set the source to the generated image
    const image = document.createElement('img');
    image.src = URL.createObjectURL(imageBlob);
    
    // Append the image to the panel and the panel to the comic display
    panel.appendChild(image);
    comicDisplay.appendChild(panel);
}

// Function to display error messages
function displayError(message) {
    const comicDisplay = document.getElementById('comicDisplay');
    
    // Create a new panel element for the error message
    const panel = document.createElement('div');
    panel.classList.add('panel');
    
    // Set the error message as the panel content
    panel.textContent = message;
    
    // Append the panel to the comic display
    comicDisplay.appendChild(panel);
}
