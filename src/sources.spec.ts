import { sources } from "..";

test("should export 44 sources", () => {
  expect(Object.keys(sources).length).toBe(44);
});
