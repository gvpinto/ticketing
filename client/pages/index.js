import axios from "axios";


const LandingPage = ({ currentUser }) => {
    // Runs on the Server for the first time just before loading
    console.log(currentUser);
    return (
        <h1>Landing</h1>
    );
};

LandingPage.getInitialProps = async ({ req }) => {
    // console.log(req);
    if (typeof window === 'undefined') {
        // On the server
        const { data } = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentUser', {
            headers: req.headers
        });
        return data;
    } else {
        // On the browser
        const { data } = await axios.get('/api/users/currentUser');
        return data;
    }
};

export default LandingPage;