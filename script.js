$(function() {

  alert("javascript works!");

  var $results = $("#results");

  var $loading = $("#loading");

  $loading.hide();

  function Song(title, artist) {
    this.title = title;
    this.artist = artist;
  }

  allArtists = [ //this will be rendered to the page using a template
  ];

  var $spotifySearch = $("#spotify-search"); //search form

  $spotifySearch.on('submit', function(event) { //on submit of the entire form, not just the submit button
    event.preventDefault();

    $results.empty();
    $loading.show();

    var $track = $("#track"); //user input

    var $searchTrack = $track.val(); //value of user input
    console.log($searchTrack);

    $.get(
      'https://api.spotify.com/v1/search?type=track&q=' +$searchTrack,
      function(data) {

          for (i = 0; i < 20; i++) { //looping through each track name and artist name and appending them to the allArtists array
            var artistName = (data.tracks.items[i].artists[0].name);
            var songTitle = (data.tracks.items[i].name);
            var newSong = new Song(artistName, songTitle);
            allArtists.push(newSong);
        }
        $loading.hide(); //hides loading; the page loads so quickly the gif really doesn't have time to show
        renderToPage();
        $spotifySearch[0].reset();
        $track.focus();
        return allArtists = [];
        }
      );
    });

  function renderToPage () {
    var songsTemplate = _.template($("#songs-template").html()); //compiler function

    // var $results = $("#results");

    _.each(allArtists, function (artist, title) {
      event.preventDefault(); // prevents page from reloading
        var $song = $(songsTemplate(artist, title));
        $results.append($song);
    });
  }

  // function renderToPage () {
  //   var songsTemplate = _.template($("#songs-template").html()); //compiler function
  //
  //   var $results = $("#results");
  //   var $song = $(songsTemplate(songTitle, artistName));
  //   $results.append($song);
  // }


});
