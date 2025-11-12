import "../../styles/hooks.css";
import ExpensiveCalculation from "./ExpensiveCalculation";
import FilteredArray from "./FilteredArray";
import StatsCalculation from "./StatsCalculation";

const UseMemoCollection = () => {
  return (
    <>
      <ExpensiveCalculation />
      <FilteredArray />
      <StatsCalculation />
    </>
  );
};

export default UseMemoCollection;
