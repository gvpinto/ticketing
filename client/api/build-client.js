import axios from "axios";

const buildClient = ({ req }) => {
    if (typeof window === 'undefined') {
        // On the Server
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });
    } else {
        // On the browser
        return axios.create({
            baseURL: '/'
        });
    }

};

export default buildClient;