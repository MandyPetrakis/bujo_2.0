export default async function Routines() {
  return (
    <>
      <div className="border h-48 p-5 text-sm min-w-fit mb-5 overflow-scroll">
        <div className="flex justify-center  place-content-center mb-5 font-semibold">
          Morning Routine
        </div>
        <p>1. Wash Face </p>
        <p>2. Brush Teeth</p>
        <p>3. Make Bed </p>
        <p>4. Walk Fred </p>
        <p>5. Meditate </p>
      </div>
      <div className="border h-48 p-5 text-sm min-w-fit overflow-scroll">
        <div className="flex justify-center place-content-center mb-5 font-semibold">
          Evening Routine
        </div>
        <p>1. Wash Face </p>
        <p>2. Brush Teeth </p>
        <p>3. Reset Space </p>
        <p>4. Journal </p>
      </div>
    </>
  );
}
