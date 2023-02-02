import { useRouter } from "next/router";

function ClientProjectsPage() {
  const router = useRouter();

  function loadProjectHanlder () {
    router.push({
      pathname: '/clients/[id]/[clientprojectid]',
      query: {
        id: 'max',
        clientprojectid: 'projecta'
      }
    });
  }
  
  return (
    <div>
      <h1>The projects of a given client</h1>
      <button onClick={loadProjectHanlder}>Load Project A</button>
    </div>
  );
}

export default ClientProjectsPage;
