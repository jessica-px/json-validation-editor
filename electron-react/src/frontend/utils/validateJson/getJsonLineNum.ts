/** Given a string containing a single json object, returns the line number containing
 * the key found at the given path */
export const getJsonLineNum = (jsonString: string, keyPath: (string|number)[], index: number): number => {
  let currJsonIndex = 0;
  let currLineNum = 0;
  let token = "";
  const openBracketsByLine: number[] = []; // num represents the line it was found on
  let nextKeyIndex = 0;

  for (let i = 0; i < jsonString.length; i++) {
    const char = jsonString.charAt(i);

    if (char == "{") {
      // track open brackets
      openBracketsByLine.push(currLineNum)
    } else if (char == "}") {
      // track closed brackets
      if (openBracketsByLine.length - 1 === nextKeyIndex && nextKeyIndex === keyPath.length - 1 && currJsonIndex === index) {
        // if we were at the right depth for our final key, but haven't already found it, return line number from last open bracket
        const lastOpenBracketLineNum = openBracketsByLine[openBracketsByLine.length - 1];
        return lastOpenBracketLineNum;
      }
      openBracketsByLine.pop()
      if (openBracketsByLine.length === 0) {
        // increment json index if this was the final open bracket
        currJsonIndex++;
      }
    } else if (char == "\n") {
      // count new lines
      currLineNum++
    } else if (char.trim() == '') {
      // ignore whitespace
      token = '';
    } else {
      // build token
      token += char;
      const nextKey = keyPath[nextKeyIndex];

      if (token === `"${nextKey}"`) {
        // check if token matches the key we're looking for
        if (openBracketsByLine.length - 1 === nextKeyIndex && currJsonIndex === index) {
          // and that the key is in the right json and at the right depth
          if (nextKeyIndex === keyPath.length - 1) {
            // if this is the final key in the path, return our current line number
            return currLineNum;
          }
          nextKeyIndex++;
        }
      }
    }
  }

  return 0;
}

export const positionNumToLineNum = (jsonString: string, positionNum: number): number => {
  let currLineNum = 0;

  for (let i = 0; i < jsonString.length; i++) {
    const char = jsonString.charAt(i);

    if (i === positionNum) {
      return currLineNum - 1;
    } else if (char == "\n") {
      currLineNum++
    }
  }

  return 0;
}
