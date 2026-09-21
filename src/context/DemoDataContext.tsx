import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { DEFAULT_DEMO_DATA } from '../data/mock';
import { getStoredValue, setStoredValue } from '../services/storage';
import { DemoBankData } from '../types/demo';

const DEMO_DATA_KEY = 'bank-demo-data';

interface DemoDataContextValue {
  data: DemoBankData;
  isLoading: boolean;
  updateDemoData: (changes: Partial<DemoBankData>) => void;
  toggleCardStatus: () => void;
}

const DemoDataContext = createContext<DemoDataContextValue | undefined>(undefined);

export function DemoDataProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<DemoBankData>(DEFAULT_DEMO_DATA);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function restoreDemoData() {
      const savedData = await getStoredValue<DemoBankData>(DEMO_DATA_KEY, DEFAULT_DEMO_DATA);
      if (isMounted) {
        setData({ ...DEFAULT_DEMO_DATA, ...savedData });
        setIsLoading(false);
      }
    }

    void restoreDemoData();

    return () => {
      isMounted = false;
    };
  }, []);

  const persistData = useCallback((nextValue: DemoBankData) => {
    setData(nextValue);
    void setStoredValue(DEMO_DATA_KEY, nextValue);
  }, []);

  const updateDemoData = useCallback(
    (changes: Partial<DemoBankData>) => {
      persistData({
        ...data,
        ...changes,
      });
    },
    [data, persistData],
  );

  const toggleCardStatus = useCallback(() => {
    persistData({
      ...data,
      cardStatus: data.cardStatus === 'Activa' ? 'Bloqueada' : 'Activa',
    });
  }, [data, persistData]);

  const value = useMemo(
    () => ({
      data,
      isLoading,
      updateDemoData,
      toggleCardStatus,
    }),
    [data, isLoading, toggleCardStatus, updateDemoData],
  );

  return <DemoDataContext.Provider value={value}>{children}</DemoDataContext.Provider>;
}

export function useDemoData() {
  const context = useContext(DemoDataContext);

  if (!context) {
    throw new Error('useDemoData must be used within DemoDataProvider');
  }

  return context;
}
