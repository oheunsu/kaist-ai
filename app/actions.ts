"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function saveFortuneAction(name: string, fortune: string) {
  const { error } = await supabaseAdmin.from("fortunes").insert({ name, fortune });
  if (error) {
    throw error;
  }
}
