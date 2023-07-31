import classes from './newsletter-registration.module.css';
import { FormEventHandler, useCallback, useContext, useRef } from 'react';
import { RequestBody } from '@/pages/api/newsletter';
import NotificationContext from '@/store/notification-context';
import { NewsletterData } from '@/models';

function NewsletterRegistration() {
  const inputRef = useRef<HTMLInputElement>(null);
  const notificationCtx = useContext(NotificationContext);

  const registrationHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const email = inputRef.current?.value || '';

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API

    const requestBody: RequestBody = {
      email: email
    }

    try {
      if (notificationCtx.showNotification) {
        notificationCtx.showNotification({
          title: 'Signing up',
          message: 'Registering for newsletter',
          status: 'pending'
        });
      }

      const response = await fetch('api/newsletter', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        if (notificationCtx.showNotification) {
          notificationCtx.showNotification({
            title: 'Success',
            message: 'Successfully registered for newsletter',
            status: 'success'
          });
        }
      } else {
        const data = await response.json() as NewsletterData;
        notifyError(data.message);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        notifyError(e.message);
      }
    }
  }

  const notifyError = useCallback((errorMessage: string) => {
    if (notificationCtx.showNotification) {
      notificationCtx.showNotification({
        title: 'Error',
        message: errorMessage || 'Something went wrong!',
        status: 'error'
      });
    }
  }, [notificationCtx]);

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={inputRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
