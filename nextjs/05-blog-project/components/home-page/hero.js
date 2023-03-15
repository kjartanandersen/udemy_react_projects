import Image from "next/image";

import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/cv_image.jpg"
          alt="An image of me"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, Im Kjartan</h1>
      <p>I do stuff</p>
    </section>
  );
}

export default Hero;
