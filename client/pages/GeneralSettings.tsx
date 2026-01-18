import { Placeholder } from './Placeholder';
import { Settings } from 'lucide-react';

export default function GeneralSettings() {
  return (
    <Placeholder
      title="General Settings"
      description="Manage your account preferences, business information, and security settings."
      icon={<Settings size={64} />}
    />
  );
}
