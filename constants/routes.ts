export const routes = {
    home : '/',
    search : '/search',
} as const;

export type TRoute = (typeof routes)[keyof typeof routes];