var photoTh = $('.picture'),
    overlay = $('.overlay');

photoTh.on('click', function() {    
    var dataPhoto = $(this).attr('src'),
        dataTitle = $(this).data('title');
  
    overlay.show();
    
    $('.picture-big').attr("src", dataPhoto);
    $('.photo-title').text(dataTitle);
  }
);

overlay.on('click', function() {
  $(this).hide();
});