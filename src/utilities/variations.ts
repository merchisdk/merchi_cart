export enum FieldType {
  TEXT_INPUT = 1,
  SELECT = 2,
  FILE_UPLOAD = 3,
  TEXT_AREA = 4,
  NUMBER_INPUT = 5,
  CHECKBOX = 6,
  RADIO = 7,
  FIELD_INSTRUCTIONS = 8,
  IMAGE_SELECT = 9,
  COLOUR_PICKER = 10,
  COLOUR_SELECT = 11,
}


export function isSelectable(fieldType: number) {
  return [
    FieldType.SELECT,
    FieldType.CHECKBOX,
    FieldType.RADIO,
    FieldType.IMAGE_SELECT,
    FieldType.COLOUR_SELECT
  ].includes(fieldType);
}

function concatinatedSelectedOptionValues(variation: any) {
  const { selectableOptions, value } = variation;
  const optionIds = value ? value.split(',') : [];
  const optionIdsLength = optionIds.length - 1;
  let option
  let i = 0;
  let val = '';
  for (i; i < optionIds.length; i++) {
    option = selectableOptions.find(
      (o: any) => String(o.optionId) === String(optionIds[i]));
    val += option ? option.value : '';
    if (optionIdsLength > i) {
      val += ', ';
    }
  }
  return val;
}

export function valueString(variation: any) {
  const {
    variationField: field,
    variationFiles,
    value,
  } = variation;
  if (isSelectable(field.fieldType)) {
    return concatinatedSelectedOptionValues(variation);
  } else if (field.fieldType === FieldType.FILE_UPLOAD && variationFiles) {
    return variationFiles.length > 1 ? 'uploaded files' : 'uploaded file';
  }
  return value;
}
