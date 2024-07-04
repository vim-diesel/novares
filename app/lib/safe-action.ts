import { createSafeActionClient } from 'next-safe-action';

export const actionClient = createSafeActionClient({
  handleReturnedServerError(e) {
    // Rethrow all server errors:
    throw e;
  },
});
