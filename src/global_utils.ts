export const validateCommand = (command: string) => {
  const allowedCommands = ["Л", "П", "В", "Н", "О", "Б"];

  const trimmedCommand = command.trim();

  if (trimmedCommand === "") {
    return { status: true, text: "Поле не должно быть пустым" };
  }

  const isValid = trimmedCommand
    .split("")
    .every((char) => allowedCommands.includes(char));
  if (!isValid) {
    return { status: true, text: "Недопустимое значение команды" };
  }

  return { status: false, text: "" };
};

export const compressCommand = (command: string): string => {
  if (!command) return "";

  const compressPure = (str: string): string => {
    // Ищем повторяющийся паттерн
    for (let len = 2; len <= Math.floor(str.length / 2); len++) {
      const pattern = str.slice(0, len);
      let i = 1;

      while (
        i * len + len <= str.length &&
        str.slice(i * len, (i + 1) * len) === pattern
      ) {
        i++;
      }

      if (i > 1) {
        const compressedPattern = compressPure(pattern);
        const rest = str.slice(i * len);
        return `${i}(${compressedPattern})${compressPure(rest)}`;
      }
    }

    // Обычное сжатие
    let result = "";
    let count = 1;

    for (let i = 1; i <= str.length; i++) {
      if (str[i] === str[i - 1]) {
        count++;
      } else {
        result += (count > 1 ? count : "") + str[i - 1];
        count = 1;
      }
    }

    return result;
  };

  // Вся сжатая строка + "Б" в самом конце
  return compressPure(command) + "Б";
};
