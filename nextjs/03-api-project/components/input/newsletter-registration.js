import { useEffect, useRef, useState } from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const [newsletterString, setNewsletterString] = useState("");
  const newsletterInputRef = useRef();
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);

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

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(reqbody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setButtonIsDisabled(false);
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
