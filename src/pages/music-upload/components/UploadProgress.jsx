import React from 'react';
import Icon from '../../../components/AppIcon';

const UploadProgress = ({ currentStep, steps }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Progresso do Upload</h2>
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            <div className="flex flex-col items-center space-y-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                index < currentStep 
                  ? 'bg-success border-success text-success-foreground' 
                  : index === currentStep
                  ? 'bg-primary border-primary text-primary-foreground'
                  : 'bg-muted border-muted-foreground/30 text-muted-foreground'
              }`}>
                {index < currentStep ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <div className="text-center">
                <div className={`text-sm font-medium ${
                  index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </div>
                <div className="text-xs text-muted-foreground hidden sm:block">
                  {step?.description}
                </div>
              </div>
            </div>
            
            {index < steps?.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 transition-all duration-200 ${
                index < currentStep ? 'bg-success' : 'bg-muted'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default UploadProgress;