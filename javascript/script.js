$(function(){
	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
		$("#bubble1").html("Touch a letter to see its meaning. Do it again to learn more about it.");
		$("#bubble2").html("Touch the rainbow slices to view details about the webpage.");
	}
	else{
		$("#bubble1").html("Hover your mouse cursor onto a letter to see its meaning. Click to learn more about it.");
		$("#bubble2").html("Hover your mouse cursor onto the rainbow slices to view details about the webpage.");
	}

	createLetters();
	$("#acronym").animate({opacity: "1"}, function(){
		$("#bubble1").css("display", "block");
		$("#bubble1").animate({opacity: "1"}, function() {
			$(window).click(function() {
				$(window).off("click");
				$("#bubble1").animate({opacity: "0"},function(){
					$("#bubble1").css("display", "none");
					$("#acronym").animate({opacity: "0"}, function() {
						createSlices(function(){
							$("#acronym").css("display", "none");
							$("#bubble2").css("display", "block");
							$("#bubble2").animate({opacity: "1"}, function() {
								$(window).click(function() {
									$(window).off("click");
									$("#bubble2").animate({opacity: "0"}, function(){
										listenToSlices();
										$("#bubble2").css("display", "none");
										$("#acronym").css("display", "flex");
										$("#acronym").animate({opacity: "1"}, function() {
											listenToLetters();
										});
									});
								});
							});
						});
					});
				});
			});
		});
	});

	function createLetters() {
		$.getJSON("data/letters.json", function(data) {
			for (let l of data.letters) {
				let box = $("<a>").addClass("letter-box");
				let letter = $("<div>").addClass("letter").html(l.letter);
				let contents = $("<div>").addClass("letter-contents");

				box.attr("href", l.wikipedia);
				box.click(function(event) {
					event.preventDefault();
				});
				box.css("cursor", "default");

				contents.append($("<div>").html(l.meaning).addClass("letter-contents-title"));
				contents.append($("<div>").html(l.description).addClass("letter-contents-description"));
				box.append(contents);
				box.append(letter);

				$("#acronym").append(box);

				box.width(box.width()*1.3);
				box.height(box.height());
			}

			$(window).resize(function() {
				$(".letter-box").width("auto");
				$(".letter-box").height("auto");
				$(".letter-box").width($(".letter-box").width()*1.3);
				$(".letter-box").height($(".letter-box").height());
			});
		});
	}

	function listenToLetters() {
		$(".letter-box").mouseenter(function() {
			let box = $(this);
			box.find(".letter").stop().animate({"font-size": "65vh", opacity: "0"}, 200, function(){
				$(this).css("display", "none");
				box.find(".letter-contents").css("display", "block");
				box.find(".letter-contents").stop().transition({scale: "1", opacity: "1"}, 200, function() {
					box.off("click");
				});
			});
		});

		$(".letter-box").mouseleave(function() {
			let box = $(this);
			box.find(".letter-contents").stop().transition({scale: "0.5", opacity: "0"}, 200, function(){
				$(this).css("display", "none");
				box.find(".letter").css("display", "inline-block");
				box.find(".letter").stop().animate({"font-size": "75vh", opacity: "1"}, 200, function() {
					box.click(function(event) {
						event.preventDefault();
					});
				});
			});
		});

		$(".letter-box").css("cursor", "pointer");
	}

	function createSlices(callback) {
		$.getJSON("data/slices.json", function(data) {
			for(let s of data.slices) {
				let slice = $("<div>").addClass("slice").css("background-color", s.color);
				let contents = $("<div>").addClass("slice-contents");
				let text = $("<div>").addClass("slice-text").html(s.html);

				contents.append(text);

				text.css("cursor", "default");
				text.find("a").css("cursor", "default");
				text.find("a").click(function(event) {
					event.preventDefault();
				});

				slice.delay(Math.random()*800).animate({left: "0px"}, 300+Math.random()*1600, callback);

				slice.append(contents);
				$("#flag").append(slice);
			}
		});
	}

	function listenToSlices() {
		$(".slice").mouseenter(function() {
			let slice = $(this);
			let contents = slice.find(".slice-contents");
			slice.stop().animate({width: "30vw"}, 300);
			contents.stop().animate({opacity: 1}, 300, function() {
				contents.css("cursor", "text");
				contents.find("a").css("cursor", "pointer");
				contents.find("a").off("click");
			});
		});

		$(".slice").mouseleave(function() {
			let slice = $(this);
			let contents = slice.find(".slice-contents");
			slice.stop().animate({width: "22vw"}, 300);
			contents.stop().animate({opacity: 0}, 300, function() {
				contents.css("cursor", "default");
				contents.find("a").css("cursor", "default");
				contents.find("a").click(function(event) {
					event.preventDefault();
				});
			});
		});
	}
});