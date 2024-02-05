import { Loader2Icon } from 'lucide-react';

export default function RoundedLoader() {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-100/20">
      <div className="p-14 bg-white flex items-center justify-center shadow rounded-2xl">
        <span className="translate-y-px">
          <Loader2Icon
            size={40}
            className="mr-1.5 animate-spin-fast"
          />
        </span>
      </div>
    </div>
  );
}
