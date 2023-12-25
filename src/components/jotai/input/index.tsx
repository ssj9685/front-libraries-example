import { titleAtom } from "@/store/filter";
import { useSetAtom } from "jotai";

const JotaiInput = () => {
  const setTitle = useSetAtom(titleAtom);

  return (
    <input
      onChange={(e) => {
        setTitle(e.currentTarget.value);
      }}
    />
  );
};

export default JotaiInput;
