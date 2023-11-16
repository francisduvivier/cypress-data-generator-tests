export function xPathForInput(
  paramName: 'isBirthdateKnown' | 'isGenderKnown',
  inputType: string,
  choice: undefined | boolean
) {
  return `//form[contains(., "${paramName}")]//input[@type="${inputType}" and @value="${choice}"]`;
}
