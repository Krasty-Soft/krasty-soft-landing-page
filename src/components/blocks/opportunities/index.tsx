import React from "react";
import { Jobs } from "./jobs";
import { Section } from "@/components/ui";
import { jobs } from "@/lib/jobs";

export const Opportunities = ({ isEmpty = false }: { isEmpty?: boolean }) => {
  return (
    <Section
      variant={"paper"}
      subtitle={"CAREERS"}
      title={"Exciting opportunities and a supportive environment."}
    >
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-black text-center">
            Currently no opportunities available
          </p>
        </div>
      ) : (
        <Jobs jobs={jobs} />
      )}
    </Section>
  );
};
