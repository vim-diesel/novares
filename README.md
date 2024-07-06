# Todo

```typescript
1. Check out 'aria-current' attribute for pagenumbers component.
2. Find out why adding a delay of 5 seconds on the findMany call in actions
  is making everything so slow

  // This makes any page or caloumn order selection freeze the app
  // We are calling this function on every sort/page change...
  // Find a way to cache it and sort/ paginate in the app?

  // ~~db.ts~~
     return new PrismaClient().$extends({
    query: {
      event: {
        async findMany({ model, operation, args, query }) {
          // Uncomment this line to test the delay
          await new Promise((resolve) => setTimeout(resolve, 5000));
          return query(args);
```

## NovaRes

Create, manage, and host workshops and events.

## Description and Features

This is a sample project created for demonstration purposes.

Uses NextJS, Prisma, sqlite, and TailwindCSS.

## Installation

1. Clone the repository.
2. npm run dev

## Usage

Hosted at vercel later

## License

This project is licensed under the [MIT License](LICENSE). Use it as you please.
