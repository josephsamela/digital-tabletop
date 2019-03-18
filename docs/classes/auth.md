# module.auth

This module contains functions to access the user.

> Tested by ['test_module_db'](test_module_db.md).


## auth
```python
auth(self)
```

### check_email
```python
auth.check_email(self, email)
```

Check if email exists in db.

Args:
    email: User email as str (ie. `test@example.com`)

Returns:
    User `id_user` as int (ie. `1`) if successful. `False` otherwise.

### check_id_user
```python
auth.check_id_user(self, id_user)
```

Check if id_user exists in db.

Args:
    id_user: User id_user as int (ie. `1`)

Returns:
    User `email` as str (ie. `test@example.com`) if successful. `False` otherwise.

### check_user_credentials
```python
auth.check_user_credentials(self, email, password)
```

Check user credentials against db.

Args:
    email: Email as str (ie. `test@example.com`)
    password: Password in plaintext as str (ie. `password`)

Returns:
    `id_user` if success, `False` otherwise.

Raises:
    ``

### create_user
```python
auth.create_user(self, email, username, password, **kwargs)
```

Create new user in db.

Args:
    email: Email as str (ie. `test@example.com`)
    username: Username as str (ie. `test`)
    password: Password in plaintext as str (ie. `password`)
    **id_user: ID of created user as int (ie. `2`)

Returns:
    id_user as int if successuful. `False` otherwise.

### delete_user
```python
auth.delete_user(self, id_user)
```

Delete user from db.

Args:
    id_user: ID of created user as int (ie. `2`)

Returns:
    `True` if successuful. `False` otherwise.

### get_user_info
```python
auth.get_user_info(self, id_user)
```

Get user information from db.

Args:
    id_user: ID of created user as int (ie. `2`)

Returns:
    `dict` with user information if successuful. `False` otherwise.

