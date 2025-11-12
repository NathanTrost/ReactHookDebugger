import "../../styles/hooks.css";
import DebouncedSearch from "./DebouncedSearch";
import EmptyDepsArray from "./EmptyDepsArray";
import MultiDeps from "./MultiDeps";
import NoDeps from "./NoDeps";
import Subscription from "./Subscription";

const UseEffectsCollection = () => {
  return (
    <>
      <DebouncedSearch />
      <EmptyDepsArray />
      <MultiDeps />
      <NoDeps />
      <Subscription />
    </>
  );
};

export default UseEffectsCollection;
