$(document).ready(function() {

//cowntdown function. Set the date by modifying the date in next line (January 01, 2013 00:00:00):
		var austDay = new Date("November 11, 2019 00:00:00");
			$('#countdown').countdown({until: austDay, layout: '<div class="item"><p>{dn}</p> <span>-{dl}-</span></div> <div class="item"><p>{hn}</p> <span>-{hl}-</span></div> <div class="item"><p>{mn}</p> <span>-{ml}-</span></div> <div class="item"><p>{sn}</p> <span>-{sl}-</span></div>'});
			$('#year').text(austDay.getFullYear());

//function for the social hover effect - tooltips		
	$('.tooltip').tipsy
	({
		fade: true,
		gravity: 's'
	});

//function for the contact-form dropdown
	function contact() {
		if ($("#cform").is(":hidden"))
		{
			$("#ribbon").css({"background":"url(images/ribbon.png) bottom left no-repeat"});
			$("#home").slideUp("fast");
			$("#cform").slideDown("slow");
		}
		else{
			$("#ribbon").css({"background":"url(images/ribbon.png) top left no-repeat"});
			$("#cform").slideUp("slow");
			$("#home").slideDown("slow");
		}
	}
	
//run contact form when the ribbon is clicked
	$(".contact").click(function(){contact()});	
});	