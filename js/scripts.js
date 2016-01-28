$(document).ready(function() {
	faq.forEach(function(entry, index) {
		generateEntry(entry, index);
	});

	$(".toc-entry").click(function() {
		var index = this.id.match(/toc-entry-(.*)/)[1];
		$('html, body').animate({
			scrollTop: $("#entry-" + index).offset().top - 20
		}, 500);

		$(".toc-entry.selected").removeClass("selected");
		$(this).addClass("selected");
	});

	// $(".question").click(function() {
	// 	$answerContainer = $($(this).parent().parent().find(".answer-container")[0]);
	// 	$answerContainer.slideToggle("fast");
	// });
});

var generateEntry = function(entry, index) {
	$(".faq").append("<div class='entry clearfix' id='entry-" + index + "'>\
		<div class='question-container'>\
			<div class='question'>." + entry.question + "</div>\
		</div>\
		<div class='answer-container'>\
			<div class='answer'>" + entry.answer + "</div>\
		</div>\
	</div>");

	$(".table-of-contents").append("<div class='toc-entry' id='toc-entry-" + index + "'>" + entry.question + "</div>");
}