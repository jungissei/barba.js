// ----------------------------------------------------------------------------
// related barba.js
// ----------------------------------------------------------------------------
/**
 * barba.js init
 */
barba.init({
  transitions: [{
      name: 'default-transition',
      leave: function () {
        leave_page_animation();
      },
      beforeEnter: function (event) {

        replace_head_tags(event.next);//head内のタグの書き換え
      },
      afterEnter: function () {

        enter_page_animation();
      }
  }]
});

/**
 * クリックしたリンクが現在のページと同じ場合はページ読み込みさせない
 * @param {object} event click event
 */
$('a[href]').on('click', function(event){
  if (event.currentTarget.href === window.location.href) {
    event.preventDefault()
    event.stopPropagation()
    false;
  }
});

/**
 * head内のタグの書き換え
 * @param {object} target
 */
function replace_head_tags(target) {

  let $new_page_head = $('<head />').html(
    $.parseHTML(
      target.html.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0],
      document,
      true
  ));

  let head_tags = [
    "meta[name='description']",
    "meta[name='keywords']",
    "link[rel='canonical']",
    "meta[property^='og']",
    "meta[property^='twitter']"
  ].join(',');

  $('head').find(head_tags).remove();
  $new_page_head.find(head_tags).appendTo('head');
}


/**
 * 現在のページを離れる時のアニメーション
 */
function leave_page_animation(){

  $('#page_transition_animation').show();
}

/**
 * 次のページを表示する時のアニメーション
 */
function enter_page_animation(){

  let scroll_target = (location.hash === '')?
    '#wrapper' : location.hash;

  $.smoothScroll({
    scrollTarget: scroll_target,
    speed: 0,
    afterScroll: function() {

      $('#page_transition_animation').fadeOut(300);
    }
  });
}

$('a[href^="#"]').smoothScroll();
