import { Placeholder } from './Placeholder';
import { MessageSquare } from 'lucide-react';

export default function BotSettings() {
  return (
    <Placeholder
      title="Bot Settings"
      description="Configure your chatbot's question flow, default replies, and supported platforms."
      icon={<MessageSquare size={64} />}
    />
  );
}
