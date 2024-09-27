$(function () {
    ///// Language Switching (2 languages: English and Chinese). /////
  
    // Initially disable language switching button.
    $('#switch-lang').css({'pointer-events':'none',
     'cursor':'default'}).attr('disabled','disabled');
  
    function langButtonListen() {
      $('#switch-lang').click(function (event) {
        event.preventDefault();
        $('[lang="zh"]').toggle();
        $('[lang="en"]').toggle();
        // Switch cookie stored language.
        if ($.cookie('lang') === 'en') {
          $.cookie('lang', 'zh', { expires: 7 });
        } else {
          $.cookie('lang', 'en', { expires: 7 });
        }
      });
      // Enable lang switching button.
      $('#switch-lang').css({'pointer-events':'auto',
       'cursor':'pointer'}).removeAttr('disabled');
    }
  
    // Check if language cookie already exists.
    if ($.cookie('lang')) {
      var lang = $.cookie('lang');
      if (lang === 'en') {
        $('[lang="zh"]').hide();
        langButtonListen();
      } else {
        $('[lang="en"]').hide();
        langButtonListen();
      }
    } else {
      // no cookie set, so detect language based on location.
        $('[lang="en"]').hide();
        $.cookie('lang', 'zh', { expires: 7 });
        langButtonListen();

    }
  });