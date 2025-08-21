import { Outlet } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";

import { useEffect, useState } from "react";
import Login from "../pages/login/Login";
import useAppState from "../state";

import Supabase from "../lib/supabase";
import { profilesTable } from "../constants";
import SetNameModal from "../pages/login/SetNameModal";

const PrivateRoute = () => {
  const [userSession, setUserSession] = useState<Session | null>(null);
  const [isSetNameOpen, setIsSetNameOpen] = useState(false);
  const [isCheckingProfile, setIsCheckingProfile] = useState(false);
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

  // CHECK PROFILE
  useEffect(() => {
    const checkProfile = async () => {
      if (!userSession) return;

      setIsCheckingProfile(true);

      const { data: profile, error } = await Supabase.from(profilesTable)
        .select("id, name")
        .eq("id", userSession.user.id)
        .single();

      if (error) {
        console.error("Erreur lors du fetch profil:", error.message);
      }

      if (!profile || !profile.name) {
        setIsSetNameOpen(true);
      } else {
        setUserInfo({
          id: userSession.user.id,
          email: userSession.user.email!,
          name: profile.name,
        });
      }
      setIsCheckingProfile(false);
    };

    checkProfile();
  }, [userSession, setUserInfo]);

  if (!userSession) {
    return <Login />;
  }

  if (isCheckingProfile || !userInfo?.id) {
    return <span>Chargement profil... </span>;
  }

  return (
    <>
      {isSetNameOpen && (
        <SetNameModal isOpen={isSetNameOpen} setIsOpen={setIsSetNameOpen} />
      )}
      <Outlet />
    </>
  );
};

export default PrivateRoute;
