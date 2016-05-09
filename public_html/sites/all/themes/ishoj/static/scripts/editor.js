

(function($) {
	
	$(document).ready(function() {
		
		$(".editor li a:contains('(+)')").parent().addClass("plus");	
		$(".editor li a:contains('(Søg)')").parent().addClass("search");	
		$(".editor li a:contains('(Forside)')").parent().addClass("frontpage");
		$(".editor li a:contains('(Bruger)')").parent().addClass("user");
		$(".editor li a:contains('(Ret)')").parent().addClass("edit");
		$(".editor li a:contains('Edit')").parent().addClass("edit"); // Edit fix
		$(".editor li a:contains('(Log ud)')").parent().addClass("logout");	
		$(".editor li a:contains('(Ny bruger)')").parent().addClass("adduser");	

		$(".editor li a").each(function() {
			var s = $(this).text().replace('(+) ', '');
			s = s.replace('(Søg) ', '');
			s = s.replace('(Forside) ', '');
			s = s.replace('(Bruger) ', '');
			s = s.replace('(Ret) ', '');
			s = s.replace('Edit', 'Ret min profil');
			s = s.replace('(Log ud) ', '');
			s = s.replace('(Ny bruger) ', '');
			$(this).text(s);				
		});

		$(".editor li").each(function() {
			$(this).removeClass("leaf").removeClass("expanded").removeClass("active");
		});
		$(".editor .menu").each(function() {
			$(this).addClass("shadowBottomNavi").addClass("roundBottom");
		});
/*		$(".editor > div > div > div > div > div > ul").addClass("menu");*/
		$(".editor > div > div > div > div > div > ul").removeClass("shadowBottomNavi").removeClass("roundBottom");


/*
.redaktorLinksBruger, .redaktorLinksAlle { }
.redaktorside_mitindhold
.redaktorside_senestindhold*/


		$(".redaktorLinksBruger").click(function(){
			$(this).removeClass("notactive");
			$(".redaktorLinksAlle").addClass("notactive");
			$(".redaktorside_mitindhold").removeClass("hideMe");
			$(".redaktorside_senestindhold").addClass("hideMe");
		});

		$(".redaktorLinksAlle").click(function(){
			$(this).removeClass("notactive");
			$(".redaktorLinksBruger").addClass("notactive");
			$(".redaktorside_senestindhold").removeClass("hideMe");
			$(".redaktorside_mitindhold").addClass("hideMe");
		});


		// #views-exposed-form-redaktorside-indhold-rettet-af-bruger-panel-pane-1
		

		// #views-exposed-form-redaktorside-senest-rettet-indhold-default



	});

})(jQuery);



