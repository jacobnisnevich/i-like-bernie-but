$(document).ready(function() {
	faq.forEach(function(entry, index) {
		generateEntry(entry, index);
	});

	var followScroll = true;

	$(".toc-entry").click(function() {
		var index = this.id.match(/toc-entry-(.*)/);

		if (index) {
			$('html, body').animate({
				scrollTop: $("#entry-" + index[1]).offset().top - 20
			}, 500);
		} else if (this.id == "top") {
			$('html, body').animate({
				scrollTop: $("html").offset().top
			}, 500);
		}

		$(".toc-entry.selected").removeClass("selected");
		$(this).addClass("selected");
	});

	$(document).scroll(function() {
		if (followScroll) {
			for (var i = 0; i < faq.length; i++) {
				if ($(this).scrollTop() >= $("#entry-" + i).position().top + $("#entry-" + i - 1 + " .question").height() - 70) {
					$(".toc-entry.selected").removeClass("selected");
					$("#toc-entry-" + i).addClass("selected");
				}
			}
		}

		if ($(this).scrollTop() < $(".header").height()) {
			$(".table-of-contents").css("top", $(".header").height() - $(this).scrollTop() + 20 + "px");
		}
		else if ($(".table-of-contents").css("top") !== "20px") {
			$(".table-of-contents").css("top", "20px");
		}

		if ($(this).scrollTop() > $(".footer").position().top - $(window).height() + 110) {
			$(".share-controls").css({
					bottom: $(window).height() + $(this).scrollTop() - $(".footer").position().top - 90 + "px",
					right: $(window).width()/2 - $(".share-controls").width()/2 + "px",
					zIndex: 1
				});
			$(".table-of-contents").css("left", 10 - $(".table-of-contents").width() + "px");

		}
		else if ($(".share-controls").css("bottom") !== "20px") {
			$(".share-controls").css({
					bottom: "20px",
					right: "20px",
					zIndex: 0
				});
			$(".table-of-contents").css("left", 0);
		}
	})

	$(".created-by").click(function() {
		window.open("https://github.com/jacobnisnevich/i-like-bernie-but", "_blank");
	});

	$(".convinced-button").click(function() {
		window.open("http://berniesanders.com", "_blank");
	});
});

var generateEntry = function(entry, index) {
	$(".faq").append("<div class='entry clearfix' id='entry-" + index + "'>\
		<div class='question-container'>\
			<div class='question'>" + entry.question + "</div>\
		</div>\
		<div class='answer-container'>\
			<div class='answer'>" + entry.answer + "</div>\
		</div>\
	</div>");

	if (entry.question.indexOf("learn more") < 0) {
		$(".table-of-contents .questions").append("<div class='toc-entry' id='toc-entry-" + index + "'>" + entry.question + "</div>");
	}
}
