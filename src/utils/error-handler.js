import { useToast } from '@erag/vue-toastification';
import i18n from '@/utils/i18n';

export default function (err, instance, info) {
    // info :string = 'native event handler', 'watcher callback', 'mounted hook'
    const toast = useToast(); // [status](message: string, title?: string, duration?: number, position?: ToastPosition)
    const { t } = i18n.global;
    console.log({ err }, info);

    let message = ''; // :string

    if (typeof err === 'object') {
        const { name, message: msg, code, details, hint } = err;
        message = msg;
    } else {
        message = err;
    }

    if (!message.includes('AbortError')) {
        toast.error(message, t('error'));
    }
}
