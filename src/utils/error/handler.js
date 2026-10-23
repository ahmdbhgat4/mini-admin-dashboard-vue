import { useToast } from 'vue-toastification';

export default function (err, instance, info) {
    // info = 'native event handler' | 'watcher callback' | 'mounted hook'
    const toast = useToast();
    toast.clear();
    console.log({ err }, info);

    let message = ''; // :string

    if (typeof err === 'object') {
        const { name, message: msg, code, details, hint } = err;
        message = msg;
    } else {
        message = err;
    }
    toast.error(message);

    if (!message.includes('AbortError')) {
        console.log(message);
    }
}
