import { forwardRef } from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

export default forwardRef<any, NextLinkProps>(
  ({ href, as, replace, shallow, scroll, passHref, prefetch, children, ...rest }, ref) => {
    const props = { href, as, replace, shallow, scroll, passHref, prefetch, children }
    return <NextLink ref={ref} {...props} />
  }
)
