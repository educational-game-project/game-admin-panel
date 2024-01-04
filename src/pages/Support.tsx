import { useEffect } from "react";
import { Headphones } from "lucide-react";
import { useBreadcrumbs } from "../hook/breadcrumbHooks";
import Breadcrumbs from "../components/Breadcrumbs";

function Support() {
  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([
      {
        icon: <Headphones size={16} className="mr-1.5" />,
        label: "Support",
        path: "/support",
      },
    ]);
  }, [setBreadcrumbs]);
  return (
    <div className="">
      <div className="mb-6">
        <Breadcrumbs />
        <h5 className="font-semibold text-3xl mb-1.5">Support</h5>
        <p className="text-gray-500">
          Hubungi kami untuk bantuan lebih lanjut.
        </p>
      </div>
      <div className="h-[1500px] bg-white p-5 rounded-xl"></div>
    </div>
  );
}

export default Support;
