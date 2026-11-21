// The only module (besides tests) allowed to import the old static data. It is the fallback
// when the database is unreachable and the source for sections that are not in the database.
export { portfolioData as staticContent } from '@/data/portfolio';
