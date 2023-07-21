const obfuscationDict: { [key: string]: string } = {};

const obfuscate = (code: string, names: string[]): string => {
  let obfuscatedCode = code;
  names.forEach((name, i) => {
    const obfuscatedName = `OBFUSCATED${i}`;
    obfuscationDict[obfuscatedName] = name;
    const regex = new RegExp(`\\b${name}\\b`, "g");
    obfuscatedCode = obfuscatedCode.replace(regex, obfuscatedName);
  });
  return obfuscatedCode;
};

const deobfuscate = (obfuscatedCode: string): string => {
  let deobfuscatedCode = obfuscatedCode;
  for (const [obfuscatedName, originalName] of Object.entries(
    obfuscationDict
  )) {
    const regex = new RegExp(`\\b${obfuscatedName}\\b`, "g");
    deobfuscatedCode = deobfuscatedCode.replace(regex, originalName);
  }
  return deobfuscatedCode;
};
export { obfuscate, deobfuscate};
