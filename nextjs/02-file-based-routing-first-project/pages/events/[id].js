import { useRouter } from "next/router";

function EventPage() {
  const router = useRouter();

  return (
    <div>
      <h1>The event page for event id {router.query.id}</h1>
    </div>
  );
}

export default EventPage;
