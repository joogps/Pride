function scrollHorizontally(event) {
	event = window.event || event;
	var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
	document.documentElement.scrollLeft+= (delta*80);
	document.body.scrollLeft+= (delta*80);
	event.preventDefault();
}

if (window.addEventListener) {
	window.addEventListener("mousewheel", scrollHorizontally, false);
	window.addEventListener("DOMMouseScroll", scrollHorizontally, false);
} else {
	window.attachEvent("onmousewheel", scrollHorizontally);
}