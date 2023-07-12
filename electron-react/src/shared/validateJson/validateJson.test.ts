import { getJsonErrors } from './validateJson';

const validJson = `
[
  {
    "type": "mob",
    "id": "cat"
  }
]`

const invalidJson = `
[
  {
    "type": "mob",
    "sprite": {
      "id": 5,
      "path": "hello world"
    }
  },
  {
    "type": "mob",
    "id": "croc",
    "sprite": {
      "id": 5,
      "path": "hello world"
    },
    "hp": "ten"
  }
]
`

const badSyntaxJson = `
[
  {
    "type": "mob",
    "sprite": {
      "id": 5,
      "path": "hello world"
    }
  }
  {
    "type": "mob",
    "id": "croc",
    "sprite": {
      "id": 5,
      "path": "hello world"
    },
    "hp": "ten"
  }
]
`

describe('getJsonErrors()', () => {
  test('valid JSON returns an empty list', () => {
    expect(getJsonErrors(validJson)).toStrictEqual([]);
  });

  test('invalid JSON returns list of errors', () => {
    const invalidResults = getJsonErrors(invalidJson);
    expect(invalidResults.length).toEqual(4);
    expect(invalidResults[1].message).toEqual("\"sprite.id\" must be a string");
    expect(invalidResults[0].lineNumber).toEqual(2);
    expect(invalidResults[1].lineNumber).toEqual(5);
    expect(invalidResults[3].lineNumber).toEqual(16);
  });

  test('JSON with incorrect syntax returns error with correct line number', () => {
    const results = getJsonErrors(badSyntaxJson);
    expect(results[0].lineNumber).toEqual(8);
  });
});
