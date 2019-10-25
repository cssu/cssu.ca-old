jQuery(document).ready(function(){

	$('#subscribe').submit(function(){

		var action = $(this).attr('action');

		$("#mesaj").slideUp(750,function() {
		$('#mesaj').hide();

 		$('#ssubmit')
			.after('<img src="images/ajax-loader.gif" class="subscribe-loader" />')
			.attr('disabled','disabled');

		$.post(action, {
			email: $('#semail').val()
		},
			function(data){
				document.getElementById('mesaj').innerHTML = data;
				$('#mesaj').slideDown('slow');
				$('#subscribe img.subscribe-loader').fadeOut('slow',function(){$(this).remove()});
				$('#ssubmit').removeAttr('disabled');
				if(data.match('success') != null) $('#subscribe').slideUp('slow');

			}
		);

		});

		return false;

	});

});