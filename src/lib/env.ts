//
//  Read live from process.env wherever this is imported — never a fixed value.
//  Evaluates to false/undefined-derived false in production, true only when
//  NEXT_PUBLIC_APPENV_ISDEV=true is actually set in the active .env.
//
export const IS_DEV = process.env.NEXT_PUBLIC_APPENV_ISDEV === 'true'
