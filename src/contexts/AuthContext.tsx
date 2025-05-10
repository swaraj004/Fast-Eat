
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string, userType: 'customer' | 'seller') => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, userType: 'customer' | 'seller') => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  userType: 'customer' | 'seller' | null;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: true,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
  userType: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState<'customer' | 'seller' | null>(null);

  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true);
      
      // Check for existing session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (session) {
        setSession(session);
        setUser(session.user);
        
        // Get user type from user metadata
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', session.user.id)
          .single();
          
        if (profile) {
          setUserType(profile.user_type as 'customer' | 'seller');
        }
      }
      
      setIsLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('user_type')
            .eq('id', session.user.id)
            .single();
            
          if (profile) {
            setUserType(profile.user_type as 'customer' | 'seller');
          }
        } else {
          setUserType(null);
        }
        
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, userType: 'customer' | 'seller') => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (data.user && !error) {
      // Insert into profiles table with user type
      await supabase
        .from('profiles')
        .insert([{ 
          id: data.user.id, 
          email: email,
          user_type: userType,
          created_at: new Date().toISOString()
        }]);
        
      setUserType(userType);
    }
    
    return { error };
  };

  const signIn = async (email: string, password: string, userType: 'customer' | 'seller') => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (data?.user && !error) {
      // If signing in successfully, update the user type in context
      const { data: profile } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', data.user.id)
        .single();
      
      if (profile) {
        setUserType(profile.user_type as 'customer' | 'seller');
      }
    }
    
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserType(null);
  };

  const value = {
    session,
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    userType,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
