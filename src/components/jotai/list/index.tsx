import { titleAtom } from "@/store/filter";
import { useAtomValue } from "jotai";

const List = () => {
  const title = useAtomValue(titleAtom);

  return <div>{title}</div>;
};

export default List;
