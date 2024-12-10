import { Layout } from "@/components/Layout";
import { SettingsContainer } from "@/components/settings/SettingsContainer";

const Settings = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        <SettingsContainer />
      </div>
    </Layout>
  );
};

export default Settings;