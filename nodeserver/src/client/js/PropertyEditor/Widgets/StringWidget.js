"use strict";

define([
    'PropertyEditor/Widgets/WidgetBase',
    'clientUtil'
],
    function (WidgetBase,
              clientUtil) {

        var StringWidget;

        StringWidget = function (propertyDesc) {
            StringWidget.superclass.call(this, propertyDesc);

            var _self = this;

            this.__input = $('<input/>', {
                "type": "text",
                "value": this.propertyValue
            });

            this.__input.on('keyup change', function (e) {
                e.stopPropagation();
                e.preventDefault();

                _self.setValue(_self.__input.val());
            });

            this.__input.on('blur', function (e) {
                _self.fireFinishChange();
            });

            this.__input.on('keydown', function (e) {
                if (e.keyCode === 13) {
                    this.blur();
                }
            });

            this.updateDisplay();

            this.el.append(this.__input);
        };

        StringWidget.superclass = WidgetBase;

        clientUtil.extend(
            StringWidget.prototype,
            WidgetBase.prototype
        );

        StringWidget.prototype.updateDisplay = function () {
            // Stops the caret from moving on account of:
            // keyup -> setValue -> updateDisplay
            if (document.activeElement !== this.__input[0]) {
                this.__input.val(this.getValue());
            }
            return StringWidget.superclass.prototype.updateDisplay.call(this);
        };

        return StringWidget;

    });