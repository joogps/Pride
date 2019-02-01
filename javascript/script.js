$(function(){
	$.getJSON("data/letters.json", function(data) {
		for (let l of data.letters) {
			let box = $("<a>").addClass("letter-box");
			let letter = $("<div>").addClass("letter").html(l.letter);
			let contents = $("<div>").addClass("letter-contents");

			box.attr("href", l.wikipedia);

			contents.append($("<div>").html(l.meaning).addClass("title"));
			contents.append($("<div>").html(l.description).addClass("description"));

			box.append(letter);
			box.append(contents);

			box.click(function(event) {
				event.preventDefault();
			});

			box.mouseenter(function() {
				let box = $(this);
				box.find(".letter").animate({"font-size": "65vh", opacity: "0"}, 200, function(){
					$(this).css("display", "none");
					box.find(".letter-contents").css("display", "block");
					box.stop();
					box.find(".letter-contents").transition({scale: "1", opacity: "1"}, 200, function() {
						box.off("click");
					});
				});
			});

			box.mouseleave(function() {
				box.find(".letter-contents").transition({scale: "0.5", opacity: "0"}, 200, function(){
					$(this).css("display", "none");
					box.find(".letter").css("display", "inline-block");
					box.stop();
					box.find(".letter").animate({"font-size": "80vh", opacity: "1"}, 200);
				});
			});

			$("#acronym").append(box);

			box.width(box.width()*1.3);
			box.height(box.height());
		}
	});

	$.getJSON("data/slices.json", function(data) {
		for(let s of data.slices) {
			let slice = $("<div>").addClass("slice").css("background-color", s.color);
			let contents = $("<div>").addClass("slice-contents");
			contents.html(s.html);

			contents.find("a").click(function(event) {
				event.preventDefault();
			});

			slice.delay(Math.random()*800).animate({left: "0px"}, 300+Math.random()*1600, function() {
				slice.mouseenter(function() {
					slice.stop().animate({width: "30vw"}, 300);
					contents.stop().animate({opacity: 1}, 300, function() {
						contents.find("a").off("click");
					});
				});

				slice.mouseleave(function() {
					slice.stop().animate({width: "20vw"}, 300);
					contents.stop().animate({opacity: 0}, 300);
				});
			});

			slice.append(contents);
			$("#flag").append(slice);
		}
	});
});