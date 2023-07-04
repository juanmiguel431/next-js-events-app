import React, { MouseEventHandler, PropsWithChildren } from "react";
import Link from "next/link";
import classes from "./button.module.css";
import { UrlObject } from "url";

interface ButtonProps extends PropsWithChildren {
  href?: UrlObject | string;
  onClick?: MouseEventHandler
}

const Button: React.FC<ButtonProps> = (props) => {

  if (props.href === undefined) {
    return <button className={classes.btn} onClick={props.onClick} >{props.children}</button>;
  }

  return (
    <Link href={props.href} className={classes.btn} >{props.children}</Link>
  );
}

export default Button;
