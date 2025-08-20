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
  const userInfo = useAppState((state) => state.userInfo);

  // AUTHENTICATION
  useEffect(() => {
    Supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUserSession(session);
      if (session) {
        setUserInfo({
          id: session.user.id,
          email: session.user.email!,
        });
      }
    });

    const {
      data: { subscription },
    } = Supabase.auth.onAuthStateChange((_event, session) => {
      setUserSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUserInfo, resetState]);

  if (!userSession) {
    return <Login />;
  }

  if (!userInfo?.id) {
    return <span>Chargement profil... </span>;
  }

  return <Outlet />;
};

export default PrivateRoute;
