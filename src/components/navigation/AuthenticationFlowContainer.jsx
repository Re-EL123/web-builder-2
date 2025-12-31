import React from 'react';
import { useLocation } from 'react-router-dom';
import { useWorkflow } from '../../contexts/WorkflowContext';

const AuthenticationFlowContainer = ({ children }) => {
  const location = useLocation();
  const { workflowPhase } = useWorkflow();

  if (workflowPhase !== 'authentication') {
    return children;
  }

  const isLogin = location?.pathname === '/login';
  const isRegister = location?.pathname === '/register';

  if (!isLogin && !isRegister) {
    return children;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-4">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
                fill="var(--color-primary)"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">
            Web Ready Builder
          </h1>
          <p className="text-sm text-muted-foreground">
            {isLogin ? 'Welcome back! Sign in to continue.' : 'Create your account to get started.'}
          </p>
        </div>

        <div className="bg-card rounded-xl shadow-lg p-8">
          {children}
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            © 2025 Web Ready Builder. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationFlowContainer;
