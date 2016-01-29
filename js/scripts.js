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
				if ($(this).scrollTop() >= $("#entry-" + i).position().top + $("#entry-" + i + " .question").height()) {
					$(".toc-entry.selected").removeClass("selected");
					$("#toc-entry-" + i).addClass("selected");
				}
			}
		}
	})
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
