import {useCallback} from 'react';
import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';

import {AccountBookHistory} from '../data/AccountBookHistory';

SQLite.enablePromise(true);

export const useAccountBookHistoryItem = () => {
  const openDB = useCallback<() => Promise<SQLiteDatabase>>(async () => {
    return await SQLite.openDatabase(
      {
        name: 'account_history',
        createFromLocation: '~www/account_history.db',
        location: 'default',
      },
      () => {
        console.log('open success');
      },
      () => {
        console.log('open failure');
      },
    );
  }, []);

  return {
    insertItem: useCallback<
      (item: Omit<AccountBookHistory, 'id'>) => Promise<AccountBookHistory>
    >(
      async item => {
        const db = await openDB();
        const now = new Date().getTime();

        const result = await db.executeSql(
          `INSERT INTO account_history (type, price, comment, date, photo_url, created_at, updated_at) 
            VALUES (
              "${item.type}",
              ${item.price},
              "${item.comment}",
              ${item.date},
              ${item.photoUrl !== null ? `"${item.photoUrl}"` : null},
              ${now},
              ${now}
            )
          `,
        );

        console.log(result);

        return {
          ...item,
          id: result[0].insertId,
        };
      },
      [openDB],
    ),
    getList: useCallback<() => Promise<AccountBookHistory[]>>(async () => {
      const db = await openDB();
      const result = await db.executeSql('SELECT * FROM account_history');
      const items: AccountBookHistory[] = [];
      const size = result[0].rows.length;

      for (let i = 0; i < size; i++) {
        const item = result[0].rows.item(i);
        items.push({
          type: item.type,
          comment: item.comment,
          createdAt: parseInt(item.created_at),
          updatedAt: parseInt(item.updated_at),
          date: parseInt(item.date),
          id: parseInt(item.id),
          photoUrl: item.photo_url,
          price: parseInt(item.price),
        });
      }

      return items.sort((a, b) => a.date - b.date);
    }, [openDB]),
    updateItem: useCallback<
      (item: AccountBookHistory) => Promise<AccountBookHistory>
    >(item => {}, []),
  };
};
