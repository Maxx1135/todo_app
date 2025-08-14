import { Outlet } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";

import { useEffect, useState } from "react";
import Login from "../pages/login/Login";
import useAppState from "../state";

import Supabase from "../lib/supabase";

const PrivateRoute = () => {
  const [userSession, setUserSession] = useState<Session | null>(null);
  const setUserInfo = useAppState((state) => state.setUserInfo);
  const resetState = useAppState((state) => state.resetState);
  const [isLoading, setIsLoading] = useState(true);

  // AUTHENTICATION
  useEffect(() => {
    Supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUserSession(session);
      if (session) {
        setUserInfo({
          id: session.user.id,
          email: session.user.email!,
        });
      } else {
        resetState();
      }
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = Supabase.auth.onAuthStateChange((_event, session) => {
      setUserSession(session);
      if (session) {
        setUserInfo({
          id: session.user.id,
          email: session.user.email || "",
        });
      } else {
        resetState();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUserInfo, resetState]);

  if (isLoading) {
    return <span>Chargement utilisateur...</span>;
  }

  if (!userSession) {
    return <Login redirect={false} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
