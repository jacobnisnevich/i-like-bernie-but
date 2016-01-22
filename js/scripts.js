$(document).ready(function() {
	faq.forEach(function(entry) {
		generateEntry(entry);
	});
});

var generateEntry = function(entry) {
	$(".faq").append("<div class='entry clearfix'>\
		<div class='question-container'>\
			<div class='question'>." + entry.question + "</div>\
		</div>\
		<div class='answer-container'>\
			<div class='answer'>" + entry.answer + "</div>\
		</div>\
	</div>");
}