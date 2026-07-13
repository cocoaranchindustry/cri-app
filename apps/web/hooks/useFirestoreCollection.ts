"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  type QueryConstraint,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/firebase/client";

export interface UseFirestoreCollectionResult<T> {
  data: (T & { id: string })[];
  loading: boolean;
  error: Error | null;
}

/**
 * Hook useFirestoreCollection
 *
 * Écoute une collection Firestore en temps réel.
 * Les contraintes (where, orderBy, limit) sont passées en paramètres.
 *
 * @example
 * const { data, loading } = useFirestoreCollection<Producer>(
 *   "producers",
 *   [where("village", "==", "Bouba"), orderBy("createdAt", "desc"), limit(50)]
 * );
 */
export function useFirestoreCollection<T extends DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): UseFirestoreCollectionResult<T> {
  const [data, setData] = useState<(T & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const q = query(collection(db, collectionName), ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as T),
        }));
        setData(items);
        setLoading(false);
      },
      (err) => {
        console.error(`useFirestoreCollection(${collectionName}) error:`, err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName, JSON.stringify(constraints)]);

  return { data, loading, error };
}

// Re-exports utiles
export { where, orderBy, limit };
