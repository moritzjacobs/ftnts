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
      $(document).ready(function () {
        var ftnts_markers = $("[data-ftnts-for]");
        var ftnts_footnotes = $("[data-ftnts-id]");
        var popups = [];
        ftnts_markers.each(function () {
          var ftnts_marker = $(this);
          var content = ftnts_marker.attr("data-ftnts-content");
          var popup = $("<div/>");
          popup.addClass("ftnts-marker-content").text(content).hide();
          popup.appendTo(ftnts_marker);
          popups.push(popup);
          popup.click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            popup.fadeOut();
          });
          $(this).click(function (e) {
            e.preventDefault();
            var ftnts_marker = $(this);
            var id = ftnts_marker.attr("data-ftnts-for");
            var target = ftnts_footnotes.filter("[data-ftnts-id=\"".concat(id, "\"]"));
            ftnts_markers.removeClass("em");
            ftnts_footnotes.removeClass("em");
            $.each(popups, function (_, p) {
              return $(p).fadeOut();
            });
            popup.fadeIn();
          });
        });
        ftnts_footnotes.click(function (e) {
          var ftnts_footnote = $(this);
          var id = ftnts_footnote.attr("data-ftnts-id");
          var target = ftnts_markers.filter("[data-ftnts-for=\"".concat(id, "\"]"));
          ftnts_footnotes.removeClass("em");
          ftnts_markers.removeClass("em");
          target.addClass("em");
          $.each(popups, function (_, p) {
            return $(p).fadeOut();
          });
          $("body, html").animate({
            scrollTop: target.offset().top - 150
          }, 1000, function () {
            target.find(".ftnts-marker-content").fadeIn();
          });
        });
      });
    })(jQuery);
  }, {}]
}, {}, [1]);
//# sourceMappingURL=public.js.map
