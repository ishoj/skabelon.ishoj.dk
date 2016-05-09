(function ($) {
    Drupal.behaviors.ishoj_elasticsearch = {
	attach: function(context, settings) {
	    $('.datepicker').datepicker({
		dateFormat: Drupal.settings.ishoj_elasticsearch.dateFormat,//"dd-mm-yy",
		defaultDate: null
	    });

	    $('.row_kle').each(function(index) {
		var kle_row = this;
		var tid = $(this).children('.tid_id').val();
		var lockedFields = $(this).children('.locked');
		var editLink = $(this).children('.edit-link');
		var submitLink = $(this).children('.submit-link');
		var submitted = $(this).children('.submitted');

		$(editLink).click(function(e){
		    e.preventDefault();
		    $(editLink).fadeOut(function(){
			$(lockedFields).prop('disabled', false);
			$(submitLink).fadeIn();
		    });
		});

		$(submitLink).click(function(e){
		    e.preventDefault();
		    
		    var weight = $(kle_row).children('.weight').val();
		    var from = $(kle_row).children('.from').val();
		    var until = $(kle_row).children('.until').val();

		    if (!from)
			from = 0;
		    if (!until)
			until = 0;

		    //validation
		    var errors = [];
		    if (Math.floor(weight) != weight || !$.isNumeric(weight))
			errors[errors.length] = "Weight is not integer: " +weight;

		    if (errors.length != 0) {
			alert(errors.join("\n"));
			return;
		    }

		    $(submitLink).fadeOut(function(){
			$(lockedFields).prop('disabled', true);
			$.ajax({
			    url: "/kle/" + tid + "/update/" + weight + "/" + from + "/" + until,
			}).done(function() {
			    $(submitted).fadeIn(function(){
				$(submitted).fadeOut(function(){
				    $(editLink).fadeIn();
				});
			    });
			});
		    });
		});
	    });
	    $('.row_phrase').each(function(index) {
		var id = $(this).data('id');
		var phrase_row = this;
		var editLink = $(this).find('.edit-link');
		var submitLink = $(this).find('.submit-link');
		var submitted = $(this).find('.submitted');
		var displayFields = $(this).find('.display-field');
		var displayInput = $(this).find('.display-input');
		var editFields = $(this).find('.edit-field');

		$(editLink).click(function(e){
		    e.preventDefault();
		    $(displayFields).fadeOut(function(){
			$(editFields).fadeIn();
			$(displayInput).prop('disabled', false);
		    });
		    $(editLink).fadeOut(function(){
			$(submitLink).fadeIn();
		    });
		});

		$(submitLink).click(function(e){
		    e.preventDefault();

		    var phraseVal = $(phrase_row).find('.phrase').val();
		    $(phrase_row).find('.display-phrase').html(phraseVal);
		    var exclusiveVal = $(phrase_row).find('.exclusive').is(':checked');
		    var nidVal = $(phrase_row).find('.nid').val();
		    $(phrase_row).find('.display-nid').html(nidVal);
		    var fromVal = $(phrase_row).find('.from').val();
		    $(phrase_row).find('.display-from').html(fromVal);
		    var untilVal = $(phrase_row).find('.until').val();
		    $(phrase_row).find('.display-until').html(untilVal);
		    var weightVal = $(phrase_row).find('.weight').val();
		    $(phrase_row).find('.display-weight').html(weightVal);

		    $(editFields).fadeOut(function(){
			$(displayFields).fadeIn();
			$(displayInput).prop('disabled', true);
		    });

		    $(submitLink).fadeOut(function(){
			$.ajax({
			    url: "/phrase/" + id + "/update",
			    data: { phrase: phraseVal, exclusive: exclusiveVal, nid: nidVal, from: fromVal, until: untilVal, weight: weightVal }
			}).done(function() {
			    $(submitted).fadeIn(function(){
				$(submitted).fadeOut(function(){
				    $(editLink).fadeIn();
				});
			    });
			});
		    });
		    
		});

	    });
	}
    }
})(jQuery);