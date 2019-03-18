'''
This module tests [`user`](user.md) class.

> Results in [`test_user_report`](test_user_report.html).
'''

import pytest
from module.user import User

def test_create_user():
    user = User(1)

def test_user_auth_data():
    u = User(1)
    assert u.id_user is 1
    assert u.email == 'test@example.com'
    assert u.username == 'test'
    assert u.admin is 0
    assert u.premium is 0
    assert u.active is 0
    assert u.timestamp == '2019-03-17 13:36:44'

def test_user_game_data():
    u = User(1)
    assert type(u.boards) is list

if __name__ == "__main__":
    pytest.main(['-v', '--html=../docs/test_user_report.html', '--self-contained'])
