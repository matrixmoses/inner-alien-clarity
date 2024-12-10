import { Layout } from "@/components/Layout";
import { TimeBoxForm } from "@/components/TimeBoxForm";
import { JournalDisplay } from "@/components/JournalDisplay";

const TimeBox = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">Today's Journal Entries</h2>
            <JournalDisplay />
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">Schedule Your Time</h2>
            <TimeBoxForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TimeBox;