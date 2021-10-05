import { onValue } from 'firebase/database';
import { useEffect, useState } from 'react';

const useList = (ref) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [list, setList] = useState<any>();

    useEffect(() => {
        try {
            onValue(ref, (snapshot) => {
                const data: object | null = snapshot.val();
                setList(data ? Object.values(data) : null);
                setLoading(false);
            });
        } catch (err) {
            setError(err);
            console.error(err, 'error');
        }
    }, []);

    return [loading, error, list];
};

export { useList };
