/* STEP 2: Reference the HEADER and the SECTION elements with variables */
const header = document.querySelector('header');
const section = document.querySelector('section');

/* STEP 3a: Create the asynchronous function populate() */
async function populate(){
    // STEP 4: Store the URL of a JSON file in a variable */
    const requestURL = './js/i-scream.json'; // Path to the local JSON file
    // STEP 5: Use the new URL to create a new request object
    const request = new Request(requestURL);
    // STEP 6: Make a network request with the fetch() function, which returns a Response object
    const response = await fetch(request); 
    // STEP 7: Capture the returned Response object and convert to a JSON object using json()
    const iScream = await response.json();

    // STEP 8: Output the iScream JSON object to the console 
    console.log(iScream);

    // STEP 9a: Invoke the populateHeader function here, then build it below
    populateHeader(iScream);
    // STEP 10a: Invoke the showTopFlavors function here, then build it below
    showTopFlavors(iScream);
}

// STEP 3b: Call the populate() function
populate();

/* STEP 9b: Build out the populateHeader() function */
function populateHeader(jsonObj) {
    const headerH1 = document.createElement('h1');
    headerH1.textContent = jsonObj.companyName;
    header.append(headerH1);
};

/* STEP 10b: Assemble the showTopFlavors() function */
function showTopFlavors(jsonObj) {
    let topFlavors = jsonObj.topFlavors;
    console.log(topFlavors);

    // STEP 10d: Loop through the topFlavors object
    for (let i = 0; i < topFlavors.length; i++) {
        let article = document.createElement('article');
        let h2 = document.createElement('h2');
        let image = document.createElement('img');
        let ul = document.createElement('ul');
        let pCalories = document.createElement('p');
        let pType = document.createElement('p');

        h2.textContent = topFlavors[i]['name'];
        image.setAttribute('src', './images/' + topFlavors[i].image);

        // Displaying Calories
        let calories = topFlavors[i].calories;
        pCalories.textContent = `Calories: ${calories}`;

        // Make calories visually interesting with colors and progress bars
        if (calories > 350) {
            pCalories.style.color = 'red';  // High calories are red
            pCalories.style.fontWeight = 'bold';
            pCalories.style.fontSize = '1.2em';
        } else if (calories > 250) {
            pCalories.style.color = 'orange'; // Medium calories are orange
        } else {
            pCalories.style.color = 'green';  // Low calories are green
        }

        // Make a progress bar based on the calories
        let progressBar = document.createElement('div');
        progressBar.style.width = `${calories / 5}%`; // Example of a progress bar based on calories
        progressBar.style.height = '10px';
        progressBar.style.backgroundColor = '#4CAF50';
        progressBar.style.marginTop = '10px';

        // Displaying Type
        let type = topFlavors[i].type;
        pType.textContent = `Type: ${type}`;

        // Style for different types (ice cream vs sorbet)
        if (type === 'ice cream') {
            article.style.backgroundColor = '#f1c40f'; // Yellow for ice cream
        } else if (type === 'sorbet') {
            article.style.backgroundColor = '#3498db'; // Blue for sorbet
        }

        let ingredients = topFlavors[i]['ingredients'];
        for (let j = 0; j < ingredients.length; j++) {
            let listItem = document.createElement('li');
            listItem.textContent = ingredients[j];
            ul.appendChild(listItem); // Add ingredient to the UL
        }

        // Append elements to the article
        article.appendChild(h2);
        article.appendChild(image);
        article.appendChild(pCalories);  // Append calories info
        article.appendChild(progressBar);  // Append progress bar for calories
        article.appendChild(pType);     // Append type info
        article.appendChild(ul);        // Append ingredients list
        section.appendChild(article);
    };
}
