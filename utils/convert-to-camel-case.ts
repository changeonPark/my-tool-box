type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S

export type ConvertSnakeToCamelCase<T> = T extends any[]
  ? { [K in keyof T]: ConvertSnakeToCamelCase<T[K]> }
  : T extends object
  ? {
      [K in keyof T as SnakeToCamelCase<K & string>]: ConvertSnakeToCamelCase<
        T[K]
      >
    }
  : T

function toCamelCase(str: string): string {
  return str.replace(/([-_][a-z])/gi, ($1) =>
    $1.toUpperCase().replace("-", "").replace("_", "")
  )
}

function convertToCamelCaseInternal<T>(obj: T): ConvertSnakeToCamelCase<T> {
  if (Array.isArray(obj)) {
    return obj.map(convertToCamelCaseInternal) as ConvertSnakeToCamelCase<T>
  } else if (obj && typeof obj === "object") {
    return Object.keys(obj).reduce((newObj, key) => {
      const newKey = toCamelCase(key)
      newObj[newKey] = convertToCamelCaseInternal(
        (obj as Record<string, any>)[key]
      )
      return newObj
    }, {} as Record<string, any>) as ConvertSnakeToCamelCase<T>
  }
  return obj as ConvertSnakeToCamelCase<T>
}

export function convertToCamelCase<T>(obj: T): ConvertSnakeToCamelCase<T> {
  return convertToCamelCaseInternal(obj)
}

/**
 * convertToCamelCase<IGETResultResponse>(data)
 * 
 * @ 원본타입
 * interface IGETResultResponse {
  result: 0
  base_url: string
  resultFiles: Array<string>
  }

 * @ 변환된 타입
 * Promise<{
    result: 0;
    baseUrl: string;
    resultFiles: string[];
 *  }>
 */

interface Example {
  result: number
  base_url: string
  resultFiles: string[]
}

const EXAMPLE: Example = {
  result: 0,
  base_url: "https://cgp.co.kr",
  resultFiles: ["e", "x", "l"],
}

console.log(convertToCamelCase(EXAMPLE))
