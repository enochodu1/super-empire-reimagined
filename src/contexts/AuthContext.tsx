import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, db } from '@/lib/supabase';
import { toast } from 'sonner';

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  business_name: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  role: 'customer' | 'admin';
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: any) => Promise<{ error: any }>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // DEMO MODE: Provide demo user automatically
    const demoUser = {
      id: 'demo-user-123',
      email: 'demo@superempire.com',
      aud: 'authenticated',
      role: 'authenticated',
      created_at: new Date().toISOString(),
      app_metadata: {},
      user_metadata: {},
    } as User;

    const demoProfile: Profile = {
      id: 'demo-user-123',
      email: 'demo@superempire.com',
      full_name: 'Demo User',
      business_name: 'Super Empire Demo Account',
      phone: '(555) 123-4567',
      address: '123 Produce Lane',
      city: 'Dallas',
      state: 'TX',
      zip: '75001',
      role: 'admin', // Give demo user admin access
    };

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
        setUser(session.user);
        loadProfile(session.user.id);
      } else {
        // No real session, use demo data
        setUser(demoUser);
        setProfile(demoProfile);
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        setSession(session);
        setUser(session.user);
        await loadProfile(session.user.id);
      } else {
        // No session, fallback to demo
        setUser(demoUser);
        setProfile(demoProfile);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (userId: string) => {
    const { data, error } = await db.getProfile(userId);
    if (error) {
      console.error('Error loading profile:', error);
      // If profile doesn't exist, create one
      if (error.code === 'PGRST116') {
        await createProfile(userId);
      }
    } else {
      setProfile(data as Profile);
    }
    setLoading(false);
  };

  const createProfile = async (userId: string) => {
    const user = await db.getCurrentUser();
    if (user.user) {
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          email: user.user.email || '',
          role: 'customer',
        })
        .select()
        .single();

      if (!error && data) {
        setProfile(data as Profile);
      }
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    const { data, error } = await db.signUp(email, password, userData);

    if (error) {
      toast.error(error.message);
      return { error };
    }

    if (data.user) {
      // Create profile
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        email: email,
        full_name: userData.full_name || null,
        business_name: userData.business_name || null,
        phone: userData.phone || null,
        role: 'customer',
      });

      if (profileError) {
        console.error('Error creating profile:', profileError);
      }

      toast.success('Account created successfully! Please check your email to verify your account.');
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await db.signIn(email, password);

    if (error) {
      toast.error(error.message);
      return { error };
    }

    toast.success('Welcome back!');
    return { error };
  };

  const signOut = async () => {
    const { error } = await db.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Signed out successfully');
    }
  };

  const updateProfile = async (updates: any) => {
    if (!user) {
      return { error: new Error('No user logged in') };
    }

    const { data, error } = await db.updateProfile(user.id, updates);

    if (error) {
      toast.error(error.message);
      return { error };
    }

    setProfile(data as Profile);
    toast.success('Profile updated successfully');
    return { error: null };
  };

  const isAdmin = profile?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        signUp,
        signIn,
        signOut,
        updateProfile,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
