function onResize(element, callback) {
	var height = element.clientHeight;
	var width  = element.clientWidth;

	return setInterval(function() {
		if (element.clientHeight != height || element.clientWidth != width) {
			height = element.clientHeight;
			width  = element.clientWidth;
			callback();
		}
	}, 500);
}
