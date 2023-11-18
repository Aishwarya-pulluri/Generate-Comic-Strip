const form = document.getElementById('comicForm');
const comicStrip = document.getElementById('comicStrip');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const panels = document.querySelectorAll('input');
    const textArray = Array.from(panels).map(panel => panel.value);

    // Make API call for each panel
    textArray.forEach((text, index) => {
        fetch('https://text-to-image7.p.rapidapi.com/?prompt=${encodeURIComponent(text)}&batch_size=1&negative_prompt=ugly%2C%20duplicate%2C%20morbid%2C%20mutilated%2C%20%5Bout%20of%20frame%5D%2C%20extra%20fingers%2C%20mutated%20hands%2C%20poorly%20drawn%20hands%2C%20poorly%20drawn%20face%2C%20mutation%2C%20deformed%2C%20blurry%2C%20bad%20anatomy%2C%20bad%20proportions', {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '4385ea6a9bmsh5353e790d7737f7p157887jsn75ce4d2f004f',
                'X-RapidAPI-Host': 'text-to-image7.p.rapidapi.com'
            }
        })
        .then(response => response.json())
        .then(data => {
            // Display the generated image in the respective panel
            const image = document.createElement('img');
            image.src = data.image_url;
            comicStrip.appendChild(image);
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error and display appropriate feedback to the user
        });
    });
});
