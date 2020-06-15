import { useCallback } from 'react'

export const useZodValidationResolver = (validationSchema: any) =>
  useCallback(
    (data: unknown) => {
      try {
        const values = validationSchema.parse(data)

        return {
          values,
          errors: {},
        }
      } catch (error) {
        return {
          values: {},
          errors: error.errors.reduce(
            (allErrors: any, currentError: any) => ({
              ...allErrors,
              [currentError.path[0] ? currentError.path : ['confirmPassword']]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        }
      }
    },
    [validationSchema]
  )
