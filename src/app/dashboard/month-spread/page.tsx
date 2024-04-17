import { getDate } from "@/app/lib/data";
import Habits from "../../components/month-spread/habits";
import Events from "@/app/components/month-spread/events";
import MonthDisplay from "@/app/components/month-display";
import { sacramento } from "@/app/components/fonts";

export default function MonthSpread() {
  const { displayMonth } = getDate();

  return (
    <div className="p-5">
      <MonthDisplay />
      <Events />
    </div>
  );
}
