import React from 'react';
        import Icon from '../../../components/AppIcon';

        const RegistrationSteps = ({ steps, currentStep }) => {
          return (
            <div className="mb-8">
              <div className="flex justify-between items-center">
                {steps?.map((step, index) => (
                  <React.Fragment key={step?.number}>
                    <div className="flex flex-col items-center">
                      <div 
                        className={`
                          flex items-center justify-center w-10 h-10 rounded-full border-2 mb-2
                          ${currentStep >= step?.number 
                            ? 'bg-primary border-primary text-primary-foreground' 
                            : 'border-border text-muted-foreground'
                          }
                        `}
                      >
                        {currentStep > step?.number ? (
                          <Icon name="Check" size={16} />
                        ) : (
                          <span className="text-sm font-medium">{step?.number}</span>
                        )}
                      </div>
                      <div className="text-center">
                        <p className={`text-xs font-medium ${
                          currentStep >= step?.number ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {step?.title}
                        </p>
                        <p className="text-xs text-muted-foreground hidden sm:block">
                          {step?.description}
                        </p>
                      </div>
                    </div>
                    
                    {index < steps?.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-4 ${
                        currentStep > step?.number ? 'bg-primary' : 'bg-border'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          );
        };

        export default RegistrationSteps;