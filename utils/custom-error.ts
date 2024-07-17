export class ErrorBase<T extends string> extends Error {
  name: T
  message: string
  cause: any

  constructor({
    name,
    message,
    cause,
  }: {
    name: T
    message: string
    cause?: any
  }) {
    super()

    this.name = name
    this.message = message
    this.cause = cause
  }
}

type ExampleErrorNames = 'TestError' | 'CGP is Good'

export class ExampleError extends ErrorBase<ExampleErrorNames> {}

const example = () => {
  try {
    throw new ExampleError({ name: 'CGP is Good', message: '일단 에러 내봐' })
  } catch (error) {
    if (error instanceof ExampleError) {
      console.log(error.name, error.message)
    }
  }
}

example()
