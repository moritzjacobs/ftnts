((($) => {

	$(".ftnts-wrapper").on(function(){
		alert("ok");
	});

	tinymce.create("tinymce.plugins.ftnts", {

		init(editor) {
			const t = this;

			//add new button    
			editor.addButton("ftnts", {
				title : ftnts.label,
				cmd : "ftnts_command",
				image : `${ftnts.pluginRoot}/dist/images/ftnts.svg`
			});

			//replace shortcode before editor content set
			editor.on('BeforeSetcontent', o => {
				o.content = t._shortcode2html(o.content);
			});
			
			//replace shortcode as its inserted into editor (which uses the exec command)
			editor.on('ExecCommand', (cmd) => {
				if (cmd ==='mceInsertContent'){
					tinyMCE.activeEditor.setContent( t._shortcode2html(tinyMCE.activeEditor.getContent()) );
				}
			});
			
			editor.on('click', (e) => {
				if(e.target.classList.contains("ftnts-wrapper")) {
					const previous = $(e.target).attr("content");
					prompt_content((content) => {
						$(e.target).attr("content", content);
					}, previous);

				}
			});


			//replace the image back to shortcode on save
			editor.on('PostProcess', (o) => {
				if (o.get)
					o.content = t._html2shortcode(o.content);
			});

			function prompt_content(callback, default_value="") {
				editor.windowManager.open({
					title: 'ftnts',
					width: 600,
					height: 400,
					body: {
						type: 'textbox',
						name: 'ftnt_content',
						multiline: true,
						label  : '',
						value: default_value,
					},
					onsubmit: (e) => {
						callback(e.data.ftnt_content);
					}
				});

			}

			//button functionality.
			editor.addCommand("ftnts_command", () => {
				const selected_text = editor.selection.getContent();

					const uuid = Math.floor(Math.random()* 100000000);
					prompt_content((content) => {
						const return_text = `${selected_text}[ftnts id="${uuid}" content="${content}"][/ftnts]`;

						const event_data = {
							uuid,
							content,
							wrapped: selected_text
						};
						
						editor.execCommand("mceInsertContent", 0, return_text);
					});
					
			});

		},

		_shortcode2html(content) {
			const re = /\[ftnts([^\]]*)\]([^\]]*)\[\/ftnts\]/g;
			return content.replace(re, (match, params, wrapped) => {
				const ret = `<ftnt class='ftnts-wrapper'${params}>${wrapped}</ftnt>`;
				return ret;
			});
		},

		_html2shortcode(content) {

			const re = /<ftnt([^>]*)>[^>]*<\/ftnt>/g;
			return content.replace(re, (match, params) => {
				const $el = $(match);
				if($el.hasClass("ftnts-wrapper")) {
					const id = $el.attr("id");
					const content = $el.attr("content");
					const ret = `[ftnts id='${id}' content='${content}'][/ftnts]`;
					return ret;
				} else {
					return match;
				}
			});
		},

		getInfo() {
			return {
				longname : 'ftnts – Easy footnotes for Wordpress',
				author : 'Moritz Jacobs',
				authorurl : 'http://github.com/moritzjacobs/',
				infourl : 'http://github.com/moritzjacobs/ftnts',
				version : "1.0"
			};
		}
	});

	tinymce.PluginManager.add("ftnts", tinymce.plugins.ftnts);
}))(jQuery);
