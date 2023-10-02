export default function userProfile({ params }: any) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-400	">
      <h1 className="flex">
        profile{" "}
        <p className=" bg-black text-stone-50	font-black p-0.5 rounded-sm ml-2">
          {" "}
          {params.id}
        </p>
      </h1>
    </div>
  );
}
