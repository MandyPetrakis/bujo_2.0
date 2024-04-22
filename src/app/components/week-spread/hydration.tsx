import clsx from "clsx";

export default async function Hydration(props: {
  startOfWeek: Date;
  weekArray: { dayOfWeek: string; day: number; month: string; date: Date }[];
}) {
  const cupsData = [4, 5, 15, 3, 7, 8, 9];

  const hydrationDisplay = props.weekArray.map((day, index) => {
    const dayCups = cupsData[index];
    const length = 10;
    const cups = Array.from({ length }, (_, index) => {
      return (
        <div className="h-[24px] place-content-center flex">
          <div
            key={index}
            className={clsx("h-3 w-5", {
              "bg-dark": dayCups >= index,
            })}
          ></div>
        </div>
      );
    });
    return (
      <div key={day.day} className="flex items-center pl-10">
        {cups}
        <p className="flex place-content-center text-sm h-[24px] ml-2">
          {dayCups}
        </p>
      </div>
    );
  });

  const length = 10;
  const cupsArray = Array.from({ length }, (_, index) => {
    const start = 1;
    const cup = start + index;
    return { cup: cup };
  });

  const cupsDisplay = cupsArray.map((c) => (
    <p key={c.cup} className="w-5 flex place-content-center text-sm">
      {c.cup}
    </p>
  ));

  return (
    <div className="pt-5">
      <p className="flex place-content-center text-sm font-semibold mb-5">
        Hydration
      </p>
      <div className="flex pl-8 mb-2">{cupsDisplay}</div>
      {hydrationDisplay}
    </div>
  );
}
