'''
This module contains functions to access the database.

> Tested by ['test_db'](test_db.md).

'''

import sqlite3

class db():
    def __init__(self):
        self.db_file = 'db.sqlite'

    def connect(self):
        ''' Create a database connection to the SQLite database
        
        Args:
            db_file: path to database file.

        Returns:
            connected `sqlite3` handle for success, `None` otherwise.
        '''
        try:
            conn = sqlite3.connect(self.db_file)
            return conn
        except Exception as e:
            print(e)
        return None

