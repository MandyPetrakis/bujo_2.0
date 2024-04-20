import { sacramento } from "@/app/components/fonts";
import { getDisplayMonth } from "../../lib/data";

export default function MonthHeader(props: { month: number }) {
  const displayMonth = getDisplayMonth(props.month);
  return (
    <div
      className={`${sacramento.className} antialiased text-6xl w-64 flex justify-center `}
    >
      {displayMonth}
    </div>
  );
}
