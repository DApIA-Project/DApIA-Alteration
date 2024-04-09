export function detectErrorJsonScenario(
  jsonScenarioContent: any
): string | null {
  if (
    !jsonScenarioContent.name ||
    !jsonScenarioContent.text ||
    !jsonScenarioContent.options
  ) {
    return 'Error file content : Missing attribute name or text or options'
  }
  if (
    jsonScenarioContent.options.haveLabel === undefined ||
    jsonScenarioContent.options.haveRealism === undefined ||
    jsonScenarioContent.options.haveNoise === undefined ||
    jsonScenarioContent.options.haveDisableLatitude === undefined ||
    jsonScenarioContent.options.haveDisableLongitude === undefined ||
    jsonScenarioContent.options.haveDisableAltitude === undefined
  ) {
    return 'Error file content : Missing attribute haveLabel or haveRealism or haveNoise or haveDisableLatitude or haveDisableLongitude or haveDisableAltitude'
  }

  if (typeof jsonScenarioContent.name !== 'string') {
    return 'Attribute name must be a string'
  }
  if (typeof jsonScenarioContent.text !== 'string') {
    return 'Attribute text must be a string'
  }
  if (typeof jsonScenarioContent.options.haveLabel !== 'boolean') {
    return 'Attribute haveLabel must be a boolean'
  }
  if (typeof jsonScenarioContent.options.haveRealism !== 'boolean') {
    return 'Attribute haveRealism must be a boolean'
  }
  if (typeof jsonScenarioContent.options.haveNoise !== 'boolean') {
    return 'Attribute haveNoise must be a boolean'
  }
  if (typeof jsonScenarioContent.options.haveDisableLatitude !== 'boolean') {
    return 'Attribute haveDisableLatitude must be a boolean'
  }
  if (typeof jsonScenarioContent.options.haveDisableLongitude !== 'boolean') {
    return 'Attribute haveDisableLongitude must be a boolean'
  }
  if (typeof jsonScenarioContent.options.haveDisableAltitude !== 'boolean') {
    return 'Attribute haveDisableAltitude must be a boolean'
  }
  return null
}
