var apiKey = "7McGMnAxJYEOAHyGL8kMMtrVYaavuHEP";
var officeCharecters = ["Dwight Schrute" , "Michael Scott" , "Jim Halpert" , "Pam Beesly" , "Andy Bernard"];


function renderButtons() {
    $("#buttons").empty();

    for (var i = 0; i < officeCharecters.length; i++) {
        var buttons = $("<button>");
        buttons.addClass("charecters");
        buttons.attr("data-name", officeCharecters[i]);
        buttons.text(officeCharecters[i]);
        $("#buttons").append(buttons);
    }
}

$("#add-charecter").on("click", function(event){
    event.preventDefault();
    var charecter = $("#office-input").val().trim();
    officeCharecters.push(charecter);
    
renderButtons();

});

renderButtons();

$("button").on("click", function(){
    var person = $(this).attr("data-name");
    var queryURL =  "https://api.giphy.com/v1/gifs/search?q=" +
    person + "&api_key=" + apiKey + "&limit=10";
    console.log(queryURL);
    console.log(this);
    console.log(person);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var results = response.data;
        for (var i = 0; i <  results.length; i++) {
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p>").text("rating: " + rating);
            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height.url);
            personImage.attr('data-still', results[i].images.fixed_height_still.url);
            personImage.attr('data-animate', results[i].images.fixed_height.url);
            personimage.attr('data-state', 'still');
            personImage.addClass('personImage');
            gifDiv.prepend(p);
            gifDiv.prepend(personImage);
            $("#gifs").prepend(gifDiv);
        }

        $('.personImage').on("click", function(){
            var state = $(this).attr('data-state');

                if(state === 'still'){
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');
                }else{
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-state', 'still');
                }
        })
    })
    // had code working.. tried to add the still and animate to my code and everything broke. also when it was working and i added a button my buttons also broke but worked before i added a new one
});

