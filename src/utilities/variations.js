export var FieldType;
(function (FieldType) {
    FieldType[FieldType["TEXT_INPUT"] = 1] = "TEXT_INPUT";
    FieldType[FieldType["SELECT"] = 2] = "SELECT";
    FieldType[FieldType["FILE_UPLOAD"] = 3] = "FILE_UPLOAD";
    FieldType[FieldType["TEXT_AREA"] = 4] = "TEXT_AREA";
    FieldType[FieldType["NUMBER_INPUT"] = 5] = "NUMBER_INPUT";
    FieldType[FieldType["CHECKBOX"] = 6] = "CHECKBOX";
    FieldType[FieldType["RADIO"] = 7] = "RADIO";
    FieldType[FieldType["FIELD_INSTRUCTIONS"] = 8] = "FIELD_INSTRUCTIONS";
    FieldType[FieldType["IMAGE_SELECT"] = 9] = "IMAGE_SELECT";
    FieldType[FieldType["COLOUR_PICKER"] = 10] = "COLOUR_PICKER";
    FieldType[FieldType["COLOUR_SELECT"] = 11] = "COLOUR_SELECT";
})(FieldType || (FieldType = {}));
export function isSelectable(fieldType) {
    return [
        FieldType.SELECT,
        FieldType.CHECKBOX,
        FieldType.RADIO,
        FieldType.IMAGE_SELECT,
        FieldType.COLOUR_SELECT
    ].includes(fieldType);
}
function concatinatedSelectedOptionValues(variation) {
    var selectableOptions = variation.selectableOptions, value = variation.value;
    var optionIds = value ? value.split(',') : [];
    var optionIdsLength = optionIds.length - 1;
    var option;
    var i = 0;
    var val = '';
    for (i; i < optionIds.length; i++) {
        option = selectableOptions.find(function (o) { return String(o.optionId) === String(optionIds[i]); });
        val += option ? option.value : '';
        if (optionIdsLength > i) {
            val += ', ';
        }
    }
    return val;
}
export function valueString(variation) {
    var field = variation.variationField, variationFiles = variation.variationFiles, value = variation.value;
    if (isSelectable(field.fieldType)) {
        return concatinatedSelectedOptionValues(variation);
    }
    else if (field.fieldType === FieldType.FILE_UPLOAD && variationFiles) {
        return variationFiles.length > 1 ? 'uploaded files' : 'uploaded file';
    }
    return value;
}
