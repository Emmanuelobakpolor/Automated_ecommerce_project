import { Layout } from '@/components/Layout/Layout';
import { ArrowRight } from 'lucide-react';

interface PlaceholderProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function Placeholder({ title, description, icon }: PlaceholderProps) {
  return (
    <Layout>
      <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          {icon && <div className="mb-6 text-slate-300 flex justify-center">{icon}</div>}
          <h1 className="text-4xl font-bold text-slate-900 mb-3">{title}</h1>
          <p className="text-slate-600 mb-8">{description}</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-slate-700">
            <p className="font-semibold mb-2">Ready to build this page?</p>
            <p className="text-slate-600 mb-3">
              This page is a placeholder. Continue prompting to fill in the page contents you'd like.
            </p>
            <p className="flex items-center justify-center gap-2 text-blue-600 font-medium">
              Tell me what you'd like here <ArrowRight size={16} />
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
