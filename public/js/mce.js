"use strict";

(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }

        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function (r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }

      return n[i].exports;
    }

    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
      o(t[i]);
    }

    return o;
  }

  return r;
})()({
  1: [function (require, module, exports) {
    (function ($) {
      tinymce.create("tinymce.plugins.ftnts", {
        init: function init(editor) {
          var t = this; //add new button    

          editor.addButton("ftnts", {
            title: ftnts.label,
            cmd: "ftnts_command",
            image: "".concat(ftnts.pluginRoot, "/public/img/ftnts.svg")
          }); //replace shortcode before editor content set

          editor.on('BeforeSetcontent', function (o) {
            o.content = t._shortcode2html(o.content);
          }); //replace shortcode as its inserted into editor (which uses the exec command)

          editor.on('ExecCommand', function (cmd) {
            if (cmd === 'mceInsertContent') {
              tinyMCE.activeEditor.setContent(t._shortcode2html(tinyMCE.activeEditor.getContent()));
            }
          });
          editor.on('click', function (e) {
            if (e.target.classList.contains("ftnts-wrapper")) {
              var previous = $(e.target).attr("content");
              prompt_content(function (content) {
                $(e.target).attr("content", content);
              }, previous);
            }
          }); //replace the image back to shortcode on save

          editor.on('PostProcess', function (o) {
            if (o.get) o.content = t._html2shortcode(o.content);
          });

          function prompt_content(callback) {
            var default_value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
            editor.windowManager.open({
              title: 'ftnts',
              width: 600,
              height: 400,
              body: {
                type: 'textbox',
                rows: 15,
                name: 'ftnt_content',
                multiline: true,
                label: '',
                value: default_value
              },
              onsubmit: function onsubmit(e) {
                callback(e.data.ftnt_content);
              }
            });
          } //button functionality.


          editor.addCommand("ftnts_command", function () {
            var selected_text = editor.selection.getContent();
            var uuid = Math.floor(Math.random() * 100000000);
            prompt_content(function (content) {
              var return_text = "".concat(selected_text, "[ftnts id=\"").concat(uuid, "\" content=\"").concat(content, "\"][/ftnts]");
              var event_data = {
                uuid: uuid,
                content: content,
                wrapped: selected_text
              };
              editor.execCommand("mceInsertContent", 0, return_text);
            });
          });
        },
        _shortcode2html: function _shortcode2html(content) {
          var re = /\[ftnts([^\]]*)\]([^\]]*)\[\/ftnts\]/g;
          return content.replace(re, function (match, params, wrapped) {
            var ret = "<ftnt class='ftnts-wrapper'".concat(params, ">").concat(wrapped, "</ftnt>");
            return ret;
          });
        },
        _html2shortcode: function _html2shortcode(content) {
          var re = /<ftnt([^>]*)>[^>]*<\/ftnt>/g;
          return content.replace(re, function (match, params) {
            var $el = $(match);

            if ($el.hasClass("ftnts-wrapper")) {
              var id = $el.attr("id");

              var _content = $el.attr("content");

              var ret = "[ftnts id='".concat(id, "' content='").concat(_content, "'][/ftnts]");
              return ret;
            } else {
              return match;
            }
          });
        },
        getInfo: function getInfo() {
          return {
            longname: 'ftnts – Easy footnotes for Wordpress',
            author: 'Moritz Jacobs',
            authorurl: 'http://github.com/moritzjacobs/',
            infourl: 'http://github.com/moritzjacobs/ftnts',
            version: "1.0"
          };
        }
      });
      tinymce.PluginManager.add("ftnts", tinymce.plugins.ftnts);
    })(jQuery);
  }, {}]
}, {}, [1]);
//# sourceMappingURL=mce.js.map
