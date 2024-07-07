import { createSafeActionClient} from 'next-safe-action';

export const actionClient = createSafeActionClient({
  handleReturnedServerError(e) {
    return 'Unhandled server error';
  },
});
