(function($) {
    var removePreloader = function() {        
        $(window).on("load", function () {
            $(".loader").fadeOut();
            $("#loading-overlay").delay(500).fadeOut('slow',function(){
                $(this).remove();
            }); 
        });
    };
// Dom Ready
    $(function() {
        removePreloader();      
    });
})(jQuery);