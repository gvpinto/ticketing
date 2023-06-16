import axios from "axios";

const LandingPage = ({ currentUser }) => {
    console.log(currentUser);
    return (
        <h1>Landing</h1>
    );
};

LandingPage.getInitialProps = async () => {
    if (typeof window === 'undefined') {
        // On the server
        const { data } = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentUser', {
            headers: {
                Host: 'ticketing.dev'
            }
        });
        return data;
    } else {
        // On the browser
        const { data } = await axios.get('/api/users/currentUser');
        return data;
    }
    return {};
};

export default LandingPage;