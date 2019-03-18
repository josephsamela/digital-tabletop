
from module.auth import auth
from module.game import game

class User():
    '''
    `User()` class created for each logged in user.

    Args:
        id_user: User id field `id_user` from db

    Returns:
        handle: 

    Raises:
        KeyError: Raises an exception.
    '''
    def __init__(self, id_user):
        self.id_user = id_user
        # Get User Info
        info = self._get_user_info()
        self.email = info['email']
        self.username = info['username']
        self.admin = info['admin']
        self.premium = info['premium']
        self.active = info['active']
        self.timestamp = info['timestamp']
        # Get User Boards
        self.boards = self._get_user_board_list()

    def _get_user_info(self):
        info = auth().get_user_info(self.id_user)
        print(info)
        return info

    def _get_user_board_list(self):
        boards = game().get_user_board_list(self.id_user)
        print(boards)
        return boards

