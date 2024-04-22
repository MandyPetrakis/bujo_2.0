import { sacramento } from "@/app/components/fonts";

export default function WeekHeader(props: { week: number }) {
  return (
    <div
      className={`${sacramento.className} antialiased text-4xl w-fit flex justify-center `}
    >
      Week {props.week}
    </div>
  );
}
