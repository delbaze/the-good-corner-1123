import { PropsWithChildren, ReactNode } from "react";

function Demo({ monInfo, children }: PropsWithChildren & { monInfo: string }) {
  // function Demo({ monInfo, children }: { monInfo: string; children: ReactNode }) {
  return (
    <div>
      Demo {monInfo}
      {children}
    </div>
  );
}

export default Demo;
