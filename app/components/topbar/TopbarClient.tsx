"use client";

const TopbarClient = ({ data }: any) => {

  const topbar = data?.[0];
  console.log("Data is --> ", topbar)

  return (
    <div className="w-full flex fixed top-0 bg-primary text-sm z-50">
      <div className="container flex justify-between items-center py-2">

        {/* LEFT SIDE */}
        {/* <div className="flex gap-4">
          {topbar?.contactDetails?.map((item: any) => (
            <div key={item._id} className="flex gap-2">
              <span className="text-white font-medium">
                {item.contctType}:
              </span>

              <Link
                href={item.contactUrl}
                className="text-white hover:underline"
              >
                {item.contactUrl}
              </Link>
            </div>
          ))}
        </div> */}

        {/* RIGHT SIDE */}
        {/* <div className="flex gap-3">
          {topbar?.socialMedia?.map((item: any, index: number) => (
            <Link
              key={index}
              href={item.socialMediaUrl}
              target="_blank"
              className="text-white hover:scale-110 transition"
            >
              {item.socialMediaType}
            </Link>
          ))}
        </div> */}

      </div>
    </div>
  );
};

export default TopbarClient;