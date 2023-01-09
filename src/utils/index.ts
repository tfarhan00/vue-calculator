

const saveStorage = (key: any, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getStorage = (key: any, item?: any) => {
  if (localStorage.getItem(key) && item) {
    const data = JSON.parse(localStorage.getItem(key) ?? '')
    return data[item]
  }
  else if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key) ?? '')
  }
};

const clearStorage = (key?: any) => {
  if (key) {
    localStorage.removeItem(key);
  } else {
    localStorage.clear();
    console.log('cleared')
  }
}


class Calculator {
  private memory: number = 0;

  public calculate(input: string): number {
    let result = 0;
    let currentOperand = '';
    let currentOperator = '+';
    let isNegative = false;
    let isPercentage = false;
    const orderedInput = this.reorderOperators(input);
    console.log(orderedInput)

    for (let i = 0; i < orderedInput.length; i++) {
      let char = orderedInput[i];

      if (char === '*' || char === '/' || char === '+') {

        result = this.performOperation(result, currentOperand, currentOperator, isNegative, isPercentage);
        currentOperand = '';
        isNegative = false;
        isPercentage = false;
        currentOperator = char;
      } else if (char === '-') {
        if (currentOperand.length === 0) {
          isNegative = true;
        } else {
          result = this.performOperation(result, currentOperand, currentOperator, isNegative, isPercentage);
          currentOperand = '-';
          isNegative = true;
          isPercentage = false;
          currentOperator = char;
        }
      } else if (char === '%') {
        isPercentage = true;
      } else if (char === '.' || (char >= '0' && char <= '9')) {
        currentOperand += char;
      } else {
        throw new Error(`Invalid character: ${char}`);
      }
    }

    result = this.performOperation(result, currentOperand, currentOperator, isNegative, isPercentage);

    this.memory = result;

    return result;
  }


  private reorderOperators(input: string): string {
    const operatorsRegex = /[+-/*]/g

    const operators = input.match(operatorsRegex) ?? [];

    const orderedOperators = operators.sort((a, b) => {
      return this.presedenceOperator(b) - this.presedenceOperator(a);
    });

    return input.replace(operatorsRegex, () => orderedOperators.shift() ?? '');
  }

  private presedenceOperator(operator: string): number {
    if (operator === '+' || operator === '-') {
      return 1;
    } else if (operator === '*' || operator === '/') {
      return 2;
    } else {
      return 0;
    }
  }

  public clearMemory(): void {
    this.memory = 0;
  }

  public getMemory(): number {
    return this.memory;
  }

  private performOperation(result: number, currentOperand: string, currentOperator: string, isNegative: boolean, isPercentage: boolean): number {
    let operand = parseFloat(currentOperand);

    if (isNegative) {
      operand *= -1;
    }

    if (isPercentage) {
      operand /= 100;
    }

    if (currentOperator === '*') {
      result *= operand;
    } else if (currentOperator === '/') {
      result /= operand;
    } else if (currentOperator === '+') {
      result += operand;
    } else if (currentOperator === '-') {
      result -= operand;
    }

    return result;
  }
}


const calcTest = (): number => {
  const calculator = new Calculator();
  return calculator.getMemory();
}

const calculateExp = (input: string): number => {
  const calculator = new Calculator();
  return calculator.calculate(input);
}


export { getStorage, saveStorage, clearStorage, calculateExp, calcTest }