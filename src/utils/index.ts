

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
  
      for (let i = 0; i < input.length; i++) {
        let char = input[i];
  
        if (char === '-') {
          if (currentOperand.length === 0) {
            isNegative = true;
          } else {
            result = this.performOperation(result, currentOperand, currentOperator, isNegative, isPercentage);
            currentOperand = '-';
            isNegative = true;
            isPercentage = false;
            currentOperator = char;
          }
        } else if (char === '+' || char === '*' || char === '/') {
          result = this.performOperation(result, currentOperand, currentOperator, isNegative, isPercentage);
          currentOperand = '';
          isNegative = false;
          isPercentage = false;
          currentOperator = char;
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
  
      if (currentOperator === '+') {
        result += operand;
      } else if (currentOperator === '-') {
        result -= operand;
      } else if (currentOperator === '*') {
        result *= operand;
      } else if (currentOperator === '/') {
        result /= operand;
      }
  
      return result;
    }
  }
  

const calculateExp = (input: string): number => {
    const calculator = new Calculator();
    return calculator.calculate(input);
}


export { getStorage, saveStorage, clearStorage, calculateExp }