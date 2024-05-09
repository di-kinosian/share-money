import { child, get, onValue, Query, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { database } from '.';

export const useList = <T>(ref: Query) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [list, setList] = useState<T[] | null>();

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
  }, [ref]);

  return { list, loading, error };
};

export const useKeysList = (ref: Query) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [list, setList] = useState<string[] | null>();

  useEffect(() => {
    try {
      onValue(ref, (snapshot) => {
        const data: object | null = snapshot.val();
        setList(data ? Object.keys(data) : null);
        setLoading(false);
      });
    } catch (err) {
      setError(err);
      console.error(err, 'error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { list, loading, error };
};

export const useValue = <T>(ref: Query) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [value, setValue] = useState<T | null>();

  useEffect(() => {
    try {
      onValue(ref, (snapshot) => {
        const data: T | null = snapshot.val();
        setValue(data);
        setLoading(false);
      });
    } catch (err) {
      setError(err);
      console.error(err, 'error');
    }
  }, [ref]);

  return { value, loading, error };
};

export const useMultipleValues = <T>(
  parentPath: string,
  keys: string[],
  childKey?: string
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [list, setList] = useState<T[] | null>(null);

  useEffect(() => {
    try {
      if (!keys?.length) {
        setLoading(false);
      } else {
        setLoading(true);

        Promise.all(
          keys.map((key) =>
            get(child(ref(database), parentPath + key + childKey))
          )
        ).then((snapshots) => {
          const res = [];
          snapshots.forEach((snapshot) => res.push(snapshot.val()));
          setList(res);
          setLoading(false);
        });
      }
    } catch (err) {
      setError(err);
      setLoading(false);
      console.error(err, 'error');
    }
  }, [childKey, keys, parentPath]);

  return { list, loading, error };
};
