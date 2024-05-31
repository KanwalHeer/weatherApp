import { PuffLoader } from "react-spinners";

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <PuffLoader color="#36d7b7" />
    </div>
  );
};

export default Spinner;
