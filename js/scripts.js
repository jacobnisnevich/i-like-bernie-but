function displayAnyMessagesForState(state) {
	if (messages[state]) {
		// any messages with deadlines within 2 days from now?
		messages[state].forEach(function (message) {
			if (Date.now() < message.deadline.getTime() && Date.now() > message.startTime.getTime()) {
				$("#message-state").text(state);
				$("#message-custom-text").html(message.text);

				$("#message-custom-text a").click(function() {
					trackOutboundLink($(this).attr("href"));
					return true;
				});

				$("#message").show();
				$("#gray-screen").show();
				
				ga('send', 'event', 'Message', 'show', state);
			}
		});
	}
}

$(document).ready(function() {
	faq.forEach(function(entry, index) {
		generateEntry(entry, index);
	});

	var followScroll = true;
	var ipInfoApiKey = "9e5d5cef52a748a4342915d7f9e6517c60e2eca0baf5f111ff9eaef78ae358fe";

	$.getJSON("https://api.ipify.org?format=json", function(data) {
		var ipLookup = "http://api.ipinfodb.com/v3/ip-city/?key=" + ipInfoApiKey + "&ip=" + data.ip + "&format=json"
		$.getJSON(ipLookup, function(data) {
			displayAnyMessagesForState(data.regionName);
		});
	});

	$("#close-message").click(function() {
		$("#message").fadeOut(200);
		$("#gray-screen").fadeOut(200);
	});

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

		if (index) {
			window.location.hash = $(this).data("question") + "?";
		} else {
			window.location.hash = "";
		}
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
				})
				.addClass('display-inline');
			$(".table-of-contents").css("left", 10 - $(".table-of-contents").width() + "px");

		}
		else if ($(".share-controls").css("bottom") !== "20px") {
			$(".share-controls").css({
					bottom: "20px",
					right: "20px",
					zIndex: 0
				})
				.removeClass('display-inline');
			$(".table-of-contents").css("left", 0);
		}
	});

	$(".created-by").click(function() {
		window.open("https://github.com/jacobnisnevich/i-like-bernie-but", "_blank");
	});

	$(".convinced-button").click(function() {
		window.open("http://berniesanders.com", "_blank");
	});

	$("a").click(function() {
		trackOutboundLink($(this).attr("href"));
		return true;
	});
});

if (window.location.hash) {
	// Scroll to pre-selected question
	setTimeout(function(){
		var entryClass = window.location.hash.replace(/#/g,'').replace(/\?/g,'');
		$("div[data-question=" + entryClass + "]").click();
	}, 300);
};

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
		$(".table-of-contents .questions").append("<div class='toc-entry' id='toc-entry-" + index + "' data-question='" + entry.id + "'>" + entry.question + "</div>");
	}	
}
