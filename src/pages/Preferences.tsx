import { useEffect } from "react";
import { useBreadcrumbs } from "../context/BreadcrumbsContext";
import Breadcrumbs from "../components/Breadcrumbs";
import { Settings } from "lucide-react";

function Preferences() {
  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([
      {
        icon: <Settings size={16} className="mr-1.5" />,
        label: "Preferences",
        path: "/preferences",
      },
    ]);
  }, [setBreadcrumbs]);
  return (
    <div className="">
      <div className="mb-6">
        <Breadcrumbs />
        <h5 className="font-semibold text-3xl mb-1.5">Preferences</h5>
        <p className="text-gray-500">Lihat dan ubah preferensi pengguna.</p>
      </div>
      <div className="h-[1500px] bg-white p-5 rounded-xl"></div>
    </div>
  );
}

export default Preferences;
