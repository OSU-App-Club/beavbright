import {
  Access,
  AddCourse,
  Create,
  Search,
  ThreeRecentStudyGroups,
  YourCourses,
} from "./(components)/cards";

export default function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`
                    ${i === 0 && "col-span-1"}
                    ${i === 1 && "col-span-1"}
                    ${i === 2 && "col-span-1"}
                    ${i === 3 && "col-span-2"}
                    ${i === 4 && "col-span-2"}
                    ${i === 5 && "col-span-1"}

                `}
          >
            <div className="flex gap-2 flex-1 flex-col">
              {i === 1 && <Access />}
              {i === 1 && <Create />}
              {i === 2 && <AddCourse />}
            </div>
            {i === 4 && <ThreeRecentStudyGroups />}
            {i === 5 && <Search />}
            {i === 0 && <YourCourses />}
          </div>
        ))}
      </div>
    </>
  );
}
