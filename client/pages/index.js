import buildClient from "../api/build-client";


const LandingPage = ({ currentUser }) => {
    // Runs on the Server for the first time just before loading
    console.log(currentUser);
    return (
        <h1>Landing</h1>
    );
};

LandingPage.getInitialProps = async (context) => {
    // console.log(req);
    const client = buildClient(context);

    const { data } = await client.get('/api/users/currentUser');

    return data;
};

export default LandingPage;