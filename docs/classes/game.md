# module.game

This module contains functions to access the database.

> Tested by ['test_module_game'](test_module_game.md).


## game
```python
game(self)
```

### get_user_board_list
```python
game.get_user_board_list(self, id_user)
```

Get list of `id_board` owned by 'id_user'.

Args:
    id_user: ID of created user as int (ie. `2`).

Returns:
    `list` of board `id.board` owned by `id.user`.

### get_board_info
```python
game.get_board_info(self, id_board)
```

Get board information from db.

Args:
    id_board: ID of created board as int (ie. `2`)

Returns:
    `dict` with user information if successuful. `False` otherwise.

