const OMDB_API_KEY = "5c42cfe"; // Replace with your OMDB API key
const BASE_URL = "https://www.omdbapi.com/";

function searchMovies() {
         const searchInput = document.getElementById("searchInput").value;
         if (!searchInput) {
                  alert("Please enter a movie title.");
                  return;
         }

         fetch(`${BASE_URL}?apikey=${OMDB_API_KEY}&s=${searchInput}`)
                  .then((response) => response.json())
                  .then((data) => displaySearchResults(data.Search))
                  .catch((error) => console.error("Error fetching data:", error));
}

function displaySearchResults(movies) {
         const searchResultsDiv = document.getElementById("searchResults");
         searchResultsDiv.innerHTML = "";

         if (!movies || movies.length === 0) {
                  searchResultsDiv.innerHTML = "<p>No results found.</p>";
                  return;
         }

         movies.forEach((movie) => {
                  const movieElement = document.createElement("div");
                  movieElement.innerHTML = `<img src="${movie.Poster}" alt="${movie.Title}">
                              <p>${movie.Title} (${movie.Year})</p>`;
                  searchResultsDiv.appendChild(movieElement);
         });
}

function addToPlaylist() {
         const playlistInput = document.getElementById("playlistInput").value;
         if (!playlistInput) {
                  alert("Please enter a movie title.");
                  return;
         }

         const playlist = document.getElementById("playlist");
         const listItem = document.createElement("li");
         listItem.innerText = playlistInput;
         playlist.appendChild(listItem);
}
