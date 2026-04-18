export const ROUTES = {
  LANDING: 'landingpage',
  HOME: 'homepage',
  VIDEO: 'video',
  DICTATION: 'dictation',
  VOCABULARY: 'vocabulary',
  LOGIN: 'login',
  REGISTER: 'register',
  PROFILE: 'profile',
}

export function routeHash(route) {
  return `#${route}`
}

