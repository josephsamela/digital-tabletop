'''
This module contains functions to access the user.

> Tested by ['test_module_db'](test_module_db.md).

'''

import sqlite3
from flask_bcrypt import generate_password_hash, check_password_hash
from module.db import db

class auth(db):
    def __init__(self):
        super().__init__()

    def check_email(self, email):
        '''
        Check if email exists in db.

        Args:
            email: User email as str (ie. `test@example.com`)

        Returns:
            User `id_user` as int (ie. `1`) if successful. `False` otherwise.
        '''
        with self.connect() as conn:
            c = conn.cursor()
            result = c.execute("select id_user from user where email='{}'".format(email)).fetchall()
        if not result:
            return False
        else:
            user_id = result[0][0]
            return user_id

    def check_id_user(self, id_user):
        '''
        Check if id_user exists in db.

        Args:
            id_user: User id_user as int (ie. `1`)

        Returns:
            User `email` as str (ie. `test@example.com`) if successful. `False` otherwise.
        '''
        with self.connect() as conn:
            c = conn.cursor()
            result = c.execute("select email from user where id_user='{}'".format(id_user)).fetchall()
        if not result:
            return False
        else:
            user_id = result[0][0]
            return user_id

    def check_user_credentials(self, email, password):
        '''
        Check user credentials against db.

        Args:
            email: Email as str (ie. `test@example.com`)
            password: Password in plaintext as str (ie. `password`)

        Returns:
            `id_user` if success, `False` otherwise.

        Raises:
            ``
        '''
        if self.check_email(email) is False: # If user doesn't exist
            raise Exception('email does not exist')
            return False
        else:
            with self.connect() as conn:
                c = conn.cursor()
                password_hash = c.execute("SELECT password FROM user WHERE email='{}'".format(email)).fetchall()[0][0]
        # Check password hash against plaintext password
        if check_password_hash(password_hash, password):
            return self.check_email(email)
        else:
            raise Exception('wrong password')
            return False

    def create_user(self, email, username, password, **kwargs):
        '''
        Create new user in db.

        Args:
            email: Email as str (ie. `test@example.com`)
            username: Username as str (ie. `test`)
            password: Password in plaintext as str (ie. `password`)
            **id_user: ID of created user as int (ie. `2`)

        Returns:
            id_user as int if successuful. `False` otherwise.
        '''
        # Check if email already exists
        if self.check_email(email) > 0: # If email exists
            return False
        else: # If email does not exist
            with self.connect() as conn:
                c = conn.cursor()
                password_hash = generate_password_hash(password).decode('utf-8')
                if 'id_user' in kwargs:
                    args = [kwargs['id_user'],email,username,password_hash]
                    c.execute("INSERT INTO user (id_user,email,username,password) VALUES (?,?,?,?);", args)
                else:
                    args = [email,username,password_hash]
                    c.execute("INSERT INTO user (email,username,password) VALUES (?,?,?);", args)
            return self.check_email(email)

    def delete_user(self, id_user):
        '''
        Delete user from db.

        Args:
            id_user: ID of created user as int (ie. `2`)

        Returns:
            `True` if successuful. `False` otherwise.
        '''
        # Check if email already exists
        if self.check_id_user(id_user) is False: # If doesn't exist
            return False
        else: # If email does exist
            with self.connect() as conn:
                c = conn.cursor()
                c.execute("DELETE FROM user WHERE id_user={};".format(id_user))
            return True

    def get_user_info(self, id_user):
        '''
        Get user information from db.

        Args:
            id_user: ID of created user as int (ie. `2`)

        Returns:
            `dict` with user information if successuful. `False` otherwise.
        '''
        with self.connect() as conn:
            c = conn.cursor()
            info = c.execute("SELECT * FROM user WHERE id_user={};".format(id_user)).fetchall()[0]
        info = {
            'email':info[1],
            'username':info[2],
            'admin': info[4],
            'premium': info[5],
            'active': info[6],
            'timestamp': info[7]
        }
        return info

