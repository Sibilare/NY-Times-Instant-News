$("button").on("click", function() {
  $.ajax({
    method: "GET",
    url:
      "http://api.openweathermap.org/data/2.5/weather?q=Vancouver,ca&appid=4a48e1e1428fd83889074671fbf259d9"
  }).done(function(data) {

 //   $(".results").append(data.weather);
 
  dataType: 'jsonp';
  
 //  success: function(data) {
      var $title = $('.results').text(data.weather[1]);
  //    var $description = $('<p>').text(data.talks[0].talk_description);
      $('#info')
         .append($title)
         .append($description);
   }
,})
});
