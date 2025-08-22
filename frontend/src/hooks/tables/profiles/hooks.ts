import { useMutation, useQuery } from "@tanstack/react-query";
import { profilesTable } from "../../../constants";
import Supabase from "../../../lib/supabase";
import { ProfileSchema, type ProfileAttrT } from "./schema";
import { genericMutationResultFn } from "../../utils";

export const getProfile = async (userId: string) => {
  const { data, error } = await Supabase.from(profilesTable)
    .select("*")
    .eq("id", userId);

  if (error) throw new Error(error.message);

  if (!data) return null;

  return ProfileSchema.parse(data);
};

export const useGetProfile = (userId?: string) =>
  useQuery({
    queryKey: [profilesTable, userId],
    queryFn: () => getProfile(userId!),
    enabled: !!userId,
  });

export const insertProfile = async (profileData: ProfileAttrT) => {
  const { error } = await Supabase.from(profilesTable)
    .insert(profileData)
    .select("*");

  if (error) throw new Error(error.message);
};

export const useInsertProfile = () =>
  useMutation({
    mutationFn: (profileData: ProfileAttrT) => insertProfile(profileData),
    onSuccess: () =>
      genericMutationResultFn.onSuccess({
        queryKeys: [profilesTable],
      }),
  });
