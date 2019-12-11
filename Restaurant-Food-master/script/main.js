
menu_collapse_width = 1000;
nav_height = 70;
max_nav_height = 70;

$(document).ready(function () {
    switch_menus_if_small_window();

    $('#hamburger-button, nav a').click(function () {
        $('#nav-links').toggle('swing');
    });

    $(window).resize(function () {
        switch_menus_if_small_window();
    });

    $(window).scroll(function () {
        if($(window).scrollTop() > max_nav_height) {
            $('button#to-top').show();
            $('#social-links').hide(function () {
                });
        }
        else {
            $('button#to-top').hide();
            $('#social-links').show();
        }
    });

    $('button#to-top').click(function () {
        $(window).scrollTop(0);
    });

});

function initialize_recipe_slideshow() {
    recipe_data = $.ajax({
        url:'./script/recipe-list.json',
        dataType: 'json',
        mimeType: 'application/json',
        success: function(result) {
            var recipes = [];
            $.each(result, function(i, recipe) {
                var img_url = './images/' + recipe["image"];
                var page_url = './recipes/' + recipe["filename"];
                var $img_div = build_recipe_image_div(recipe["title"], img_url, page_url);
                $('#center-container').append($img_div);
                console.log($img_div);
            });
            $('#center-container').slick({
                prevArrow: $('#slick-prevArrow'),
                nextArrow: $('#slick-nextArrow')
            });
        }
    });

}

function build_recipe_image_div(title, image_url, page_url) {
    // TODO: Make the recipe loading prettier and not immediate.
    return $('<div></div>')
        .html('<h3>' + title + '</h3>')
        .css({'background-image': 'url("' + image_url + '")'})
        .click(function() {
            $('#recipe-container').load(page_url);
        });
}

function switch_menus_if_small_window() {
    if($(window).width() <= menu_collapse_width) {
        // Switch to hamburger mode
        $('#nav-links').fadeOut('swing', function () {
            $('#hamburger-button').fadeIn('swing');
            $('#nav-links').addClass('collapsed-nav-links');
            $('nav h3').addClass('wide-title');
        });
        $('nav').mouseleave(function () {
            $('#nav-links').fadeOut('swing');
        });
    }
    else {
        // Switch to normal menu mode
        $('nav').unbind('mouseleave');
        $('#hamburger-button').fadeOut('swing', function () {
            $('#nav-links').removeClass('collapsed-nav-links');
            $('nav h3').removeClass('wide-title');
            $('#nav-links').fadeIn('swing');
        });

    }
}
