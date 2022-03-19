import {sources} from '..';

test("should export 43 sources", () => {
    expect(Object.keys(sources).length).toBe(43);
})
