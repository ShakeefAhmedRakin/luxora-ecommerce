import React from "react";

export default function DashboardLayout(props: React.PropsWithChildren) {
  return (
    <>
      <div className="flex gap-10">{props.children}</div>
    </>
  );
}
