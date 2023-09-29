const { artifacts } = require("hardhat");
const Calculator = artifacts.require("Calculator");


contract("Calculator", (accounts) => {
  let calculatorInstance;

  before(async () => {
    calculatorInstance = await Calculator.deployed();
  });

  it("should initialize result to 0", async () => {
    const initialResult = await calculatorInstance.result();
    assert.equal(initialResult.toNumber(), 0, "Result is not initialized to 0");
  });

  it("should add two numbers", async () => {
    const num1 = 5;
    const num2 = 3;
    await calculatorInstance.add(num1, num2);
    const result = await calculatorInstance.result();
    assert.equal(result.toNumber(), num1 + num2, "Addition result is incorrect");
  });

  it("should subtract two numbers", async () => {
    const num1 = 8;
    const num2 = 2;
    await calculatorInstance.subtract(num1, num2);
    const result = await calculatorInstance.result();
    assert.equal(result.toNumber(), num1 - num2, "Subtraction result is incorrect");
  });

  it("should multiply two numbers", async () => {
    const num1 = 6;
    const num2 = 4;
    await calculatorInstance.multiply(num1, num2);
    const result = await calculatorInstance.result();
    assert.equal(result.toNumber(), num1 * num2, "Multiplication result is incorrect");
  });

  it("should divide two numbers", async () => {
    const num1 = 10;
    const num2 = 2;
    await calculatorInstance.divide(num1, num2);
    const result = await calculatorInstance.result();
    assert.equal(result.toNumber(), num1 / num2, "Division result is incorrect");
  });

  it("should not allow division by zero", async () => {
    const num1 = 8;
    const num2 = 0;
    try {
      await calculatorInstance.divide(num1, num2);
      assert.fail("Division by zero should throw an error");
    } catch (error) {
      assert.include(error.message, "Division by zero is not allowed.", "Error message is incorrect");
    }
  });

  it("should require both numbers to be greater than or equal to zero", async () => {
    const num1 = -1;
    const num2 = 5;
    try {
      await calculatorInstance.add(num1, num2);
      assert.fail("Adding negative number should throw an error");
    } catch (error) {
      assert.include(error.message, "Both numbers must be greater than or equal to zero.", "Error message is incorrect");
    }
  });
});
