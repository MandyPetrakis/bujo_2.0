import clsx from "clsx";
import HydrationDay from "./hydrationDay";

export default async function Hydration(props: {
  startOfWeek: Date;
  weekArray: { dayOfWeek: string; day: number; month: string; date: Date }[];
}) {
  const hydrationDisplay = props.weekArray.map((day, index) => {
    return <HydrationDay day={day} />;
  });

  const length = 10;
  const unitsArray = Array.from({ length }, (_, index) => {
    const start = 1;
    const unit = start + index;
    return (
      <p key={unit} className="w-5 flex place-content-center text-sm">
        {unit}
      </p>
    );
  });

  return (
    <div className="pt-5">
      <p className="flex place-content-center text-sm font-semibold mb-5">
        Hydration
      </p>
      <div className="flex pl-8 mb-2">{unitsArray}</div>
      {hydrationDisplay}
    </div>
  );
}
