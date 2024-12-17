import { expect, describe, it } from "vitest";
import { todos } from "../database/todoItems";

describe("Vitest", () => {
  it("should work", () => {
    expect(todos.length).toStrictEqual(2);
  });
});
