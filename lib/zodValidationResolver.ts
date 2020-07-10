import * as z from 'zod'
import { useCallback } from 'react'

export function useZodValidationResolver<T>(validationSchema: z.Schema<T>) {
  return useCallback(
    (data: T) => {
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
}
