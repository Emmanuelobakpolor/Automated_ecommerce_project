import { Placeholder } from './Placeholder';
import { CreditCard } from 'lucide-react';

export default function PaymentSettings() {
  return (
    <Placeholder
      title="Payment Settings"
      description="Configure your Paystack API keys and payment preferences. View test status and transaction history."
      icon={<CreditCard size={64} />}
    />
  );
}
