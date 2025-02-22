import React from "react";

export default function UserDashboardLayout(props: React.PropsWithChildren) {
  return (
    <>
      <div className="flex gap-10">
        <h1>USER SIDEBAR</h1>
        {props.children}
      </div>
    </>
  );
}
