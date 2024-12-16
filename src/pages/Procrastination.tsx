import { Layout } from "@/components/Layout";
import { MetricsSection } from "@/components/procrastination/MetricsSection";

const Procrastination = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <MetricsSection />
      </div>
    </Layout>
  );
};

export default Procrastination;