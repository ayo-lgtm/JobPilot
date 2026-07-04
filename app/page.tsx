import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: jobs } = await supabase.from("jobs").select();

  return (
    <main>
      <h1>JobPilot</h1>
      <ul>
        {jobs?.map((job) => (
          <li key={job.id}>{job.company} - {job.title}</li>
        ))}
      </ul>
    </main>
  );
}
