$(document).ready(function() {
  $('a.menu').click(function() {
    $('.site-header nav').slideToggle(100);
    return false;
  });

  $(window).resize(function(){
    var w = $(window).width();
    var menu = $('.site-header nav');
    if(w > 680 && menu.is(':hidden')) {
      menu.removeAttr('style');
    }
  });


  $('article.post iframe').wrap('<div class="video-container" />');

});

$(document).ready(function() {
    var vpH = $(window).height();
    var vH = vpH - 350;
    $('.overlay').css("height", vH);
    $('.featured-image').css("height", vH);
});


$(function(){
  $('<img>').attr('src',function(){
      var imgUrl = $('div.featured-image').css('background-image');
      if (!imgUrl) {
        return;
      }
      imgUrl = imgUrl.substring(4, imgUrl.length-1);
      return imgUrl;
  }).load(function(){
    $('img.loading').fadeOut(500);
    $('div.overlay').fadeTo("slow", 0.6);
  });
});

$(function(){
    $('.post-list li').each(function(i){
        var t = $(this);
        setTimeout(function(){ t.addClass('slider'); }, (i+1) * 330);
    });
});


// Navigation


        var previousScroll = 0, // previous scroll position
        menuOffset = 54, // height of menu (once scroll passed it, menu is hidden)
        detachPoint = 650, // point of detach (after scroll passed it, menu is fixed)
        hideShowOffset = 6; // scrolling value after which triggers hide/show menu

        // on scroll hide/show menu
        $(window).scroll(function() {
            if ($('nav').hasClass('expanded')) {
            // do nothing; main navigation is being shown
            } else {
            var currentScroll = $(this).scrollTop(), // gets current scroll position
            scrollDifference = Math.abs(currentScroll - previousScroll); // calculates how fast user is scrolling

            // if scrolled past menu
            if (currentScroll > menuOffset) {
            // if scrolled past detach point add class to fix menu
            if (currentScroll > detachPoint) {
            $('nav').addClass('detached');
            }

        // if scrolling faster than hideShowOffset hide/show menu
        if (scrollDifference >= hideShowOffset) {
            if (currentScroll > previousScroll) {
            // scrolling down; hide menu
            $('nav').addClass('invisible');
            } else {
            // scrolling up; show menu
            $('nav').removeClass('invisible');
            }
        }
        } else {
            // only remove “detached” class if user is at the top of document (menu jump fix)
            if (currentScroll <= 0){
            $('nav').removeClass();
            }
        }

        // if user is at the bottom of document show menu
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            $('nav').removeClass('invisible');
            }

        // replace previous scroll position with new one
        previousScroll = currentScroll;
        }
        })

        // shows/hides navigation’s popover if class "expanded"
        $('nav').on('click touchstart', function(event) {
            showHideNav();
            event.preventDefault();
            })

        // clicking anywhere inside navigation or heading won’t close navigation’s popover
        $('#navigation').on('click touchstart', function(event){
            event.stopPropagation();
            })

        // checks if navigation’s popover is shown
        function showHideNav() {
            if ($('nav').hasClass('expanded')) {
            hideNav();
            } else {
            showNav();
            }
        }

        // shows the navigation’s popover
        function showNav() {
            $('nav').removeClass('invisible').addClass('expanded');
            $('#container').addClass('blurred');
            window.setTimeout(function(){$('body').addClass('no_scroll');}, 200); // Firefox hack. Hides scrollbar as soon as menu animation is done
        $('#navigation a').attr('tabindex', ''); // links inside navigation should be TAB selectable
        }

        // hides the navigation’s popover
        function hideNav() {
            $('#container').removeClass('blurred');
            window.setTimeout(function(){$('body').removeClass();}, 10); // allow animations to start before removing class (Firefox)
        $('nav').removeClass('expanded');
        $('#navigation a').attr('tabindex', '-1'); // links inside hidden navigation should not be TAB selectable
        $('.icon').blur(); // deselect icon when navigation is hidden
        }

        // keyboard shortcuts
        $('body').keydown(function(e) {
            // menu accessible via TAB as well
            if ($("nav .icon").is(":focus")) {
            // if ENTER/SPACE show/hide menu
            if (e.keyCode === 13 || e.keyCode === 32) {
            showHideNav();
            e.preventDefault();
            }
        }

        // if ESC show/hide menu
        if (e.keyCode === 27 || e.keyCode === 77) {
            showHideNav();
            }
        })


// Lazy load disqus


var comments = document.getElementsByClassName('comments')[0],
    disqusLoaded=false;

function loadDisqus() {
    var disqus_shortname = 'your_disqus_shortname';
    var dsq = document.createElement('script');
    dsq.type = 'text/javascript';
    dsq.async = true;
    dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    disqusLoaded = true;
}
//Get the offset of an object
function findTop(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return curtop;
    }
}

if(window.location.hash.indexOf('#comments') > 0)
    loadDisqus();

if(comments) {
    var commentsOffset = findTop(comments);

    window.onscroll = function() {
        if(!disqusLoaded && window.pageYOffset > commentsOffset - 1500) {
            console.log('load comments, NOW!!');
            loadDisqus();
        }
    }
}



// Contact Form


