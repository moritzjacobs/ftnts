($ => {
	"use strict";

	$(document).ready(() => {
		const ftnts_markers = $("[data-ftnts-for]");
		const ftnts_footnotes = $("[data-ftnts-id]")

		ftnts_markers.click(function(e) {
			e.preventDefault();

			const ftnts_marker = $(this);
			const id = ftnts_marker.attr("data-ftnts-for");

			const target = ftnts_footnotes.filter(`[data-ftnts-id="${id}"]`);
			
			ftnts_markers.removeClass("em");
			ftnts_marker.addClass("em");
			ftnts_footnotes.removeClass("em");
			target.addClass("em");
		});

		ftnts_footnotes.click(function(e) {
			const ftnts_footnote = $(this);
			const id = ftnts_footnote.attr("data-ftnts-id");

			const target = ftnts_markers.filter(`[data-ftnts-for="${id}"]`);
			
			ftnts_footnotes.removeClass("em");
			ftnts_footnote.addClass("em");
			ftnts_markers.removeClass("em");
			target.addClass("em");
		});
	});
})(jQuery);
