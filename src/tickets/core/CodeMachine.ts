class CodeMachine {
  private existingCodes: Set<string>;

  constructor(existingWords: string[]) {
    this.existingCodes = new Set(
      existingWords.map((word) => word.toUpperCase())
    );
  }

  private generateRandomChar(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters.charAt(randomIndex);
  }

  private generateUniqueCode(lengthCode: number): string {
    let code = "";
    for (let i = 0; i < lengthCode; i++) {
      let randomChar;
      do {
        randomChar = this.generateRandomChar();
      } while (this.existingCodes.has(randomChar)); // Verificamos si el código ya existe en la lista.

      code += randomChar;
      this.existingCodes.add(randomChar); // Agregamos el nuevo código al conjunto.
    }
    return code;
  }

  generateCode(lengthCode: number): string {
    if (lengthCode <= 0) {
      throw new Error("La longitud del código debe ser mayor que 0.");
    }

    const uniqueCode = this.generateUniqueCode(lengthCode);
    return uniqueCode;
  }
}

export default CodeMachine;
