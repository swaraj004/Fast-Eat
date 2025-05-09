
import { Check, Clock, PackageCheck, Package, Home } from 'lucide-react';

export type OrderStatus = 'placed' | 'confirmed' | 'preparing' | 'outForDelivery' | 'delivered';

interface OrderTrackerProps {
  currentStatus: OrderStatus;
  estimatedDelivery: string;
}

export function OrderTracker({ currentStatus, estimatedDelivery }: OrderTrackerProps) {
  const steps = [
    { id: 'placed', label: 'Order Placed', icon: Check },
    { id: 'confirmed', label: 'Order Confirmed', icon: Check },
    { id: 'preparing', label: 'Preparing', icon: Clock },
    { id: 'outForDelivery', label: 'Out For Delivery', icon: Package },
    { id: 'delivered', label: 'Delivered', icon: Home },
  ];
  
  const currentStep = steps.findIndex(step => step.id === currentStatus);
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="font-semibold text-xl mb-1">Order Status</h2>
      <p className="text-muted-foreground text-sm mb-6">
        Estimated delivery by {estimatedDelivery}
      </p>
      
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
        
        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => {
            const isActive = index <= currentStep;
            const Icon = step.icon;
            return (
              <div key={step.id} className="relative flex items-center">
                <div className={`z-10 flex items-center justify-center w-8 h-8 rounded-full 
                  ${isActive 
                    ? 'bg-brand text-white' 
                    : 'bg-gray-100 text-gray-400'}`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="ml-4">
                  <h3 className={`font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {step.label}
                  </h3>
                  {currentStatus === step.id && (
                    <p className="text-sm text-brand mt-0.5">Current status</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
