//Songs Array
// A Song has id,name, artist,img,genre,source
const songs = [
    {
        id: 1,
        name: "Ae Dil Hai Mushkil",
        artist: "Arijit Singh",
        image: 'assets/images/rock/Ae_Dil_Hai_Mushkil.PNG',
        genre: "rock",
        source: 'assets/songs/rock/Ae_Dil_Hai_Mushkil_Title_Song_320_Kbps.mp3'
    },
    {
        id: 2,
        name: "Nadaan Parinde",
        artist: "A R Rahman",
        image: 'assets/images/rock/nadaan_parindey.PNG',
        genre: "rock",
        source: 'assets/songs/rock/Nadaan Parindey - Rockstar 128 Kbps.mp3'
    },
    {
        id: 3,
        name: "Sun Raha Hai",
        artist: "Ankit Tiwari",
        image: 'assets/images/rock/Sun_raha_hai.PNG',
        genre: "rock",
        source: 'assets/songs/rock/Sunn Raha Hai Na Tu - Aashiqui 2_128-(DJMaza).mp3'
    },
    {
        id: 4,
        name: "Lut Gaye",
        artist: "Jubin Nautyal",
        image: 'assets/images/pop/Lut_Gaye.PNG',
        genre: "pop",
        source: 'assets/songs/pop/Lut Gaye - Jubin Nautiyal 128 Kbps.mp3'
    },
    {
        id: 5,
        name: "Param Sundari",
        artist: "Shreya Ghoshal",
        image: 'assets/images/pop/param_sundari.PNG',
        genre: "pop",
        source: 'assets/songs/pop/Param-Sundari(PaglaSongs).mp3'
    },
    {
        id: 6,
        name: "Raataan Lambiyan",
        artist: "Jubin Nautyal",
        image: 'assets/images/pop/Ratta_Lambiya.PNG',
        genre: "pop",
        source: 'assets/songs/pop/Raataan Lambiyan - Shershaah 128 Kbps.mp3'
    },
    {
        id: 7,
        name: "Bachpan Ka Pyaar",
        artist: "Baadshah",
        image: 'assets/images/hiphop/bachpan_ka_pyaar.PNG',
        genre: "hiphop",
        source: 'assets/songs/hiphop/Bachpan Ka Pyaar - Badshah 128 Kbps.mp3'
    },
    {
        id: 8,
        name: "Jugnu",
        artist: "Baadshah",
        image: 'assets/images/hiphop/jugnu.PNG',
        genre: "hiphop",
        source: 'assets/songs/hiphop/Jugnu - Badshah_128-(PagalWorld.Ink).mp3'
    },
    {
        id: 9,
        name: "Saiyaan Ji",
        artist: "Yo Yo Honey Singh",
        image: 'assets/images/hiphop/Saiyaan Ji.PNG',
        genre: "hiphop",
        source: 'assets/songs/hiphop/Saiyaan Ji(PagalWorld.com.se).mp3'
    }
]

// To keep track of currently playing song index
let currentSongIndex = -1;


// Toggle Theme Function - sets the data theme attribute to change the theme
const toggleButton = document.getElementById("toggle-button");
toggleButton.addEventListener("click", toggleTheme);

function toggleTheme() {
    document.body.classList.toggle("dark-mode");

}

//****************Song Section****************

// showSongs() - to render the list of all songs depending on the currently selected genre
function showSongs(genre) {
    const songsList = document.querySelector(".songs-list");
    songsList.innerHTML = '';

    if (genre === "all") {
        songs.forEach(song => {
            const songEl = document.createElement("h3");
            songEl.textContent = song.name;
            songEl.classList.add("song-style");
            songsList.appendChild(songEl);
            //Adding click EventListener to each song for rendering it on the song card
            songEl.addEventListener("click", () => {
                currentSongIndex = song.id - 1;
                clearCard();
                renderCurrentSong(song);
            });
        });
    }
    // Change Event Handler for every drop down genre
    else {
        const filteredSongs = songs.filter(song => song.genre === genre);
        filteredSongs.forEach(song => {
            const songEl = document.createElement("h3");
            songEl.textContent = song.name;
            songEl.classList.add("song-style");
            songsList.appendChild(songEl);
            //Adding click EventListener to each song for rendering it on the song card
            songEl.addEventListener("click", () => {
                currentSongIndex = song.id - 1;
                clearCard();
                renderCurrentSong(song);
            });
        });
    }

}
//Adding Event Listener to the Filter by Genre dropdown
document.getElementById("genre-select").addEventListener("change", function () {
    const selectedGenre = this.value;
    showSongs(selectedGenre);
});
//All songs will be displayed by default
showSongs("all");



// Song Card - Currently selected song should be displayed with its Image, song name and artist name
const cardImage = document.querySelector(".song_img");
const cardName = document.querySelector(".song_name");
const cardArtist = document.querySelector(".artist_name");
const audioElement = document.getElementById("audio");

//Function to clear the song card
function clearCard() {
    cardImage.src = "";
    cardArtist.textContent = "";
    cardName.textContent = "";
    audioElement.src = "";
}

// renderCurrentSong() - render the currently selected song and play it
function renderCurrentSong(song) {
    cardImage.src = song.image;
    cardArtist.textContent = song.artist;
    cardName.textContent = song.name;
    audioElement.src = song.source;
    audioElement.play();
}

// Search a Song
const search_song_input = document.getElementById("search_song");
const search_song_button = document.getElementById("search_song_button");
const songsList = document.querySelector(".songs-list");

//Function to search a song
function searchSong(searchQuery) {
    songsList.innerHTML = '';
    const filteredSongs = songs.filter(song => song.name.toLowerCase().includes(searchQuery.toLowerCase()));
    filteredSongs.forEach(song => {
        const songEl = document.createElement("h3");
        songEl.textContent = song.name;
        songsList.appendChild(songEl);
        songEl.classList.add("song-style");
        //Adding click EventListener to each song for rendering it on the song card
        songEl.addEventListener("click", () => {
            currentSongIndex = song.id - 1;
            clearCard();
            renderCurrentSong(song);
        });
    });
}



// Adding Event Listener to search song button
search_song_button.addEventListener("click", () => {
    const query = search_song_input.value.trim();
    searchSong(query);
});

//Next, Prev buttons functionality
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");



//Function to handle the edge cases of previous and next buttons
function updateButtonState() {
    prevButton.disabled === currentSongIndex === 0;
    nextButton.disabled === currentSongIndex === songs.length - 1;
}

//Adding Event Listener for prev button
prevButton.addEventListener("click", () => {
    if (currentSongIndex > 0) {
        currentSongIndex--;
        renderCurrentSong(songs[currentSongIndex]);
        updateButtonState();
    }
});

//Adding Event Listener for next button
nextButton.addEventListener("click", () => {
    if (currentSongIndex < songs.length - 1) {
        currentSongIndex++;
        renderCurrentSong(songs[currentSongIndex]);
        updateButtonState();
    }
});


// Playlist Section Functionality
//Create Playlist

// New Playlist Name
const newPlaylistName = document.getElementById("new-playlist");

// Create Playlist Button
const createPlaylistButton = document.getElementById('create-playlist');

// Playlist Songs Container
const playListSongsContainer = document.getElementById("playlistSongs");

// Playlists Container
const playlistContainer = document.querySelector(".playlist-container");

// Add to Playlist Button
const addtoPlaylistButton = document.getElementById("add");

// Current Playlist Container
const currentPlaylistContainer = document.querySelector('.current-playlist');

// Remove song button
const removeButtonsList = document.querySelector(".song-remove-buttons")

//Array to store Playlists
const playlists = [];

//Object to store and preserve the songs of each playlist
const playlistSongs = {};



// addToPlaylist() - Add the song to the currently selected playlist
function addToPlaylist(song, playlistName) {
    if (!playlistSongs[playlistName].includes(song)) {
        playlistSongs[playlistName].push(song);
        console.log("Song Added to Playlist");

        //Display the updated Playlist
        renderPlaylistSong(playlistName);
    }
    else {
        alert("Song is Already Present in the Playlist");
    }
}

// createPlaylist() - Create playlist and add it to all playlist options
function createPlaylist(playlistName) {
    if (playlistName === "") {
        alert("No Playlist name provided. Please enter a valid name");
    }

    if (!playlists.includes(playlistName)) {
        playlists.push(playlistName);

        playlistSongs[playlistName] = [];

        displayPlaylists();

        newPlaylistName.value = "";
    }
    else {
        alert("Playlist with the given name already exists");
    }
}

//Function to add Playlist to the playlist dropdown List
function addToPlaylistList() {
    playlistContainer.innerHTML = "";
    for (const playlistName in playlists) {
        const playlistEl = document.createElement("h3");
        playlistEl.textContent = playlistName;
        playlistContainer.appendChild(playlistEl);
        playlistEl.classList.add("playlist-style");
    }
    displayPlaylists();
}


// renderPlaylistSong() - Render the selected playlist songs
function renderPlaylistSong(playlistName) {
    playListSongsContainer.innerHTML = "";
    console.log(playlistSongs[playlistName].length);
    console.log(playlistSongs[playlistName]);
    console.log(playlistSongs[playlistName].length);
    if (playlistSongs[playlistName] && playlistSongs[playlistName].length > 0) {
        const playListsongs = playlistSongs[playlistName];
        console.log(playListsongs);
        playListsongs.forEach(song => {
            console.log(song);
            const songEl = document.createElement('h3');
            songEl.textContent = song.name;
            songEl.classList.add("playlist-song-style");
            playListSongsContainer.appendChild(songEl);
            //Event Listener for rendering song on card and playing it
            let foundSongId = null;
            songEl.addEventListener("click", () => {
                for (let i = 0; i < songs.length; i++) {
                    if (songs[i].name === song.name) {
                        foundSongId = songs[i].id;
                        break; // Stop the loop once you find the song
                    }
                }
                currentSongIndex = foundSongId - 1;
                console.log(currentSongIndex);
                clearCard();
                renderCurrentSong(song);
                console.log(currentSongIndex);
                // Create a "Remove" button
                const removeButton = document.createElement('button');
                const icon = document.createElement("i");
                icon.style.color = "#FF2400";
                icon.classList.add("fa-solid");
                icon.classList.add("fa-trash");
                removeButton.appendChild(icon);
                removeButton.classList.add("remove-button");
                removeButtonsList.appendChild(removeButton);
                removeButton.addEventListener('click', () => {
                    // Remove the song from the playlist
                    const index = playListsongs.indexOf(song);
                    if (index != -1) {
                        playListsongs.splice(index, 1);
                        console.log("Song removed from playlist");
                        //Clearing Song Card and Re-display the updated playlist
                        clearCard();
                        console.log(index);
                        if (index > 0) {
                            console.log(playListsongs[index - 1]);
                            currentSongIndex = playListsongs[index - 1].id - 1;
                            renderCurrentSong(playListsongs[index - 1]);
                        }
                        else {
                            currentSongIndex = 0;
                            renderCurrentSong(songs[0]);
                        }

                        removeButtonsList.removeChild(removeButton);
                        console.log(currentSongIndex);
                        console.log(playlistName);
                        renderPlaylistSong(playlistName);
                    }
                    else {
                        alert("Selected song does not exist in the selected playlist");
                    }

                });
            });


        });

    }
    else {
        const el = document.createElement("h2");
        el.style.fontFamily = "'Montserrat', sans-serif";
        el.style.fontWeight = "bolder";
        el.textContent = "No Songs in the Playlist"
        playListSongsContainer.textContent = el.textContent;
    }
}

//Event Listener for creating a new Playlist
createPlaylistButton.addEventListener('click', () => {
    const playListName = newPlaylistName.value.trim();
    if (playListName) {
        createPlaylist(playListName);
        newPlaylistName.value = "";
    }
});

//Event Listener for adding the currently playing song to the currently selected Playlist
addtoPlaylistButton.addEventListener("click", () => {
    const currentPlaylist = document.querySelector(".current-playlist-style").textContent;
    console.log(currentPlaylist);
    console.log(currentSongIndex);
    const currentSong = songs[currentSongIndex];
    addToPlaylist(currentSong, currentPlaylist);
});

//Function to display the list of existing Playlists
function displayPlaylists() {
    playlistContainer.innerHTML = "";
    playlists.forEach(playlist => {
        const playlistEl = document.createElement("h3");
        playlistEl.textContent = playlist;
        playlistEl.classList.add("playlist-style");
        playlistContainer.appendChild(playlistEl);
        playlistEl.addEventListener("click", () => {
            currentPlaylistContainer.innerHTML = "";
            const currentPlaylistName = document.createElement("h3");
            currentPlaylistName.textContent = playlist;
            currentPlaylistName.classList.add("current-playlist-style");
            currentPlaylistContainer.appendChild(currentPlaylistName);
            renderPlaylistSong(playlist);
        });
    });
}


//Function to search a Playlist
function searchPlaylist(query) {
    playlistContainer.innerHTML = '';
    playlists.forEach(playlist => {
        if (playlist.toLowerCase().includes(query)) {
            const option = document.createElement("h3");
            option.textContent = playlist;
            playlistContainer.appendChild(option);
            option.classList.add("playlist-style");
            option.addEventListener("click", () => {
                currentPlaylistContainer.innerHTML = "";
                const currentPlaylistName = document.createElement("h3");
                currentPlaylistName.textContent = option.textContent;
                currentPlaylistName.classList.add("current-playlist-style");
                currentPlaylistContainer.appendChild(currentPlaylistName);
                renderPlaylistSong(option.textContent);
            });
        }
    });

}

//Adding Event Listener for searching a Playlist
const searchPlaylistButton = document.getElementById("search-playlist-button");
searchPlaylistButton.addEventListener("click", () => {
    const searchQuery = document.getElementById("search-playlist-text").value.trim().toLowerCase();
    searchPlaylist(searchQuery);
});

//Event Listener to see previously created Playlist after searching a particular playlist
document.getElementById("all-playlists").addEventListener("click", () => {
    displayPlaylists();
});
