import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useWorkflow } from '../../contexts/WorkflowContext';
import AuthenticationFlowContainer from '../../components/navigation/AuthenticationFlowContainer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';

const Login = () => {
  const navigate = useNavigate();
  const { authenticate } = useWorkflow();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  const mockCredentials = {
    email: 'demo@webreadybuilder.com',
    password: 'Demo@2025'
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    if (authError) {
      setAuthError('');
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({
      ...prev,
      rememberMe: e?.target?.checked
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setAuthError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      if (
        formData?.email === mockCredentials?.email &&
        formData?.password === mockCredentials?.password
      ) {
        authenticate(true);
        navigate('/dashboard');
      } else {
        setAuthError('Invalid email or password. Please use demo@webreadybuilder.com / Demo@2025');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      authenticate(true);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <AuthenticationFlowContainer>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
            Sign in to your account
          </h2>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your projects
          </p>
        </div>

        {authError && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-4 flex items-start gap-3">
            <Icon name="AlertCircle" size={20} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-error font-medium">
                {authError}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            disabled={isLoading}
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              value={formData?.password}
              onChange={handleInputChange}
              error={errors?.password}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground transition-smooth"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              disabled={isLoading}
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            checked={formData?.rememberMe}
            onChange={handleCheckboxChange}
            disabled={isLoading}
          />
          
          <Link
            to="/register"
            className="text-sm text-primary hover:text-primary/80 transition-smooth font-medium"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        >
          Sign In
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-card px-3 text-muted-foreground font-caption">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
            className="flex items-center justify-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-sm">Google</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('github')}
            disabled={isLoading}
            className="flex items-center justify-center gap-2"
          >
            <Icon name="Github" size={18} />
            <span className="text-sm">GitHub</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('microsoft')}
            disabled={isLoading}
            className="flex items-center justify-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M11.4 11.4H2V2h9.4v9.4zM22 11.4h-9.4V2H22v9.4zM11.4 22H2v-9.4h9.4V22zm10.6 0h-9.4v-9.4H22V22z" fill="currentColor"/>
            </svg>
            <span className="text-sm">Microsoft</span>
          </Button>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-sm text-center text-muted-foreground">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-primary hover:text-primary/80 transition-smooth font-medium"
            >
              Create account
            </Link>
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 pt-2">
          <Icon name="Shield" size={16} color="var(--color-success)" />
          <p className="text-xs text-muted-foreground">
            Secured with 256-bit SSL encryption
          </p>
        </div>
      </form>
    </AuthenticationFlowContainer>
  );
};

export default Login;
