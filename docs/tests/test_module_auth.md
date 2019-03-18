# tests.test_module_auth

This module tests [`db`](db.md) functions.

> Results in [`test_db_report`](test_db_report.html).

Two records in the `user` table are dedicated for testing.

| id_user | email            | username | password   |
|---------|------------------|----------|------------|
| 1       | test@example.com | test     | `password` |
| 2       |                  |          |            |

1. Fake user that to practive quering information.
2. Blank `id_user` to test creating and deleting users.

## test_check_email_pos
```python
test_check_email_pos(db)
```

Check for existing user by email.
Expect `id_user` to be returned as int.

## test_check_email_neg
```python
test_check_email_neg(db)
```

Check for NON-exisitng user.
Expect `False` returned as bool.

## test_check_id_user_pos
```python
test_check_id_user_pos(db)
```

Check for existing user by id_user.
Expect `email` returned as string

## test_check_id_user_neg
```python
test_check_id_user_neg(db)
```

Check for non-existing user by id_user.
Expect `False` returned as boolean

## test_check_user_credentials_pos
```python
test_check_user_credentials_pos(db)
```

Check user credentials.
Expect `id_user` returned as int.

## test_check_user_credentials_wrong_email
```python
test_check_user_credentials_wrong_email(db)
```

Check user credentials -- wrong email.
Expect to raise `Exception('email does not exist')`.

## test_check_user_credentials_wrong_password
```python
test_check_user_credentials_wrong_password(db)
```

Check user credentials -- wrong password.
Expect to raise `Exception('wrong password')`.

## test_create_user_pos
```python
test_create_user_pos(db)
```

Successfully create user with fake credentials.
Expect user `id` to be returned as int.

## test_create_user_neg
```python
test_create_user_neg(db)
```

Fail to create user with existing credentials.
Expect result of `False` indicating user has not been created.

## test_delete_user_pos
```python
test_delete_user_pos(db)
```

Successfully delete user created by `test_create_user_pos()`
Expect `True` indicating user has been deleted.

## test_delete_user_neg
```python
test_delete_user_neg(db)
```

Fail to delete non-existing user.
Expect `False` indicating user has not been deleted.

## test_get_user_info
```python
test_get_user_info(db)
```

Get user information from db.
Expect `dict` of user info.

