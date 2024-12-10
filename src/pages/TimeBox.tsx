import { Layout } from "@/components/Layout";
import { TimeBoxForm } from "@/components/TimeBoxForm";
import { JournalDisplay } from "@/components/JournalDisplay";

const TimeBox = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Time Box</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <JournalDisplay />
          <TimeBoxForm />
        </div>
      </div>
    </Layout>
  );
};

export default TimeBox;