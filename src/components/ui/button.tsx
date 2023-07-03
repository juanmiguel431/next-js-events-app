import React, { PropsWithChildren } from "react";
import Link from "next/link";
import classes from "./button.module.css";
import { UrlObject } from "url";

interface ButtonProps extends PropsWithChildren {
  href: UrlObject | string;
}

const Button: React.FC<ButtonProps> = (props) => {

  return (
    <div className="button">
      <Link href={props.href} className={classes.btn} >{props.children}</Link>
    </div>
  );
}

export default Button;
