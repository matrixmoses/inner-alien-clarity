import { Layout } from "@/components/Layout";
import { Journal } from "@/components/Journal";

const Index = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Journal</h1>
        <Journal />
      </div>
    </Layout>
  );
};

export default Index;