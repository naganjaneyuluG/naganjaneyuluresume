
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type AuthContextType = {
  session: Session | null;
  user: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  console.log("AuthProvider initializing");
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AuthProvider useEffect running");
    
    // Check for session on initial load
    const getSession = async () => {
      console.log("Checking for existing session");
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error getting session:", error);
          throw error;
        }
        
        console.log("Session data received:", data.session ? "Session exists" : "No session");
        setSession(data.session);
        setUser(data.session?.user ?? null);
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        console.log("Setting loading to false");
        setLoading(false);
      }
    };

    getSession();

    // Listen for auth changes
    console.log("Setting up auth state change listener");
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      console.log("Unsubscribing from auth listener");
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    console.log("Signing out user");
    try {
      await supabase.auth.signOut();
      console.log("Sign out successful");
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out");
    }
  };

  console.log("AuthProvider rendering, loading state:", loading);
  
  return (
    <AuthContext.Provider value={{ session, user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
