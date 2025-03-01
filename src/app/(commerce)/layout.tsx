import React from "react";
import Navbar from "./_components/navbar";

export default function HomeLayout(props: React.PropsWithChildren) {
  return (
    <>
      <Navbar />
      {props.children}
      <h1>FOOTER</h1>
    </>
  );
}
