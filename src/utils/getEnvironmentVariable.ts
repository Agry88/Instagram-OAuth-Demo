export default function getEnvironmentVariable(
  name: string,
  defaultValue: string
): string {
  const value = process.env[name]
  if (value === undefined) {
    return defaultValue;
  }
  return value;
}
