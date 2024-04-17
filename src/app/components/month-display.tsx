import Events from "@/app/components/month-spread/events";
import { sacramento } from "@/app/components/fonts";
import { getDate } from "../lib/data";

export default function MonthDisplay() {
  const { displayMonth } = getDate();

  return (
    <div className={`${sacramento.className} antialiased text-7xl mb-10`}>
      {displayMonth}
    </div>
  );
}
