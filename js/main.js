$(document).ready(function() {
    "use strict";

  // Intro Cover: Parallax 
  if (jQuery(window).width() > 800) {

    var firstMouseMove = true;
    var startPosition;
    var xPosition;
    var leftEdge, rightEdge;

    $('#home').mousemove(function(e){

        // Fixes startPosition so all movement is relative to initial mouse position
        if (firstMouseMove == true) { 
          startPosition = e.pageX;
          firstMouseMove = false;
        };

        // Sets xPosition based on startPosition
        xPosition = (e.pageX - startPosition)/10 + 30;

        // Resets startPosition if a change in direction occurs once an edge has been hit
        if (leftEdge < e.pageX) {
          startPosition = e.pageX + 300;
          leftEdge = 10000;
        } else if (rightEdge > e.pageX) {
          startPosition = e.pageX - 700;
          rightEdge = -10000;
        };

        // Prevents background position from varying beyond 0 to 100
        if (xPosition < 0) {
          xPosition = 0;
          leftEdge = e.pageX;
        } else if (xPosition > 100) {
          xPosition = 100;
          rightEdge = e.pageX;
        };

        // Creates parallax effect based on xPosition
        $('#parallax').css('background-position', xPosition + "%" + " 50%");

    });
  };

  // Portfolio Section: General Configuration
  function equalHeight(group) {
    var tallest = 0;
    group.each(function() {
      var thisHeight = $(this).height();
      if(thisHeight > tallest) {
        tallest = thisHeight;
      }
    });
    group.height(tallest);
  }
  equalHeight($(".portfolio article"));
  
  $(".menu-trigger").click(function() {
    $("#menu").fadeToggle(300);
    $(this).toggleClass("active")
  });

  $(".nav-bar a").click(function() {
    $(".portfolio .nav-bar li").removeClass("current")
    $(this).parent().addClass("current")
    return false;
  });

  // Portfolio Section: FancyBox Plugin  
  $('.portfolio .fancy a').fancybox({
    'openEffect' : 'elastic',
    beforeLoad: function() {
        var el, id = $(this.element).data('title-id');

        if (id) {
            el = $('#' + id);
        
            if (el.length) {
                this.title = el.html();
            }
        }
    },
    helpers : {
        title: {
            type: 'inside'
        }
    }
  });

  // Portfolio Section: Isotope Plugin
  var $container = $('#projects');
  $container.isotope({
  });

  $('#filters li a').click(function(){
    var selector = $(this).attr('data-filter');
    $container.isotope({ filter: selector });
    return false;
  });
  
  // Skills Section: Superscrollorama Plugin
  var controller = $.superscrollorama({
    reverse: false
  });
  controller.addTween('.about .info section article.web', TweenMax.from( $('.about .info section article.web'), .5, {css:{opacity: 0}}));
  controller.addTween('.about .info section article.graphic', TweenMax.from( $('.about .info section article.graphic'), .5, {css:{opacity: 0}}));
  controller.addTween('.about .info section article.marketing', TweenMax.from( $('.about .info section article.marketing'), .5, {css:{opacity: 0}}));
  controller.addTween('.about .info section article.seo', TweenMax.from( $('.about .info section article.seo'), .5, {css:{opacity: 0}}));

  // Contact: Form Mailer
  $('#contact-form').submit(function(){
    var form = $(this);
    $.ajax({
      type: 'POST',
      url: base_url+'/ajax.php',
      dataType: 'json',
      data: {
        'user_name':$('#user_name').val(),
        'user_email':$('#user_email').val(),
        'user_message':$('#user_message').val()
      },
      success: function(data){
        form.find(".error").removeClass('error');
        if(data.error){
          for(var i in data.error){
            $("#"+data.error[i]).prev().addClass('error')
          }
        } else {
          for(var i in data.succ){
            $("#"+i).val(data.succ[i].def)
          }
          $("#contact-form label").removeClass('error');
          $("#contact-form").hide(0);
          $("#contact .msg").show(0);
        }
      }
    })
    return false;
  });
  
  // Sitewide Configurations
  function responsive() {
    $(".win-height").height($(window).height())
    if ($(window).width()<600) {
      $('.skill .progress-line').removeClass("disa");
    }
  }
  
  responsive()
  $(window).resize(function() {
    responsive()
  });
  
  var offset = $(".holder-head").offset();
  $(window).scroll(function() {
    if ($(window).scrollTop() > offset.top ) {
      $(".holder-head").addClass("moved")
    } else {
      $(".holder-head").removeClass("moved")
    };
    if ($(window).scrollTop() > $(".skill .right").offset().top-$(window).height()/1.4 ) {
      $('.skill .progress-line').removeClass("disa");
    };
  }); 

  $('#menu').onePageNav();
  
  $(".scrollto").click(function() {
      $('html, body').animate({
          scrollTop: $($(this).attr('href')).offset().top-70
      }, 600);
      return false;
  });

});
