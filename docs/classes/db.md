# module.db

This module contains functions to access the database.

> Tested by ['test_db'](test_db.md).


## db
```python
db(self)
```

### connect
```python
db.connect(self)
```
Create a database connection to the SQLite database

Args:
    db_file: path to database file.

Returns:
    connected `sqlite3` handle for success, `None` otherwise.

