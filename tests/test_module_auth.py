'''
This module tests [`db`](db.md) functions.

> Results in [`test_db_report`](test_db_report.html).

Two records in the `user` table are dedicated for testing.

| id_user | email            | username | password   |
|---------|------------------|----------|------------|
| 1       | test@example.com | test     | `password` |
| 2       |                  |          |            |

1. Fake user that to practive quering information.
2. Blank `id_user` to test creating and deleting users.
'''

import pytest
from module.auth import auth

@pytest.fixture()
def db():
    return auth()

def test_check_email_pos(db):
    '''
    Check for existing user by email.
    Expect `id_user` to be returned as int.
    '''
    assert db.check_email('test@example.com') is 1

def test_check_email_neg(db):
    '''
    Check for NON-exisitng user.
    Expect `False` returned as bool.
    '''
    assert db.check_email('non_existing_user@example.com') is False

def test_check_id_user_pos(db):
    '''
    Check for existing user by id_user.
    Expect `email` returned as string
    '''
    assert '@' in db.check_id_user(1)

def test_check_id_user_neg(db):
    '''
    Check for non-existing user by id_user.
    Expect `False` returned as boolean
    '''
    assert db.check_id_user(2) is False

def test_check_user_credentials_pos(db):
    '''
    Check user credentials.
    Expect `id_user` returned as int.
    '''
    assert db.check_user_credentials('test@example.com','password') is 1

def test_check_user_credentials_wrong_email(db):
    '''
    Check user credentials -- wrong email.
    Expect to raise `Exception('email does not exist')`.
    '''
    try:
        db.check_user_credentials('fakeuser@example.com','password')
    except Exception:
        assert True

def test_check_user_credentials_wrong_password(db):
    '''
    Check user credentials -- wrong password.
    Expect to raise `Exception('wrong password')`.
    '''
    try:
       db.check_user_credentials('test@example.com','wrongpassword')
    except Exception:
        assert True

def test_create_user_pos(db):
    '''
    Successfully create user with fake credentials. 
    Expect user `id` to be returned as int.
    '''
    assert db.create_user('fakeuser@example.com', 'fakeuser', 'password', id_user=2) is 2

def test_create_user_neg(db):
    '''
    Fail to create user with existing credentials. 
    Expect result of `False` indicating user has not been created.
    '''
    assert db.create_user('fakeuser@example.com', 'fakeuser', 'password') is False

def test_delete_user_pos(db):
    '''
    Successfully delete user created by `test_create_user_pos()`
    Expect `True` indicating user has been deleted.
    '''
    assert db.delete_user(2) is True

def test_delete_user_neg(db):
    '''
    Fail to delete non-existing user.
    Expect `False` indicating user has not been deleted.
    '''
    assert db.delete_user(2) is False

def test_get_user_info(db):
    '''
    Get user information from db.
    Expect `dict` of user info.
    '''
    info = db.get_user_info(1)
    assert info['email'] == 'test@example.com'
    assert info['username'] == 'test'

if __name__ == "__main__":
    pytest.main(['-v', '--html=../docs/test_db_report.html', '--self-contained', '--capture=sys'])

