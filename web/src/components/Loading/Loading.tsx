import { Spinner } from "./Spinner";

interface LoadingProps {
  label: string;
}

export function Loading({ label }: LoadingProps) {
  return (
    <div className="flex items-center text-lg">
      <Spinner />
      {label}
    </div>
  );
}
