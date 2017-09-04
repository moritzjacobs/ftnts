"use strict";

(function () {
	tinymce.create("tinymce.plugins.ftnts", {

		init: function init(ed) {

			//add new button   
			ed.addButton("ftnts", {
				title: ftnts.label,
				cmd: "ftnts_command",
				image: ftnts.pluginRoot + "/dist/images/ftnts.svg"
			});

			//button functionality.
			ed.addCommand("ftnts_command", function () {
				var selected_text = ed.selection.getContent();
				if (selected_text.length > 0) {
					var uuid = Math.floor(Math.random() * 100000000);
					var return_text = "<span class='ftnts-wrapper' id=\"ftnts-wrapper-" + uuid + ">" + selected_text + "</span>";

					var ftnts_data = {
						"wrapped": selected_text,
						"uuid": uuid
					};

					if (window.CustomEvent) {
						var event = new CustomEvent('ftntsAdded', ftnts_data);
					} else {
						var event = document.createEvent('CustomEvent');
						event.initCustomEvent('ftntsAdded', true, true, ftnts_data);
					}
					window.parent.document.dispatchEvent(event);

					ed.execCommand("mceInsertContent", 0, return_text);
				}
			});
		}
	});

	tinymce.PluginManager.add("ftnts", tinymce.plugins.ftnts);
})();