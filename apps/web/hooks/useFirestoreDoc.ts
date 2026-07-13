"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot, type DocumentData } from "firebase/firestore";
import { db } from "@/firebase/client";

export interface UseFirestoreDocResult<T> {
  data: (T & { id: string }) | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook useFirestoreDoc
 *
 * Écoute un document unique en temps réel.
 *
 * @example
 * const { data: producer } = useFirestoreDoc<Producer>("producers", "abc123");
 */
export function useFirestoreDoc<T extends DocumentData>(
  collectionName: string,
  docId: string | null | undefined
): UseFirestoreDocResult<T> {
  const [data, setData] = useState<(T & { id: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!docId) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const unsubscribe = onSnapshot(
      doc(db, collectionName, docId),
      (snapshot) => {
        if (snapshot.exists()) {
          setData({ id: snapshot.id, ...(snapshot.data() as T) });
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error(`useFirestoreDoc(${collectionName}/${docId}) error:`, err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, docId]);

  return { data, loading, error };
}
