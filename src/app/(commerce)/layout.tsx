import React from "react";

export default function HomeLayout(props: React.PropsWithChildren) {
  return (
    <>
      <h1>HEADER</h1>
      {props.children}
      <h1>FOOTER</h1>
    </>
  );
}
