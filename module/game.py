'''
This module contains functions to access the database.

> Tested by ['test_module_game'](test_module_game.md).

'''

import sqlite3
from module.db import db

class game(db):
    def __init__(self):
        super().__init__()

    def get_user_board_list(self, id_user):
        '''
        Get list of `id_board` owned by 'id_user'.

        Args:
            id_user: ID of created user as int (ie. `2`).

        Returns:
            `list` of board `id.board` owned by `id.user`.
        '''
        with self.connect() as conn:
            c = conn.cursor()
            boards = c.execute("SELECT id_board FROM board WHERE owner={};".format(id_user)).fetchall()

        board_list = []*len(boards)
        for b in boards:
            board_list.append(b[0])

        print(board_list)
        return board_list

    def get_board_info(self, id_board):
        '''
        Get board information from db.

        Args:
            id_board: ID of created board as int (ie. `2`)

        Returns:
            `dict` with user information if successuful. `False` otherwise.
        '''
        with self.connect() as conn:
            c = conn.cursor()
            board = c.execute("SELECT * FROM board WHERE id_board={};".format(id_board)).fetchall()[0]
        board = {
            'title':board[1],
            'owner':board[2],
            'timestamp': board[3],
            'data': board[4]
        }
        return board
