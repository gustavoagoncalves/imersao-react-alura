import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://rdikhbyosbxjivmxiihc.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkaWtoYnlvc2J4aml2bXhpaWhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyODQzNDUsImV4cCI6MTk4Mzg2MDM0NX0.r_FOX_n0_ErhLtVFOAZKs6X8RWnVHWlBzNZ1805gUOo";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("videos")
            .select("*");
        }
    }
}