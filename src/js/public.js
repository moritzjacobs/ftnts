($ => {
	$(document).ready(() => {
		const ftnts_markers = $("[data-ftnts-for]");
		const ftnts_footnotes = $("[data-ftnts-id]");
		const popups = [];

		ftnts_markers.each(function() {
			const ftnts_marker = $(this);
			const content = ftnts_marker.attr("data-ftnts-content");

			const popup = $("<div/>");
			popup
				.addClass("ftnts-marker-content")
				.text(content)
				.hide();
			popup.appendTo(ftnts_marker);
			popups.push(popup)

			popup.click(function(e) {
				e.preventDefault();
				e.stopPropagation();
				popup.fadeOut();
			});

			$(this).click(function(e) {
				e.preventDefault();

				const ftnts_marker = $(this);
				const id = ftnts_marker.attr("data-ftnts-for");
				const target = ftnts_footnotes.filter(
					`[data-ftnts-id="${id}"]`
				);
				ftnts_markers.removeClass("em");
				ftnts_footnotes.removeClass("em");
				$.each(popups, (_, p) => $(p).fadeOut())
				popup.fadeIn();
			});
		});

		ftnts_footnotes.click(function(e) {
			const ftnts_footnote = $(this);
			const id = ftnts_footnote.attr("data-ftnts-id");

			const target = ftnts_markers.filter(`[data-ftnts-for="${id}"]`);

			ftnts_footnotes.removeClass("em");
			ftnts_markers.removeClass("em");
			target.addClass("em");

			$.each(popups, (_, p) => $(p).fadeOut())
			$("body, html").animate({
				scrollTop: target.offset().top - 150
			}, 1000, () => {
				target.find(".ftnts-marker-content").fadeIn()
			})
		});
	});
})(jQuery);
