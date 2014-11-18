// Global app object
var app = {};

$(document).ready(function() {
    $('.color-item').on('click', function(event){
        // Preventing default action
        event.preventDefault();
        
        // Clearing .active class/state on all similar items
        $('.color-item.active').removeClass('active');
        
        // Setting .active class/state for this item
        $(this).addClass('active');
        
        // Getting current color value
        app.currentColor = $(this).css('backgroundColor');
        
        // Setting the value for the indicator on the header
        $('span.current-color').html(app.currentColor).css('color', app.currentColor);
        
        return false;
    });
});

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