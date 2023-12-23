const OMDB_API_URL = 'https://www.omdbapi.com/';
const API_KEY = 'apikey=d6bf196a';
const cardContainer = document.querySelector('.card-container');

// Function to create a card
function createCard(movie) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    const img = document.createElement('img');
    img.src = movie.Poster;
    img.alt = movie.Title;
    img.classList.add('card-img');
    
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    
    const title = document.createElement('h2');
    title.classList.add('name');
    title.textContent = movie.Title;
    
    const description = document.createElement('h6');
    description.classList.add('des');
    description.textContent = 'Loading...'; 

    const imdbRating = document.createElement('h5');
    imdbRating.classList.add('imdbRating');
    imdbRating.textContent = 'Loading...'; 

    const Genre = document.createElement('h5');
    Genre.classList.add('Genre');
    Genre.textContent = 'Loading...'; 

    const Year = document.createElement('h5');
    Year.classList.add('Year');
    Year.textContent = 'Loading...'; 

    fetch(`${OMDB_API_URL}?t=${encodeURIComponent(movie.Title)}&${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                description.textContent = `${data.Plot}`;
                imdbRating.textContent = `IMDb Rating: ${data.imdbRating}`;
                Genre.textContent = `Genre: ${data.Genre}`;
                Year.textContent = `Year: ${data.Year}`;
            } else {
                console.error('API Error:', data.Error);
            }
        })
        .catch(error => console.error('Error fetching additional movie data:', error));

    
    // Appending elements to the card
    cardBody.appendChild(title);
    cardBody.appendChild(imdbRating);
    cardBody.appendChild(Year);
    cardBody.appendChild(Genre);
    cardBody.appendChild(description);
    
    card.appendChild(img);
    card.appendChild(cardBody);
    
    return card;
}

function displayMovies(movies) {
    // Clear existing cards
    cardContainer.innerHTML = '';

    movies.forEach((movie) => {
        const card = createCard(movie);
        cardContainer.appendChild(card);
    });
}

// Function to search movies based on user input
async function searchMovies() {
    const searchTerm = document.getElementById('search').value;

    const url = `${OMDB_API_URL}?s=${searchTerm}&${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.Response === 'True') {
            displayMovies(data.Search);
            document.getElementById("Title").innerHTML= "Your Search Results:";
            console.log(data);
        } else {
            console.error('API Error:', data.Error);
            alert("Movie name is incorrect!!\nCheck your Spelling or\nthe Movie does not exist.");
            location.reload();
        }
    } catch (error) {
        console.error('Error fetching movie data:', error.message);
    }
}

//search by pressing icon
document.querySelector('.searchButton').addEventListener('click', searchMovies);

//search by pressing enter
document.getElementById('search').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchMovies();
    }
});

//for scrolling the cards
let cardContainers = [...document.querySelectorAll(".card-container")];
  let preBtns = [...document.querySelectorAll(".pre-btn")];
  let nxtBtns = [...document.querySelectorAll(".nxt-btn")];
  
  cardContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;
  
    nxtBtns[i].addEventListener("click", () => {
      item.scrollLeft += containerWidth - 200;
    });
  
    preBtns[i].addEventListener("click", () => {
      item.scrollLeft -= containerWidth + 200;
    });
});
