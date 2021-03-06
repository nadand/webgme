"use strict";

define(['js/Controls/PropertyGrid/Widgets/WidgetBase'],
    function (WidgetBase) {

        var OptionWidget,
            EMPTY_OPTION_BASE = $('<option value="empty"/>'),
            OPTION_BASE = $('<option/>');


        OptionWidget = function (propertyDesc) {
            OptionWidget.superclass.call(this, propertyDesc);

            var _self = this,
                i,
                opt;

            this.__select = $('<select/>');

            if (propertyDesc.value === '') {
                opt = EMPTY_OPTION_BASE.clone();
                opt.text('');
                this.__select.append(opt);
            }

            for (i = 0; i < this.valueItems.length; i += 1 ) {
                opt = OPTION_BASE.clone();
                opt.text(this.valueItems[i]);
                this.__select.append(opt);
            }

            this.__select.on('change', function (e) {
                var val = _self.__select.val();
                e.stopPropagation();
                e.preventDefault();

                if (this.valueType === 'number') {
                    val = parseFloat(val);
                }

                if (val !== NaN) {
                    //remove empty value if present
                    _self.__select.find('option[value="empty"]').remove();

                    _self.setValue(val);
                    _self.fireFinishChange();
                }
            });

            this.updateDisplay();

            this.el.append(this.__select);
        };

        OptionWidget.superclass = WidgetBase;

        _.extend(
            OptionWidget.prototype,
            WidgetBase.prototype
        );

        OptionWidget.prototype.updateDisplay = function () {
            this.__select.val(this.getValue());

            return OptionWidget.superclass.prototype.updateDisplay.call(this);
        };

        OptionWidget.prototype.setReadOnly = function (isReadOnly) {
            OptionWidget.superclass.prototype.setReadOnly.call(this, isReadOnly);

            if (isReadOnly === true) {
                this.__select.attr('disabled', 'disabled');
            } else {
                this.__select.removeAttr('disabled');
            }
        };

        return OptionWidget;

    });