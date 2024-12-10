import { Layout } from "@/components/Layout";
import { TimeBoxForm } from "@/components/TimeBoxForm";
import { JournalDisplay } from "@/components/JournalDisplay";

const TimeBox = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#F3F0FF] p-6 rounded-lg">
            <JournalDisplay />
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-3xl font-bold mb-8">Time Boxing</h1>
            <TimeBoxForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TimeBox;