import { BisParamName } from './support-types';

export function xPathForInputInForm(
  paramName: BisParamName,
  inputType: string,
  generatorId: string,
  choice?: boolean
) {
  const valuePart = choice !== undefined ? ` and @value="${choice}"` : '';
  return `//form[contains(., "${paramName}")]//input[@type="${inputType}" and starts-with(@id, "/${generatorId}")${valuePart}]`;
  //div[contains(@class, "form-floating") and contains(., "amount")]//input[@type="number" ]
}

export function xPathForInputInFormDiv(
  paramName: BisParamName,
  inputType: string,
  generatorId: string,
  choice?: boolean
) {
  const valuePart = choice !== undefined ? ` and @value="${choice}"` : '';
  return `//div[contains(@class, "form-floating") and contains(., "${paramName}")]//input[@type="${inputType}" and starts-with(@id, "/${generatorId}")${valuePart}]`;
}
