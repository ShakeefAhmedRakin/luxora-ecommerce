import React from "react";

export default function AdminDashboardLayout(props: React.PropsWithChildren) {
  return (
    <>
      <div className="flex gap-10">
        <h1>ADMIN SIDEBAR</h1>
        {props.children}
      </div>
    </>
  );
}
