"use strict";

define([
    'js/Controls/PropertyGrid/Widgets/WidgetBase'],
    function (WidgetBase) {

        var NumberWidgetBase;

        NumberWidgetBase = function (propertyDesc) {

            NumberWidgetBase.superclass.call(this, propertyDesc);

            this.__min = propertyDesc.minValue;
            this.__max = propertyDesc.maxValue;
            this.__step = propertyDesc.stepValue;

            if (this.__step === undefined || this.__step === null) {

                if (this.originalValue === 0) {
                    this.__impliedStep = 1;
                } else {
                    this.__impliedStep = Math.pow(10, Math.floor(Math.log(this.originalValue) / Math.LN10)) / 10;
                }
            } else {
                this.__impliedStep = this.__step;
            }

            this.__precision = this._numDecimals(this.__impliedStep);
        };

        /* 'INHERIT' FROM WidgetBase */
        NumberWidgetBase.superclass = WidgetBase;

        _.extend(
            NumberWidgetBase.prototype,
            WidgetBase.prototype
        );

        /*OVERRIDE INHERITED PROPERTIES*/
        NumberWidgetBase.prototype.setValue = function (v) {

            if (this.__min !== undefined && v < this.__min) {
                v = this.__min;
            } else if (this.__max !== undefined && v > this.__max) {
                v = this.__max;
            }

            if (this.__step !== undefined && v % this.__step !== 0) {
                v = Math.round(v / this.__step) * this.__step;
            }

            NumberWidgetBase.superclass.prototype.setValue.call(this, v);
            this.updateDisplay();

            return this;
        };

        /* DEFINE EXTRA PROPERTIES FOR NumberWidgetBase */

        NumberWidgetBase.prototype._numDecimals = function (x) {
            x = x.toString();
            if (x.indexOf('.') > -1) {
                return x.length - x.indexOf('.') - 1;
            } else {
                return 0;
            }
        };

        NumberWidgetBase.prototype.min = function (v) {
            this.__min = v;
            return this;
        };

        NumberWidgetBase.prototype.max = function (v) {
            this.__max = v;
            return this;
        };

        NumberWidgetBase.prototype.step = function (v) {
            this.__step = v;
            return this;
        };

        return NumberWidgetBase;

    });