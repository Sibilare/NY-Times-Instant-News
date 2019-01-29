// Problem: Retrieve content from th NYT Top Stories API and add it to our site.
//  If we don't get a successful response, let the user know.

// 1. Listen for the select menu to change (watch the value change)
// 1b. If selec value is "" do nothing and return from the function immediatlely.
// 1c. Show a loader and clear out old stories.
// 2. send a request to the NYT API for data based on the alue of the select menu

// retrieve the request back from NYT

// 3. If successful, parse the data and decide waht parts we want to append to our DOM
// 4. Append that stuff to the DOM

// 5. If unsuccessful, append and show a helpful error message to the user in the UI.
// 6. Hide the loader again
//  #sections is in the HTML pull down menu on where the button is


var counter;
var theChosenOne;
var searchData;

const apikey = ".json?api-key=6zPut2zYIQrpVjIpLBIV9KBSSCJcYSBL";
const website = "https://api.nytimes.com/svc/topstories/v2/";
console.log("hello");
$(function() {
  $("body").on("change", "#mainbutton", function() {
    theChosenOne = $("#mainbutton").val();
    counter=0;
    $.ajax({
      method: "GET",
      url: website + theChosenOne + apikey,
      dataType: "json"
    }).done(function(data) {
        console.log(data.results);
        console.log(counter);
      searchData = website + theChosenOne + apikey;
      console.log(data);
    });
  });
});

$(function(data) {
  do {
    document.append("showtime" + results[counter].title).innerHTML;
    document.append("showtime" + results[counter].multimedia[0].url).innerHTML;
    document.append("showtime" + results[counter].url).innerHTML;
    counter++
    console.log(counter);
  }
  while (counter <= 13);
})