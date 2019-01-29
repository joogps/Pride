$(function(){
	const colors = ["#E70000", "#FF8C00", "#FFEF00", "#00811F", "#0044FF", "#760089"];
	for(let c of colors) {
		let slice = $("<div>").addClass("slice").css("background-color", c);
		slice.delay(Math.random()*1000).animate({left: "0px"}, 600+Math.random()*1800);
		$("#flag").append(slice);
	}

	const letters = "LGBTT2QQIAAPAGBGP";
	for(let l of letters) {
		let box = $("<div>").addClass("letter-box");
		let letter = $("<div>").addClass("letter").html(l);
		box.append(letter);
		$("#acronym").append(box);
	}

	$.getJSON("descriptions.json", function(data) {
		$(".letter-box").each(function(i) {
			let box = $(this);
			box.mouseenter(function() {
				box.find(".letter").transition({"font-size": "65vh", opacity: "0"}, 200, function(){
					let contents = $("<div>").addClass("contents");

					contents.append($("<div>").html(data.order[i]["meaning"]).addClass("title"));
					contents.append($("<div>").html(data.order[i]["description"]).addClass("description"));

					$(this).css("display", "hidden");
					box.append(contents);

					contents.css({"transform": "perspective(1px) scale(0.5) translateY(-50%)", opacity: "0"});
					contents.transition({"scale": "1", opacity: "1"}, 200);
				});
			});

			box.mouseleave(function() {
				box.find(".contents").transition({"scale": "0.5", opacity: "0"}, 200, function(){
					$(this).css("display", "hidden");
					box.find(".letter").css("display", "inline-block");
					box.find(".letter").transition({"font-size": "80vh", opacity: "1"}, 200);
				});
			});
		});
	});
});