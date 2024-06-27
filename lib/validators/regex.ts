const REGEX_FORMAT_DATE = /^\d{4}-\d{2}-\d{2}$/
const REGEX_POSTAL_CODE = /^[a-zA-Z0-9\s-]{3,10}$/
const REGEX_ALIAS_ADDRESS = /^[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s]*$/
const REGEX_STRINGS = /^[a-zA-ZáéíóúÁÉÍÓÚäëïöüÄËÏÖÜàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛñÑçÇşŞğĞ\-'\s]+$/
const REGEX_STRING_NUMBER = /^[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s]*$/
const REGEX_NUMBER_PHONE = /^[0-9 ]*$/
export {
  REGEX_FORMAT_DATE,
  REGEX_POSTAL_CODE,
  REGEX_ALIAS_ADDRESS,
  REGEX_NUMBER_PHONE,
  REGEX_STRINGS,
  REGEX_STRING_NUMBER
}