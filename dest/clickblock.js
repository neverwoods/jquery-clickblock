var ClickBlock = function (varOptions) {
    var strSelector = null,
        opts        = {};

    this.init = function (varOptions) {
        if (typeof varOptions == "string") {
            objDefaults["selector"].push(varOptions);
            opts = objDefaults;
        } else if (typeof varOptions == "object" || typeof varOptions == "array") {
            opts = $.extend(objDefaults, varOptions);
        } else {
            opts = objDefaults;
        }

        return this;
    };

    this.add = function (varSelector) {
        var objReturn = $();

        if (typeof varSelector == "string") {
            opts.selector.push(varSelector)
            objReturn = _bindEvents()
        } else if (varSelector instanceof jQuery) {
            opts.element = varSelector;
            objReturn = _bindEvents()
        } else if (typeof varSelector == "object" || typeof varSelector == "array"){
            if (varSelector.length > 0) {
                opts.selector.push(varSelector.join(", "))
                objReturn = _bindEvents()
            } else {
                throw Error("Empty array supplied in ClickBlock.add.")
            }
        } else {
            // Probably
            throw Error("Selector not defined in ClickBlock.add.")
        }

        return objReturn;
    };

    var _bindEvents = function () {
        var objReturn = $();

        if (opts.selector.length > 0) {
            var strSelector = opts.selector.join(", "),
                $elements   = $(strSelector);
        } else if (opts.element !== null) {
            var $elements = opts.element;
        } else {
            throw Error("No elements selected. Use ClickBlock.add first.")
        }

        if ($elements.length > 0) {
            objReturn = $elements;

            $elements.each(function () {
                var $target = $(this).find("a:first");

                if ($target.length > 0) {
                    $(this)
                        .bind("mouseenter", function (e) {
                            $(this).addClass(opts.hoverClass);
                        })
                        .bind("mouseenter", opts.mouseenter)
                        .bind("mouseleave", function (e) {
                            $(this).removeClass(opts.hoverClass);
                            if ($(this).attr("class") == "") {
                                $(this).removeAttr("class"); // Tidy things up.
                            }
                        })
                        .bind("mouseleave", opts.mouseleave)
                        .bind("click", function (e) {
                            var blnResetExternalLink = false;

                            if (e.ctrlKey || e.metaKey) {
                                var blnExternalLink = (typeof $.fn.externalLink === "function");

                                // CMD or CTRL is pressed -- open in new window
                                var targetRel = $target.prop("rel");
                                if (targetRel !== "external") {
                                    $target.prop("rel", "external");
                                    blnResetExternalLink = true;
                                }

                                if (blnExternalLink) {
                                    $target.externalLink();
                                }
                            }

                            opts.click(e, $target.attr("href"), $target);

                            if (blnResetExternalLink) {
                                // Reset back to original state
                                $target.removeProp("rel");

                                // Unset events bound by externallink plugin
                                if (blnExternalLink) {
                                    $target.off('.externallink');
                                }
                            }
                        })
                        .css("cursor", "pointer");
                }

                //*** Unload this selection, we're done with it.
                opts.selector = [];
            });
        }

        return objReturn;
    };

    var _evtClick = function (e, href, target) {
        var metaKeyPressed = (e.ctrlKey || e.metaKey);

        if (target.attr("rel") == "external" ||
            href == "" ||
            metaKeyPressed
        ) {
            // New window
            target.trigger("click");
        } else {
            // Current window
            window.location.href = href;
        }

        e.preventDefault();
    };

    var objDefaults = {
        hoverClass: "clickblock__hover",
        click: _evtClick,
        selector: [],
        element: null
    };

    return this.init(varOptions);
}
ClickBlock.prototype;

/**
 * jQuery plugin style.
 */
(function($){
    $.fn.extend({
        clickblock: function(options) {
            var cb = new ClickBlock(options);
            if ($(this).length > 0) {
                return cb.add($(this));
            } else {
                return cb;
            }
        }
    });
})(jQuery);
