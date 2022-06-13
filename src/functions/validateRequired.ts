interface BaseError {
  fieldName: string
  message: string
  constraint: string
}

function validateRequired<T, K extends keyof T>(
  arg: T,
  keys: K[],
): T & {
  [P in K]-?: NonNullable<T[P]>
} {
  const fieldErrors: BaseError[] = []
  keys.forEach(key => {
    if (arg[key] == null) {
      fieldErrors.push({
        fieldName: String(key),
        message: `${String(key)} should not be null or undefined`,
        constraint: 'isDefined',
      })
    }
  })
  if (fieldErrors.length) {
    throw new Error(JSON.stringify({ name: 'missing fields', fieldErrors }))
  }
  return arg as T & {
    [P in K]-?: NonNullable<T[P]>
  }
}

function validateRequiredArray<T, K extends keyof T>(
  arr: T[],
  keys: K[],
): Array<
  T & {
    [P in K]-?: NonNullable<T[P]>
  }
> {
  return arr.map(obj => validateRequired(obj, keys))
}

export { validateRequired, validateRequiredArray }
