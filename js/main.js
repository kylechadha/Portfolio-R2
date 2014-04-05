$(document).ready(function() {
    "use strict";
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

  $('.bxslider').bxSlider({
    auto: true,
    pause: 5000
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

  // Skills Section: Superscrollorama Plugin
  var controller = $.superscrollorama({
    reverse: false
  });
  controller.addTween('.about .info section article.web', TweenMax.from( $('.about .info section article.web'), .5, {css:{opacity: 0}}));
  controller.addTween('.about .info section article.graphic', TweenMax.from( $('.about .info section article.graphic'), .5, {css:{opacity: 0}}));
  controller.addTween('.about .info section article.marketing', TweenMax.from( $('.about .info section article.marketing'), .5, {css:{opacity: 0}}));
  controller.addTween('.about .info section article.seo', TweenMax.from( $('.about .info section article.seo'), .5, {css:{opacity: 0}}));


  // Portfolio Section: General Setup
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
    // $(".portfolio article:not(.nav-bar)").hide();
    // $(".portfolio section").find($(this).attr("href")).show();
    return false;
  });
  
  $('.portfolio .fancy a').fancybox();


  // Portfolio Section: Isotope Plugin
  var $container = $('#projects');
  $container.isotope({
    // options
    // itemSelector: '.item',
    // layoutMode: 'fitRows'
  });

  $('#filters li a').click(function(){
    var selector = $(this).attr('data-filter');
    $container.isotope({ filter: selector });
    return false;
  });


  // Banner: Parallax 
  if (jQuery(window).width() > 800) {
    var counter = 0;
    var startPosition;
    $('#parallax').mousemove(function(e){
        if (counter == 0) { startPosition = e.pageX };
        $(this).css('background-position', (e.pageX - startPosition)/10 + 50 + "%" + " 50%");
        console.log(startPosition);
        counter += 1;
    });
  };
});
