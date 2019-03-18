'''
This module tests [`game`](game.md) functions.

'''

import pytest
from module.game import game

@pytest.fixture()
def db():
    return game()

def test_get_user_board_list(db):
    '''
    Get board list from `id_user`.
    Expect `list` of board `id.board` owned by `id.user`.
    '''
    assert len(db.get_user_board_list(1)) is 3

def test_get_board_info(db):
    '''
    Get board info from id_board.
    Expect `dict` of board info.
    '''
    info = db.get_board_info(1)
    assert info['title'] == 'A New Hope'
    assert info['timestamp'] == '2019-03-07T01:22:55.151Z'

if __name__ == "__main__":
    pytest.main(['-v', '--html=../docs/test_db_report.html', '--self-contained', '--capture=sys'])

