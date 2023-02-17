import taskFormPage from "../new";

export const getServerSideProps = async (ctx) => {
    const res = await fetch('http://localhost:3000/api/users');
    const users = await res.json();
  
    return {
      props: {
        users,
      },
    };
  }

export default taskFormPage