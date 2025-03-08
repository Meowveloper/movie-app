import { useEffect, useState } from "react";

function use_fetch <T>(fetch_func : () => Promise<T>, auto_fetch : boolean = true) {
    const [ data, set_data ] = useState<T | null>(null);
    const [ loading, set_loading ] = useState<boolean>(false);
    const [ error, set_error ] = useState<Error | null>(null);

    useEffect(() => {
        if(auto_fetch) {
            fetch_data();
        }
    }, []);

    return { data, loading, error , refetch : fetch_data, reset };

    async function fetch_data () {
        try {
            set_loading(true);
            set_error(null);
            const result = await fetch_func();
            set_data(result);
        } catch (e) {
            set_error(e instanceof Error ? e : new Error('an error occurred'));
        } finally {
            set_loading(false);
        }
    }

    function reset () {
        set_data(null);
        set_loading(false);
        set_error(null);
    }
}

export default use_fetch;