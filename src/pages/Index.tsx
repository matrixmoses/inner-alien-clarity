import { Layout } from "@/components/Layout";
import { Journal } from "@/components/Journal";
import { TimeBoxContainer } from "@/components/TimeBoxContainer";

const Index = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Journal</h1>
            <Journal />
          </div>
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">TimeBox</h1>
            <TimeBoxContainer />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;