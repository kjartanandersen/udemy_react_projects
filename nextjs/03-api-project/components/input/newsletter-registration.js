import { useEffect, useRef, useState, useContext } from "react";
import classes from "./newsletter-registration.module.css";

import NotificationContext from "@/store/notificationContext";

function NewsletterRegistration() {
  const [newsletterString, setNewsletterString] = useState("");
  const newsletterInputRef = useRef();
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);

  const ctx = useContext(NotificationContext);

  function newsletterHandler() {
    setNewsletterString(newsletterInputRef.current.value);
  }

  function registrationHandler(event) {
    event.preventDefault();
    setButtonIsDisabled(true);

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
    const enteredEmail = newsletterInputRef.current.value;

    const reqbody = { email: enteredEmail };

    ctx.showNotification({
      title: "Signing Up...",
      message: "Registering for newsletter",
      status: "pending",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(reqbody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong");
        });
      })
      .then((data) => {
        console.log(data);
        setButtonIsDisabled(false);
        ctx.showNotification({
          title: "Success!",
          message: "Successfully registered for newsletter",
          status: "success",
        });
      })
      .catch((error) => {
        ctx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            onChange={newsletterHandler}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={newsletterInputRef}
          />
          <button disabled={buttonIsDisabled || newsletterString === ""}>
            Register
          </button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
