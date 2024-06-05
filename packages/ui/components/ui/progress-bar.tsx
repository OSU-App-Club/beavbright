export const ProgressBar = ({ progress = 0 }: { progress?: number }) => {
  return (
    <div className="py-1.5 h-6 relative">
      <div className="absolute top-0 bottom-0 left-0 w-full h-full bg-gray-400"></div>
      <div
        style={{
          width: `${progress}%`,
        }}
        className="absolute top-0 bottom-0 left-0 h-full transition-all duration-150 bg-gray-600"
      ></div>
      <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-full h-full">
        <span className="text-xs font-bold text-white">{progress}%</span>
      </div>
    </div>
  );
};

export const RadialProgress = ({ progress }: { progress: number }) => {
  return (
    <div className="inline-flex items-center justify-center overflow-hidden rounded-full">
      <svg className=" w-20 h-20">
        <circle
          className="text-gray-300"
          strokeWidth={"4"}
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
        <circle
          className="text-orange-500"
          strokeWidth="4"
          strokeDasharray={30 * 2 * Math.PI}
          strokeDashoffset={100 - (progress / 100) * 100}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
      </svg>
      <span className="absolute text-sm font-semibold">{progress}%</span>
    </div>
  );
};
