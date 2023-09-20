import { getJsonLineNum } from './getJsonLineNum';

const dummyJson = `[
  {
    "type": "mob",
    "id": "cat",
    "sprite": {
      "id": "catSprite",
      "redHerring": {
        "animation": {
          "id": "anim",
          "frames": [1, 2, 3]
        }
      },
      "animation": {
        "id": "anim",
        "frames": [1, 2, 3]
      }
    }
  },
  {
    "type": "mob",
    "id": "moo",
    "sprite": {
      "id": "mooSprite",
      "redHerring": {
        "animation": {
          "id": "anim",
          "frames": [1, 2, 3]
        }
      },
      "animation": {
        "id": "anim",
        "frames": [1, 2, 3]
      }
    }
  },
  {
    "type": "mob",
    "id": "dog",
    "sprite": {
      "id": "dogSprite",
      "animation": {
        "id": "anim",
        "frames": [12, 23, 43]
      }
    },
    "singleLineTest": { "id": "foo" },
    "bar": 10
  }
]`

describe('getJsonLineNum()', () => {
  test('gets correct line numbers', () => {
    expect(getJsonLineNum(dummyJson, ['sprite'], 0)).toBe(4);
    expect(getJsonLineNum(dummyJson, ['sprite', 'animation', 'id'], 1)).toBe(30);
    expect(getJsonLineNum(dummyJson, ['sprite', 'animation', 'frames'], 2)).toBe(42);
    expect(getJsonLineNum(dummyJson, ['singleLineTest', 'id'], 2)).toBe(45);
    expect(getJsonLineNum(dummyJson, ['bar'], 2)).toBe(46);
  });

  test('returns line number of most recent open brace when key isn\'t found', () => {
    expect(getJsonLineNum(dummyJson, ['fizz'], 0)).toBe(1);
    expect(getJsonLineNum(dummyJson, ['sprite', 'fizz'], 0)).toBe(4);
    expect(getJsonLineNum(dummyJson, ['sprite', 'animation', 'fizz'], 0)).toBe(12);
  });

  test('returns 0 when json index isn\'t found', () => {
    expect(getJsonLineNum(dummyJson, ['id'], 10)).toBe(0);
  });
});
