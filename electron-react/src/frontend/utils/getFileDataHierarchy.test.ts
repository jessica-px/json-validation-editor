import { FileData, HierarchicalFileData, HierarchicalFileDataItem } from "./fileData.types"
import {getFileDataHierarchy} from './getFileDataHierarchy';

const dummyData: FileData = {
  "mobs/enemies/bat.json": {
    name: "bat.json",
    path: "mobs/enemies/bat.json",
    jsonString: "",
    jsonErrors: [],
    hasChanges: false
  },
  "mobs/enemies/slime.json": {
    name: "slime.json",
    path: "mobs/enemies/slime.json",
    jsonString: "",
    jsonErrors: [],
    hasChanges: false
  },
  "mobs/friends/hero.json": {
    name: "mobs/friends/hero.json",
    path: "mobs/friends/hero.json",
    jsonString: "",
    jsonErrors: [],
    hasChanges: false
  },
  "objects/buildings/village/house.json": {
    name: "house.json",
    path: "objects/buildings/village/house.json",
    jsonString: "",
    jsonErrors: [],
    hasChanges: false
  },
  "objects/buildings/castle.json": {
    name: "castle.json",
    path: "objects/buildings/castle.json",
    jsonString: "",
    jsonErrors: [],
    hasChanges: false
  }
}

describe('getFileDataHierarchy()', () => {
  test('builds nested objects for each node in file path', () => {
    expect(getFileDataHierarchy(dummyData)).toStrictEqual({
      "mobs": {
        "enemies": {
          "bat.json": "mobs/enemies/bat.json",
          "slime.json": "mobs/enemies/slime.json"
        },
        "friends": {
          "hero.json": "mobs/friends/hero.json"
        }
      },
      "objects": {
        "buildings": {
          "village": {
            "house.json": "objects/buildings/village/house.json"
          },
          "castle.json": "objects/buildings/castle.json"
        }
      }
    }
    );
  });
});
