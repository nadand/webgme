"use strict";

define(['js/Widgets/DiagramDesigner/DesignerItem'], function (DesignerItem) {

    var DiagramDesignerWidgetDesignerItems;

    DiagramDesignerWidgetDesignerItems = function () {

    };

    DiagramDesignerWidgetDesignerItems.prototype.createDesignerItem = function (objD) {
        var componentId = this.getGuid("I_"),
            objDescriptor = _.extend({}, objD),
            alignedPosition = this._alignPositionToGrid(objDescriptor.position.x, objDescriptor.position.y),
            newComponent;

        this.logger.debug("Creating model component with id: '" + componentId + "'");

        objDescriptor.designerCanvas = this;
        objDescriptor.position.x = alignedPosition.x;
        objDescriptor.position.y = alignedPosition.y;
        objDescriptor.guid = componentId;

        this._checkPositionOverlap(componentId, objDescriptor);

        this.itemIds.push(componentId);

        //add to accounting queues for performance optimization
        this._insertedDesignerItemIDs.push(componentId);

        newComponent = this.items[componentId] = new DesignerItem(componentId, this);
        newComponent.moveTo(objDescriptor.position.x, objDescriptor.position.y);

        newComponent.__setDecorator(objDescriptor.decoratorClass, objDescriptor.control, objDescriptor.metaInfo);
        newComponent.addToDocFragment(this._documentFragment);

        return newComponent;
    };

    DiagramDesignerWidgetDesignerItems.prototype.updateDesignerItem  = function (componentId, objDescriptor) {
        var alignedPosition;

        if (this.itemIds.indexOf(componentId) !== -1) {
            this.logger.debug("Updating model component with parameters: " + objDescriptor);

            //adjust its position to this canvas
            if (objDescriptor.position && _.isNumber(objDescriptor.position.x) && _.isNumber(objDescriptor.position.y)) {
                alignedPosition = this._alignPositionToGrid(objDescriptor.position.x, objDescriptor.position.y);

                objDescriptor.position.x = alignedPosition.x;
                objDescriptor.position.y = alignedPosition.y;

                this._checkPositionOverlap(componentId, objDescriptor);
            }

            //add to accounting queues for performance optimization
            this._updatedDesignerItemIDs.push(componentId);

            this.items[componentId].update(objDescriptor);
        }
    };

    DiagramDesignerWidgetDesignerItems.prototype.updateDesignerItemSubComponent = function (componentId, subComponentId) {
        if (this.itemIds.indexOf(componentId) !== -1) {
            this.logger.debug("Updating model component's [" + componentId + "] subcomponent: " + subComponentId);

            //add to accounting queues for performance optimization
            this._updatedDesignerItemIDs.push(componentId);

            this.items[componentId].updateSubcomponent(subComponentId);
        }
    };

    DiagramDesignerWidgetDesignerItems.prototype.deleteDesignerItem  = function (id) {
        var idx;

        this.logger.debug("Deleting DesignerItem with ID: '" + id + "'");

        //keep up accounting
        this._deletedDesignerItemIDs.push(id);

        idx = this.itemIds.indexOf(id);
        this.itemIds.splice(idx, 1);

        this.items[id].destroy();
        delete this.items[id];
    };

    //NOTE: could/should be overridden in the CONTROLLER
    DiagramDesignerWidgetDesignerItems.prototype.onDesignerItemDoubleClick = function (id, event) {
        this.logger.debug("DesignerItem '" + id + "' received double click at pos: [" + event.offsetX + ", " + event.offsetY + "]");
    };

    return DiagramDesignerWidgetDesignerItems;
});