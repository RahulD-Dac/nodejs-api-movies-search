const searchForm = document.getElementById('searchForm');
const searchResultsDiv = document.getElementById('searchResults');

searchForm.addEventListener('submit', (event) => {
         event.preventDefault();

         const searchQuery = event.target.elements.search.value;
         searchMovies(searchQuery);
});

function searchMovies(searchQuery) {
         fetch(`https://www.omdbapi.com/?apikey=5c42cfe&s=${searchQuery}`)
                  .then((response) => response.json())
                  .then((data) => {
                           displayResults(data.Search || []);
                  })
                  .catch((error) => console.error('Error searching movies:', error));
}

function displayResults(data) {
         searchResultsDiv.innerHTML = '';  

         if (data.length === 0) {
                  const errorMessage = document.createElement('p');
                  errorMessage.textContent = 'No movies found.';
                  searchResultsDiv.appendChild(errorMessage);
         } else {
                  data.forEach((movie) => {
                           const movieElement = document.createElement('div');
                           movieElement.classList.add('movie');

                           const titleElement = document.createElement('h2');
                           titleElement.textContent = movie.Title;
                           movieElement.appendChild(titleElement);

                           const yearElement = document.createElement('p');
                           yearElement.textContent = `Year: ${movie.Year}`;
                           movieElement.appendChild(yearElement);

                           const posterElement = document.createElement('img');
                           posterElement.src = movie.Poster;
                           posterElement.alt = `${movie.Title} Poster`;
                           movieElement.appendChild(posterElement);

                           searchResultsDiv.appendChild(movieElement);
                  });
         }
}
