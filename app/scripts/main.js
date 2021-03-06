// Global app object
var app = {};

$(document).ready(function() {
    displayInformer();
    displayColorItems();
    handleCurrentColorClick();
    handleDribbbleIconClick();
});

// Displaying an informer on initial load
var displayInformer = function(){
  if (!localStorage.getItem('informed')) {
    setTimeout(function(){
      $('.current-color').addClass('informer').html('click a color box to see its code');
      $('.dribbble-icon').hide();
      $('.header').addClass('show');
      localStorage.setItem('informed', 1);
      // Hiding the informer
      setTimeout(function(){
        $('.header').removeClass('show');
      }, 3000)
    }, 1100);
  }
};

// Displaying the list of items
var displayColorItems = function(){
    // Parsing the JSON list and appending the items
    $.getJSON('./colors.json', function(data) {

        app.colors = data.colors;

        $.each(app.colors, function(index, color){

            $('.colors').append('<div class="col-xs-4 col-sm-3 col-md-2"><div class="color-item paper" style="background-color: #' + color + ';"></div></div>').hide().fadeIn();
        });

        // Handling item clicks
        handleColorClicks();
    });
};

// Handling color item clicks
var handleColorClicks = function(){
    $('.color-item').on('click', function(event){

        // Hiding the header
        $('.header').removeClass('show');

        // Showing the next color
        if (!$(this).hasClass('active')) {
          // Clearing .active class/state on all similar items
          $('.color-item.active').removeClass('active');

          // Setting .active class/state for this item
          $(this).addClass('active');

          // Getting current color value
          app.currentColor = $(this).css('backgroundColor');

          // Setting the value for the indicator on the header
          updateCurrentColor(app.currentColor);

          // Showing the header
          setTimeout(function(){
              $('.header').addClass('show');
          }, 300);
        } else {
          // Removing class active for this color box
          $(this).removeClass('active');
        }

        return false;
    });
};

// Updating current color indicator
var updateCurrentColor = function(color){
    $('.current-color').removeClass('informer').hide().html(color).css('color', color).fadeIn();
    $('.dribbble-icon').hide().css('background-color', color).fadeIn();
};

// Hendling clicks on the current color incdicator
var handleCurrentColorClick = function(){
    $('.current-color').on('click', function(event){
        // Preventing default action
        event.preventDefault();

        var person = prompt("Selected color code:", $(this).html());

        return false;
    });
};

// Handling clicks on the Dribbble icon
var handleDribbbleIconClick = function(){
    $('.dribbble-icon').on('click', function(event){
        // Preventing default action
        event.preventDefault();

        var win = window.open('http://dribbble.com/colors/' + app.currentColor.substring(1), '_blank');
        win.focus();
    });
};

// Getting HEX value for background-color
$.cssHooks.backgroundColor = {
    get: function(elem) {
        if (elem.currentStyle)
            var bg = elem.currentStyle["backgroundColor"];
        else if (window.getComputedStyle)
            var bg = document.defaultView.getComputedStyle(elem,
                null).getPropertyValue("background-color");
        if (bg.search("rgb") == -1)
            return bg;
        else {
            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
        }
    }
}