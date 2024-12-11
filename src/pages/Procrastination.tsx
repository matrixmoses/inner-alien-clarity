import { Layout } from "@/components/Layout";

const Procrastination = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Procrastination Insights</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Content will be added here in future updates */}
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">
              Your procrastination insights and patterns will be displayed here.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Procrastination;