//Sliding Effect Control
head.js("/static/js/skin-select/jquery.cookie.js");
head.js("/static/js/skin-select/skin-select.js");

//Showing Date
head.js("/static/js/clock/date.js");

//Bootstrap
//head.js("/static/js/bootstrap.js");

//NEWS STICKER
head.js("/static/js/newsticker/jquery.newsTicker.js", function() {

    var nt_title = $('#nt-title').newsTicker({
        row_height: 18,
        max_rows: 1,
        duration: 5000,
        pauseOnHover: 0
    });


});

//------------------------------------------------------------- 


////Acordion and Sliding menu

head.js("/static/js/custom/scriptbreaker-multiple-accordion-1.js", function() {

    $(".topnav").accordionze({
        accordionze: true,
        speed: 500,
        closedSign: '<img src="/static/img/plus.png">',
        openedSign: '<img src="/static/img/minus.png">'
    });

});

////Right Sliding menu

head.js("/static/js/slidebars/slidebars.min.js", "http://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js", function() {

    $(document).ready(function() {
        var mySlidebars = new $.slidebars();

        $('.toggle-left').on('click', function() {
            mySlidebars.toggle('right');
        });
    });
});

//-------------------------------------------------------------

//SEARCH MENU
head.js("/static/js/search/jquery.quicksearch.js", function() {

    $('input.id_search').quicksearch('#menu-showhide li, .menu-left-nest li');
   
   

});
//-------------------------------------------------------------


//TOOL TIP

head.js("/static/js/tip/jquery.tooltipster.js", function() {

    $('.tooltip-tip-x').tooltipster({
        position: 'right'

    });

    $('.tooltip-tip').tooltipster({
        position: 'right',
        animation: 'slide',
        theme: '.tooltipster-shadow',
        delay: 1,
        offsetX: '-12px',
        onlyOne: true

    });
    $('.tooltip-tip2').tooltipster({
        position: 'right',
        animation: 'slide',
        offsetX: '-12px',
        theme: '.tooltipster-shadow',
        onlyOne: true

    });
    $('.tooltip-top').tooltipster({
        position: 'top'
    });
    $('.tooltip-right').tooltipster({
        position: 'right'
    });
    $('.tooltip-left').tooltipster({
        position: 'left'
    });
    $('.tooltip-bottom').tooltipster({
        position: 'bottom'
    });
    $('.tooltip-reload').tooltipster({
        position: 'right',
        theme: '.tooltipster-white',
        animation: 'fade'
    });
    $('.tooltip-fullscreen').tooltipster({
        position: 'left',
        theme: '.tooltipster-white',
        animation: 'fade'
    });
    //For icon tooltip



});
//------------------------------------------------------------- 

//NICE SCROLL

head.js("/static/js/nano/jquery.nanoscroller.js", function() {

    $(".nano").nanoScroller({
        //stop: true 
        scroll: 'top',
        scrollTop: 0,
        sliderMinHeight: 40,
        preventPageScrolling: true
        //alwaysVisible: false

    });

});
//------------------------------------------------------------- 






//------------------------------------------------------------- 
//PAGE LOADER
head.js("/static/js/pace/pace.js", function() {

    paceOptions = {
        ajax: false, // disabled
        document: false, // disabled
        eventLag: false, // disabled
        elements: {
            selectors: ['.my-page']
        }
    };

});

//------
//------------------------------------------------------------- 

//DIGITAL CLOCK
head.js("/static/js/clock/jquery.clock.js", function() {

    //clock
    $('#digital-clock').clock({
        offset: '+5',
        type: 'digital'
    });


});


