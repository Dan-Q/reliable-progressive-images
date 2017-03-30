"use strict";

$(function(){
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    });
  }

  let io = new IntersectionObserver(intersectionChange);

  function intersectionChange(changes){
    changes.forEach(change => {
      if(change.isIntersecting){
        const img = $(change.target);
        const realUrl = $(change.target).closest('.progressive-image').data('full-image');
        console.log(`progressive-loading ${realUrl}`);
        img.parent().append(`<img src="${realUrl}?${(new Date()).getTime()}" height="${img.attr('height')}" width="${img.attr('width')}" >`);
      }
    })
  }

  //io.observe();

  $('.progressive-image').each(function(){
    const elem = $(this);
    const fullSrc = $(this).data('full-image');
    elem.css({height: elem.data('image-height'), width: elem.data('image-width')});
    console.log(`configuring ${fullSrc} for progressive-load`);
    elem.html(`<img src="${elem.data('lowres-image')}" width="${elem.data('image-width')}" height="${elem.data('image-height')}" data-full-image="${fullSrc}">`);
    io.observe(elem.find('img')[0]);
  });
});
