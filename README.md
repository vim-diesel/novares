# Todo

```typescript
1. Check out 'aria-current' attribute for pagenumbers component.
2. Find out why adding a delay of 5 seconds on the findMany call in actions
  is making everything so slow

  // This makes any page or caloumn order selection freeze the app
  // We are calling this function on every sort/page change...
  // Find a way to cache it and sort/ paginate in the app?
   await new Promise((resolve) => setTimeout(resolve, 5000));

  const res = await prisma.event.findMany({
```

## NovaRes

Create, manage, and host workshops and events.

## Description

This is a sample project created for demonstration purposes.

## Installation

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Configure the environment variables.
4. Run `npm start` to start the application.

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Follow the on-screen instructions to use the application.

## Contributing

Contributions are welcome! Please follow the guidelines outlined in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the [MIT License](LICENSE).
