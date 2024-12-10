import { Layout } from "@/components/Layout";
import { TimeBoxContainer } from "@/components/TimeBoxContainer";

const TimeBox = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">TimeBox</h1>
        <TimeBoxContainer />
      </div>
    </Layout>
  );
};

export default TimeBox;