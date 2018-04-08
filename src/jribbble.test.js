const jribbble = require("./jribbble");

describe("setToken", () => {
  it("should be a function", () => {
    expect(typeof jribbble.setToken).toBe("function");
  });

  it("should throw an error if no value is provided", () => {
    expect(() => jribbble.setToken()).toThrow();
  });
});

describe("_createApiMethod", () => {
  it("should be a function", () => {
    expect(typeof jribbble._createApiMethod).toBe("function");
  });

  it("should return a function", () => {
    const newMethod = jribbble._createApiMethod("/path");
    expect(typeof newMethod).toBe("function");
  });
});

describe("_processArguments", () => {
  it("should be a function", () => {
    expect(typeof jribbble._processArguments).toBe("function");
  });

  it("should throw if a token hasn't been set and not provided as an option", () => {
    expect(() => jribbble._processArguments()).toThrow();
  });

  it("should set a resourceId if the first argument is a string", () => {
    const shotId = "4567";
    jribbble.setToken("1234");
    const result = jribbble._processArguments(shotId);
    expect(result.resourceId).toBe(shotId);
  });

  it("should set a resourceId if the first argument is a number", () => {
    const shotId = 4567;
    jribbble.setToken("1234");
    const result = jribbble._processArguments(shotId);
    expect(result.resourceId).toBe(shotId);
  });

  it("should set a callback function if it's provided as an option", () => {
    const cb = () => {};
    const result = jribbble._processArguments(cb);
    expect(result.callback).toBe(cb);
  });

  it("should set pagination query string if provided as an option", () => {
    const opts = {page: 3, per_page: 7};
    const result = jribbble._processArguments(opts);
    expect(result.query).toBe("?page=3&per_page=7");
  });
});

describe("Public API Methods", () => {
  it("shots should be a function", () => {
    expect(typeof jribbble.shots).toBe("function");
  });

  it("user should be a function", () => {
    expect(typeof jribbble.user).toBe("function");
  });

  it("projects should be a function", () => {
    expect(typeof jribbble.projects).toBe("function");
  });

  it("likes should be a function", () => {
    expect(typeof jribbble.likes).toBe("function");
  });

  it("popular should be a function", () => {
    expect(typeof jribbble.popular).toBe("function");
  });
});
