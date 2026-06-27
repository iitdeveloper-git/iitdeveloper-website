import { redirect } from 'next/navigation';

// Redirect /projects to /case-studies (merged pages)
export default function ProjectsPage() {
  redirect('/case-studies');
}
