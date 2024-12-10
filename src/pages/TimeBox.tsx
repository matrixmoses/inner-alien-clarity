import { Layout } from "@/components/Layout";
import { TimeBoxForm } from "@/components/TimeBoxForm";
import { JournalDisplay } from "@/components/JournalDisplay";

const TimeBox = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <div className="bg-[#F3F0FF] p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-6">Today's Journal Entries</h2>
              <JournalDisplay />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold mb-6">Schedule Your Time</h2>
              <TimeBoxForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TimeBox;