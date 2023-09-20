import Joi from 'joi';
import { getJsonLineNum, positionNumToLineNum } from './getJsonLineNum';

export type JsonError = {
  key: string,
  index: number,
  keyPath: (string|number)[],
  lineNumber: number,
  message: string
}

const schema = Joi.object({
  type: Joi.string().required(),
  id: Joi.string().required(),
  sprite: Joi.object({
    id: Joi.string().required(),
    path: Joi.string().required()
  }),
  hp: Joi.number()
});

export const getJsonErrors = (jsonListString: string) => {
  const getErrorData = (error: Joi.ValidationError, index: number): JsonError[] => {
    return error.details.map(errorItem => {
      const errorKey = errorItem.context.key;
      return {
        key: errorKey,
        index,
        keyPath: errorItem.path,
        lineNumber: getJsonLineNum(jsonListString, errorItem.path, index),
        message: errorItem.message
      }
    });
  }

  const errorList: JsonError[] = [];
  try {
    const parsedJson: {[key: string]: string}[] = JSON.parse(jsonListString);
    parsedJson.forEach((dummyJson, i) => {
      const { error } = schema.validate(dummyJson, { abortEarly: false });
      if (error) {
        const errorData = getErrorData(error, i);
        errorList.push(...errorData);
      }

    })
  } catch(e) {
    let lineNumber = 0;
    let message = e.message;

    if (e.message.includes('at position')) {
      const positionNum = parseInt(e.message.match(/at position (\d*)/)[1]);
      if (!isNaN(positionNum)) {
        lineNumber = positionNumToLineNum(jsonListString, positionNum);
        message = message.replace(/at position (\d*)/, `at line ${lineNumber + 1}`);
      }
    }

    errorList.push({
      key: 'parse error',
      index: 0,
      keyPath: [],
      lineNumber,
      message
    })
  }

  return errorList;
}
