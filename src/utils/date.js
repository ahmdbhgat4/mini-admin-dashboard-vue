const loaders = {
    en: () => import('date-fns/locale/en-US'),
    ar: () => import('date-fns/locale/ar'),
};

export const importDateLocaleModules = async () => {
    let result = {};
    for (let i = 0; i < Object.keys(loaders).length; i++) {
        const key = Object.keys(loaders)[i];
        const load = loaders[key];
        const locale = load ? (await load()).default : undefined;
        result[key] = locale;
    }

    return result;
};
