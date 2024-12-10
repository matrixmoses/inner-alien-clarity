import { Layout } from "@/components/Layout";
import { Journal } from "@/components/Journal";
import { TimeBox } from "@/components/TimeBox";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <TimeBox />
        <Journal />
      </div>
    </Layout>
  );
};

export default Index;