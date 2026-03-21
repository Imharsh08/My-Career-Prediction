import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';

export interface PredictionFormData {
  fullName: string;
  dob: string;
}

interface PredictionFormProps {
  onSubmit: (data: PredictionFormData) => void;
  isLoading: boolean;
}

export function PredictionForm({ onSubmit, isLoading }: PredictionFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<PredictionFormData>();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Discover Your Path</CardTitle>
        <CardDescription>Enter your details to reveal your numerology-based career predictions.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="e.g. John Doe"
              {...register('fullName', { required: 'Full name is required' })}
            />
            {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              {...register('dob', { required: 'Date of birth is required' })}
            />
            {errors.dob && <p className="text-sm text-red-500">{errors.dob.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Calculating...' : 'Predict Career'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
