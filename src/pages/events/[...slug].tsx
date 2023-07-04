import React from "react";
import { useRouter } from "next/router";

const FilteredEventsPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="filtered-events-page">
      Filtered Events Page (Show filtered event)
    </div>
  );
}

export default FilteredEventsPage;
