"use strict";

window.onload = function () {
	alert("ol");
	window.document.addEventListener('ftntsAdded', function (e) {
		console.log(e);
	}, false);
};